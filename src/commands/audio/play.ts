import { ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { QueryType, useMasterPlayer } from "discord-player";
import { BOT_COLOR, Category } from "../../constants";

export const play: CommandDefinition = {
  name: "play",
  description: "Play audio from a YouTube, Spotify or SoundCloud link",
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

    const player = useMasterPlayer();

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
      return interaction.editReply({ content: "Please provide a link for the music to play. YouTube, Spotify and SoundCloud are supported." });
    }
    
    // Create (or get) queue
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
        await queue.connect(voiceChannel);
      }
    }
    catch (err) {
      queue.delete();
      console.error(err);
      return interaction.editReply({ content: "Could not connect to voice channel. See bot error log" });
    }

    const result = await player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO
    })
      .catch(err => console.error(err));

    if (!result || result.tracks.length === 0) {
      return interaction.editReply({ content: "Video not found. Please provide a proper URL." });
    }

    const song = result.tracks[0];
    queue.addTrack(song);

    if (!queue.node.isPlaying()) {
      queue.node.play();
    }

    const musicEmbed = new EmbedBuilder({
      title: `**${song.title}** has been added to the queue`,
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
