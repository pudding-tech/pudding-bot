import { Constants } from "discord.js";
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
      type: Constants.ApplicationCommandOptionTypes.NUMBER
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
      queue.setVolume(vol);
      return interaction.reply("Volume set to: " + vol + "%");
    }

    return interaction.reply("Currently playing at volume: " + queue.volume + "%");
  }
};