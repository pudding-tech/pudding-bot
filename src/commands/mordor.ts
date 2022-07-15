import { CommandDefinition } from "../CommandDefinition";
import { MessageEmbed } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

const img = "https://i.imgur.com/yUinmn9.png";

export const mordor: CommandDefinition = {
  name: "mordor",
  description: "One does not simply...",
  category: Category.IMAGES,
  executor: async (interaction) => {
    const mordorEmbed = new MessageEmbed({
      image: { url: img},
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [mordorEmbed] });
  }
};