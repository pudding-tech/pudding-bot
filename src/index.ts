import { ActivityType, Client, EmbedBuilder, Events, GatewayIntentBits, REST, Routes, TextChannel} from "discord.js";
import { Player } from "discord-player";
import { DefaultExtractors } from "@discord-player/extractor";
import { PlexConnection } from "./PlexConnection.ts";
import { commands } from "./commands.ts";
import { VERSION, BOT_COLOR, Channels } from "./constants.ts";
import { getWelcomeMessage } from "./messages/welcomes.ts";
import env from "./env.ts";

const guilds = env.GUILD_ID?.split(",");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
  ]
});

// Register commands to Discord servers via API
const rest = new REST({ version: "10" }).setToken(env.PUDDINGBOT_TOKEN);

guilds.forEach(async (guildId) => {
  await rest.put(Routes.applicationGuildCommands(env.PUDDINGBOT_CLIENT_ID, guildId), { body: commands });
  console.log("Successfully registered " + commands.length + " commands for server: " + guildId);
});

// Initialize PlexConnection
const plexConnection = new PlexConnection(client);

// Music player
// @ts-expect-error: Discord.js Client type mismatch due to ESM/CJS
const player = new Player(client);
await player.extractors.loadMulti(DefaultExtractors);

client.once(Events.ClientReady, async (readyClient) => {
  console.log(`${readyClient.user?.username} (${env.IN_PROD ? VERSION : "dev version"}) sucessfully logged in!`);

  // Set bot activity
  readyClient.user?.setPresence({
    status: "online",
    activities: [{
      name: env.IN_PROD ? "/help" : "in dev mode",
      type: ActivityType.Playing
    }]
  });

  // Connect to Plex services
  try {
    await plexConnection.run();
  }
  catch (err) {
    console.log(err);
  }
});

client.on("disconnect", () => {
  console.log(client.user?.username + " has logged out...");
});

// Interactions
client.on(Events.InteractionCreate, async (interaction) => {

  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = commands.find(cmd => cmd.name === interaction.commandName);

  if (command) {
    console.log(`Command "${command.name}" used by ${interaction.user.tag}`);
    try {
      await command.executor(interaction, client);
    }
    catch (err) {
      console.log("Error executing command");
      console.log(err);
    }
  }
  else {
    interaction.reply({ content: "Command does not exist.\n" +
      "Use `/help` for a list of available commands.", ephemeral: true });
  }
});

// New user joins server
client.on(Events.GuildMemberAdd, async (member) => {
  const channel = await member.guild.channels.fetch(Channels.GENERAL_CHANNEL) as TextChannel;

  const memberEmbed = new EmbedBuilder({
    title: "Welcome to Puddings!",
    description: getWelcomeMessage(member.user),
    image: { url: member.user.avatarURL() || ""},
    color: BOT_COLOR
  });

  await channel.send({ embeds: [memberEmbed] });
});

player.events.on("error", (_queue, err) => {
  // Emitted when the player queue encounters error
  console.error(err);
});
player.events.on("playerError", (_queue, err) => {
  // Emitted when the audio player errors while streaming audio track
  console.error(err);
});

// Login bot
client.login(env.PUDDINGBOT_TOKEN);

export { plexConnection };
