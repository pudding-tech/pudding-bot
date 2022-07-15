import { Constants } from "discord.js";
import { CommandDefinition } from "../../CommandDefinition";
import { MessageEmbed } from "discord.js";
import { QueryType } from "discord-player";
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
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ],
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guild) {
      return;
    }

    // Check if user is in same voice channel as bot
    const guild = bot.guilds.cache.get(interaction.guildId!);
    const member = guild?.members.cache.get(interaction.member!.user.id!);
    const voiceChannel = member?.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({ content: "You need to be in a voice channel to use this command.", ephemeral: true });
    }
    if (interaction.guild?.me?.voice.channelId && voiceChannel.id !== interaction.guild?.me?.voice.channelId) {
      return interaction.reply({ content: "You are not in the same voice channel as PuddingBot.", ephemeral: true });
    }

    // Check if command includes music link
    const url = interaction.options.getString("url");
    if (!url?.length) {
      return interaction.reply({ content: "Please provide a link for the music to play. YouTube, Spotify and SoundCloud are supported.", ephemeral: true });
    }
    
    // Create queue
    const queue = player.createQueue(interaction.guild, {
      autoSelfDeaf: false,
      initialVolume: 50
    });
    try {
      if (!queue.connection) {
        await queue.connect(voiceChannel);
      }
    }
    catch (err) {
      queue.destroy();
      console.log(err);
      return interaction.reply({ content: "Could not connect to voice channel. See bot error log", ephemeral: true });
    }

    const result = await player.search(url, {
      requestedBy: interaction.user,
      searchEngine: QueryType.YOUTUBE_VIDEO
    });
    if (result.tracks.length === 0) {
      return interaction.reply({ content: "Video not found. Please provide a proper Youtube URL.", ephemeral: true });
    }

    const song = result.tracks[0];
    queue.addTrack(song);

    if (!queue.playing) {
      queue.play();
    }

    const musicEmbed = new MessageEmbed({
      title: `**${song.title}** has been added to the queue`,
      thumbnail: {
        url: song.thumbnail
      },
      footer: {
        text: `Duration: ${song.duration}`
      },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [musicEmbed] });
  }
};