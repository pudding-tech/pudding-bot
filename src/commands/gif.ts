import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { BOT_COLOR, Category } from "../constants";
import { gifs } from "../images";

export const gif: CommandDefinition = {
  name: "gif",
  description: "Display a GIF",
  commandDisplay: "gif <name>",
  category: Category.IMAGES,
  options: [
    {
      name: "gif",
      description: "Display this GIF",
      required: true,
      type: ApplicationCommandOptionType.Number,
      choices: gifs
    }
  ],
  executor: async (interaction) => {

    const i = interaction.options.getNumber("gif") || 0;

    const embed = new EmbedBuilder({
      image: { url: gifs[i].url },
      title: gifs[i].title,
      description: gifs[i].description,
      footer: { text: gifs[i].footer || "" },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [embed] });
  }
};
