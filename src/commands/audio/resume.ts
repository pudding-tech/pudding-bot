import { useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { Category } from "../../constants.ts";

export const resume: CommandDefinition = {
  name: "resume",
  description: "Resume currently paused music queue",
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

    queue.node.resume();

    return interaction.reply("Music has been resumed! Use /pause to pause currently playing music.");
  }
};
