import { useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { Category } from "../../constants.ts";

export const shuffle: CommandDefinition = {
  name: "shuffle",
  description: "Shuffles the music queue",
  category: Category.AUDIO,
  executor: async (interaction) => {

    const player = useMainPlayer();

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.nodes.get(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    queue.tracks.shuffle();

    return interaction.reply(queue.tracks.size + " songs have been shuffled.");
  }
};
