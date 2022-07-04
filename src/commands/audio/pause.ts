import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const pause: CommandDefinition = {
  name: "pause",
  description: "Pause currently playing music",
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

    queue.setPaused(true);

    await msg.channel.send("Music has been paused! Use .resume to continue playing the music.");
  }
};