import { ApplicationCommandOptionType } from "discord.js";
import { EmbedBuilder } from "discord.js";
import { QueryType, useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { BOT_COLOR, Category } from "../../constants.ts";

export const play: CommandDefinition = {
  name: "play",
  description: "Play audio from a SoundCloud link",
  commandDisplay: "play <url>",
  category: Category.AUDIO,
  options: [
    {
      name: "url",
      description: "URL to music",
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  executor: async (interaction, bot) => {

    const player = useMainPlayer();

    if (!player || !interaction.guild) {
      return;
    }
    await interaction.deferReply();

    // Check if user is in same voice channel as bot
    const guild = bot.guilds.cache.get(interaction.guildId!);
    const member = guild?.members.cache.get(interaction.member!.user.id!);
    const voiceChannel = member?.voice.channel;
    if (!voiceChannel) {
      return interaction.editReply({ content: "You need to be in a voice channel to use this command." });
    }
    if (interaction.guild.members.me?.voice.channelId && voiceChannel.id !== interaction.guild.members.me?.voice.channelId) {
      return interaction.editReply({ content: "You are not in the same voice channel as PuddingBot." });
    }

    // Check if command includes music link
    const url = interaction.options.getString("url");
    if (!url?.length) {
      return interaction.editReply({ content: "Please provide a link for the music to play. SoundCloud is supported." });
    }
    
    // Create (or get) queue
    // @ts-expect-error: Discord.js Guild type mismatch due to ESM/CJS
    const queue = player.nodes.create(interaction.guild, {
      metadata: {
        channel: interaction.channel,
        client: interaction.guild.members.me,
        requestedBy: interaction.user,
      },
      selfDeaf: false,
      volume: 50
    });
    try {
      if (!queue.connection) {
        // @ts-expect-error: Discord.js Client type mismatch due to ESM/CJS
        await queue.connect(voiceChannel);
      }
    }
    catch (err) {
      queue.delete();
      console.error(err);
      return interaction.editReply({ content: "Could not connect to voice channel. See bot error log" });
    }

    const result = await player.search(url, {
      // @ts-expect-error: Discord.js Client type mismatch due to ESM/CJS hazard
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO
    }).catch(err => console.error(err));

    if (!result || !result.hasTracks()) {
      return interaction.editReply({ content: "Music not found. Please provide a proper URL." });
    }

    // acquire task entry
    const entry = queue.tasksQueue.acquire();

    // wait for previous task to be released and our task to be resolved
    await entry.getTask();

    const song = result.tracks[0];
    queue.addTrack(song);

    if (!queue.node.isPlaying()) {
      await queue.node.play();
    }
    queue.tasksQueue.release();

    const musicEmbed = new EmbedBuilder({
      title: `**${song.title}**\nhas been added to the queue`,
      thumbnail: {
        url: song.thumbnail
      },
      footer: {
        text: `Duration: ${song.duration}`
      },
      color: BOT_COLOR
    });

    return interaction.editReply({ embeds: [musicEmbed] });
  }
};
