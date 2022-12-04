import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const pots: CommandDefinition = {
  name: "pots",
  description: "Link to Puddings of the Storm HotS team",
  category: Category.LINK,
  executor: async (interaction) => {
    const potsEmbed = new EmbedBuilder({
      title: "Puddings of the Storm",
      description: potsMessage,
      image: { url: "https://i.imgur.com/PsyVAU6.png" },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [potsEmbed] });
  }
};

const potsMessage = "The Heroes of the Storm team that participated in the offical Heroes Lounge league, seasons 12 - 14.\n\n" +
  "[Puddings of the Storm - Heroes Lounge profile](https://heroeslounge.gg/team/view/PUD)\n" +
  "[Puddings of the Storm - Youtube playlist](https://www.youtube.com/playlist?list=PLVXb9AssBoRDlJjkS7BYz55XOtYbrMrKV)\n\n" +
  "**Hall of Fame - Memorable Moments:**\n" +
  "1. [Drafting the Ultimate Team [PUD vs InPanic]](https://youtu.be/EGEJVbvHhiA?t=526)";