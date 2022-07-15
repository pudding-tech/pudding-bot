import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const stop: CommandDefinition = {
  name: "stop",
  description: "Stop playing music, and clear the queue",
  category: Category.AUDIO,
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    queue.destroy();

    return interaction.reply("Music has been stopped. See you later!");
  }
};