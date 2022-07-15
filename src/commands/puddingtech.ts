import { CommandDefinition } from "../CommandDefinition";
import { MessageEmbed } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const puddingtech: CommandDefinition = {
  name: "puddingtech",
  description: "Link to Puddingtech Github page",
  category: Category.LINK,
  executor: async (interaction) => {
    const puddingtechEmbed = new MessageEmbed({
      title: "Puddingtech Github page",
      url: "https://github.com/Pudding-Tech",
      description: "Click to go to Puddingtech organization page on Github.",
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [puddingtechEmbed] });
  }
};