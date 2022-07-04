import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const resume: CommandDefinition = {
  name: "resume",
  description: "Resume currently paused queue",
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

    queue.setPaused(false);

    await msg.channel.send("Music has been resumed! Use .pause to pause currently playing music.");
  }
};