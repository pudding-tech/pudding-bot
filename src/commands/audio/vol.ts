import { ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const vol: CommandDefinition = {
  name: "vol",
  description: "Display or adjust volume of music",
  commandDisplay: "vol <0-100>?",
  category: Category.AUDIO,
  options: [
    {
      name: "volume",
      description: "Set volume to this value (0 - 100)",
      required: false,
      type: ApplicationCommandOptionType.Number
    }
  ],
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    // Check if command includes volume to set
    const vol = interaction.options.getNumber("volume");
    if (vol) {
      if (vol < 0 || vol > 100) {
        return interaction.reply("Please input a volume between 0 and 100");
      }
      queue.setVolume(vol);
      return interaction.reply("Volume set to: " + vol + "%");
    }

    return interaction.reply("Currently playing at volume: " + queue.volume + "%");
  }
};