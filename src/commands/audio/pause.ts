import { CommandDefinition } from "../../types/CommandDefinition";
import { Category } from "../../constants";

export const pause: CommandDefinition = {
  name: "pause",
  description: "Pause currently playing music",
  category: Category.AUDIO,
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    queue.setPaused(true);

    return interaction.reply("Music has been paused! Use .resume to continue playing the music.");
  }
};