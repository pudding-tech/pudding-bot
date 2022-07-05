import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const stop: CommandDefinition = {
  name: "stop",
  description: "Stop playing music",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      return msg.reply("There are no songs in the queue.");
    }

    queue.destroy();

    return msg.channel.send("Music has been stopped. See you later!");
  }
};