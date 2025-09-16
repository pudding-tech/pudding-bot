import { useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { Category } from "../../constants.ts";

export const pause: CommandDefinition = {
  name: "pause",
  description: "Pause currently playing music",
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

    queue.node.pause();

    return interaction.reply("Music has been paused! Use /resume to continue playing the music.");
  }
};
