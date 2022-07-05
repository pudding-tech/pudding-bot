import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const shuffle: CommandDefinition = {
  name: "shuffle",
  description: "Shuffles the music queue",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      return msg.reply("There are no songs in the queue.");
    }

    queue.shuffle();

    return msg.channel.send(queue.tracks.length + " songs have been shuffled.");
  }
};