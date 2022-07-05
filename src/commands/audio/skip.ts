import { CommandDefinition } from "../../CommandDefinition";
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../../constants";

export const skip: CommandDefinition = {
  name: "skip",
  description: "Skips the currently playing song",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      return msg.reply("There are no songs in the queue.");
    }

    const currentSong = queue.current;

    queue.skip();

    const skipEmbed = new MessageEmbed({
      description: `**${currentSong.title}** has been skipped.`,
      thumbnail: {
        url: currentSong.thumbnail
      },
      color: BOT_COLOR
    });

    return msg.channel.send({ embeds: [skipEmbed] });
  }
};