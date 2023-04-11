import dotenv from "dotenv";
import Discord from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Player } from "discord-player";
import { PlexConnection } from "./PlexConnection";
import { commands } from "./commands";
import { VERSION, BOT_COLOR, Channels } from "./constants";
import { getWelcomeMessage } from "./messages/welcomes";

dotenv.config();

const inProd = process.env.NODE_ENV === "production" ? true : false;
const puddingbotToken = process.env.PUDDINGBOT_TOKEN;
const clientId = process.env.PUDDINGBOT_CLIENT_ID;
const guilds = process.env.GUILD_ID?.split(",");

if (!puddingbotToken) {
  console.error("Please provide a Discord bot token as an environment variable");
  process.exit(0);
}
if (!clientId) {
  console.error("Please provide a Discord bot client ID as an environment variable");
  process.exit(0);
}
if (!guilds) {
  console.error("Please provide a Discord guild ID as an environment variable");
  process.exit(0);
}

const bot = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildVoiceStates
  ]
});

// Register commands to Discord servers via API
const rest = new REST({ version: "9"}).setToken(puddingbotToken);

guilds.forEach( async (guildId) => {
  await rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands});
  console.log("Successfully registered " + commands.length + " commands for server: " + guildId);
});

// Initialize and export PlexConnection
const plexConnection = new PlexConnection(bot);
export { plexConnection };

// Music player
const player = new Player(bot, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25
  }
});

bot.once("ready", async () => {
  console.log(`${bot.user?.username} (${inProd ? VERSION : "dev version"}) sucessfully logged in!`);

  // Set bot activity
  bot.user?.setPresence({
    status: "online",
    activities: [{
        name: inProd ? "/help" : "in dev mode",
        type: Discord.ActivityType.Playing
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

bot.on("disconnect", () => {
  console.log(bot.user?.username + " has logged out...");
});

// Interactions
bot.on("interactionCreate", async (interaction) => {

  if (!interaction.isChatInputCommand())
    return;

  const command = commands.find(cmd => cmd.name === interaction.commandName);
  
  if (command) {
    console.log(`Command "${command.name}" used by ${interaction.user.tag}`);
    try {
      await command.executor(interaction, bot);
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
bot.on("guildMemberAdd", async (member) => {
  const channel = await member.guild.channels.fetch(Channels.GENERAL_CHANNEL) as Discord.TextChannel;

  const memberEmbed = new Discord.EmbedBuilder({
    title: "Welcome to Puddings!",
    description: getWelcomeMessage(member.user),
    image: { url: member.user.avatarURL() || ""},
    color: BOT_COLOR
  });

  await channel.send({ embeds: [memberEmbed] });
});

player.events.on("error", (queue, err) => {
  // Emitted when the player queue encounters error
  console.error(err);
});
player.events.on("playerError", (queue, err) => {
  // Emitted when the audio player errors while streaming audio track
  console.error(err);
});

// Login bot
bot.login(puddingbotToken);
