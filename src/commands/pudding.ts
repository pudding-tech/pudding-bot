import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

const img = "https://c.tenor.com/02c70YZ5A5IAAAAC/pudding.gif";

export const pudding: CommandDefinition = {
  name: "pudding",
  description: "Pudding for everyone!",
  category: Category.IMAGES,
  executor: async (interation) => {
    const puddingEmbed = new EmbedBuilder({
      title: "Lots of pudding for everyone!",
      image: { url: img},
      color: BOT_COLOR
    });

    return interation.reply({ embeds: [puddingEmbed] });
  }
};