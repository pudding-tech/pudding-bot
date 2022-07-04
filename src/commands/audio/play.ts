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
      msg.reply("You need to be in a voice channel to use this command.");
      return;
    }
    if (msg.guild?.me?.voice.channelId && voiceChannel.id !== msg.guild?.me?.voice.channelId) {
      msg.reply("You are not in the same voice channel as PuddingBot.");
    }

    // Check command includes music link
    const url = msg.content.substring(6, msg.content.length);
    if (!url.length) {
      msg.reply("You need to add a music link.");
      return;
    }
    
    // Create queue
    const queue = player.createQueue(msg.guild, {
      metadata: msg.channel,
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
      msg.reply("Could not connect to voice channel. See bot error log");
      return;
    }

    const result = await player.search(url, {
      requestedBy: msg.author,
      searchEngine: QueryType.YOUTUBE_VIDEO
    });
    if (result.tracks.length === 0) {
      msg.reply("Video not found. Please provide a proper Youtube URL.");
      return;
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

    await msg.channel.send({ embeds: [musicEmbed] });
  }
};