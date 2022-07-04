import { CommandDefinition } from "../../CommandDefinition";
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../../constants";

export const queue: CommandDefinition = {
  name: "queue",
  description: "Displays current music queue",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      msg.reply("There are no songs in the queue.");
      return;
    }

    let queueString = queue.tracks.map( (song, i) => {
      return `${i + 1}. ${song.title}  -  ${song.duration}`;
    }).join("\n");

    if (queueString.length === 0) {
      queueString = "-- No upcoming songs --";
    }

    const currentSong = queue.current;
    const progressBar = queue.createProgressBar({
      timecodes: true,
      length: 20
    });

    const queueEmbed = new MessageEmbed({
      description: `Currently playing:\n**${currentSong.title}**\n\n` +
        "Requested by *" + msg.author.tag + "*\n\n" +
        progressBar + "\n\n" +
        "Current volume: " + queue.volume + "%\n\n" +
        "**Queue:**\n" + queueString,
        thumbnail: {
          url: currentSong.thumbnail
        },
      color: BOT_COLOR
    });

    await msg.channel.send({ embeds: [queueEmbed] });
  }
};