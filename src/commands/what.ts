import { CommandDefinition } from "../CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

const img = "https://i.imgur.com/wAtmxTe.gif";

export const what: CommandDefinition = {
  name: "what",
  description: "You what now?",
  category: Category.IMAGES,
  executor: async (interaction) => {
    const whatEmbed = new EmbedBuilder({
      image: { url: img},
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [whatEmbed] });
  }
};