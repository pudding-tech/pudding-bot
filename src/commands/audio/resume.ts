import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const resume: CommandDefinition = {
  name: "resume",
  description: "Resume currently paused music queue",
  category: Category.AUDIO,
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    queue.setPaused(false);

    return interaction.reply("Music has been resumed! Use .pause to pause currently playing music.");
  }
};