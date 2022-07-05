import { CommandDefinition } from "../../CommandDefinition";
const { MessageEmbed } = require("discord.js");
import { QueryType } from "discord-player";
import { BOT_COLOR, Category } from "../../constants";

export const play: CommandDefinition = {
  name: "play",
  description: "Play audio from a Youtube video",
  commandDisplay: "play <url>",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guild) {
      return;
    }

    // Check if user is in voice channel as bot
    const voiceChannel = msg.member?.voice.channel;
    if (!voiceChannel) {
      return msg.reply("You need to be in a voice channel to use this command.");
    }
    if (msg.guild?.me?.voice.channelId && voiceChannel.id !== msg.guild?.me?.voice.channelId) {
      return msg.reply("You are not in the same voice channel as PuddingBot.");
    }

    // Check command includes music link
    const url = msg.content.substring(6, msg.content.length);
    if (!url.length) {
      return msg.reply("You need to add a music link.");
    }
    
    // Create queue
    const queue = player.createQueue(msg.guild, {
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
      return msg.reply("Could not connect to voice channel. See bot error log");
    }

    const result = await player.search(url, {
      requestedBy: msg.author,
      searchEngine: QueryType.YOUTUBE_VIDEO
    });
    if (result.tracks.length === 0) {
      return msg.reply("Video not found. Please provide a proper Youtube URL.");
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

    return msg.channel.send({ embeds: [musicEmbed] });
  }
};