import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../types/CommandDefinition.ts";
import { BOT_COLOR, Category } from "../constants.ts";
import { images } from "../images.ts";

export const img: CommandDefinition = {
  name: "img",
  description: "Display a image",
  commandDisplay: "img <name>",
  category: Category.IMAGES,
  options: [
    {
      name: "image",
      description: "Display this image",
      required: true,
      type: ApplicationCommandOptionType.Number,
      choices: images
    }
  ],
  executor: async (interaction) => {

    const i = interaction.options.getNumber("image") || 0;

    const embed = new EmbedBuilder({
      image: { url: images[i].url },
      title: images[i].title,
      description: images[i].description,
      footer: { text: images[i].footer || "" },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [embed] });
  }
};
