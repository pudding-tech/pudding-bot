import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const puddingtech: CommandDefinition = {
  name: "puddingtech",
  description: "Link to Puddingtech GitHub page",
  category: Category.LINK,
  executor: async (interaction) => {
    const puddingtechEmbed = new EmbedBuilder({
      title: "Puddingtech GitHub page",
      url: "https://github.com/pudding-tech",
      description: "Click to go to Puddingtech organization page on GitHub.",
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [puddingtechEmbed] });
  }
};