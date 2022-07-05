import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const vol: CommandDefinition = {
  name: "vol",
  description: "Display or adjust volume of music",
  commandDisplay: "vol <0-100>?",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      return msg.reply("There are no songs in the queue.");
    }

    // Check if command includes volume to set
    const vol = parseInt(msg.content.substring(5, msg.content.length));
    if (vol) {
      queue.setVolume(vol);
      return msg.channel.send("Volume set to: " + vol + "%");
    }

    return msg.channel.send("Currently playing at volume: " + queue.volume + "%");
  }
};