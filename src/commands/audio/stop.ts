import { useMasterPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition";
import { Category } from "../../constants";

export const stop: CommandDefinition = {
  name: "stop",
  description: "Stop playing music and clear the queue",
  category: Category.AUDIO,
  executor: async (interaction) => {

    const player = useMasterPlayer();

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.nodes.get(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    queue.delete();

    return interaction.reply("Music has been stopped. See you later!");
  }
};
