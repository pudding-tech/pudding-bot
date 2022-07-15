import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const shuffle: CommandDefinition = {
  name: "shuffle",
  description: "Shuffles the music queue",
  category: Category.AUDIO,
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    queue.shuffle();

    return interaction.reply(queue.tracks.length + " songs have been shuffled.");
  }
};