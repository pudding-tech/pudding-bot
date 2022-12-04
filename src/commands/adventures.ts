import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const adventures: CommandDefinition = {
  name: "adventures",
  description: "Link to Adventures of the Puddings Youtube playlist",
  category: Category.LINK,
  executor: async (interaction) => {
    const adventuresEmbed = new EmbedBuilder({
      title: "Adventures of the Puddings",
      description: "[Click here to go to Adventures of the Puddings playlist](https://www.youtube.com/playlist?list=PLGA0nk1yR2faY2DhHcOZlyjXVU1cgrYPO)",
      image: { url: "https://i3.ytimg.com/vi/nQDQZw3En4k/maxresdefault.jpg" },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [adventuresEmbed] });
  }
};