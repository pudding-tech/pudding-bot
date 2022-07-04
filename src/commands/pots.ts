import { CommandDefinition } from "../CommandDefinition";
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../constants";

export const pots: CommandDefinition = {
  name: "pots",
  description: "Link to Puddings of the Storm Youtube playlist",
  category: Category.LINK,
  executor: async (msg) => {
    const potsEmbed = new MessageEmbed({
      title: "Puddings of the Storm",
      description: potsMessage,
      image: { url: "https://i.imgur.com/PsyVAU6.png" },
      color: BOT_COLOR
    });

    await msg.channel.send({ embeds: [potsEmbed] });
  }
};

const potsMessage = "The Heroes of the Storm team that participated in the offical Heroes Lounge league, seasons 12 - 14.\n\n" +
  "[Puddings of the Storm - Heroes Lounge profile](https://heroeslounge.gg/team/view/PUD)\n\n" +
  "[Puddings of the Storm - Heroes Lounge Youtube playlist](https://www.youtube.com/playlist?list=PLVXb9AssBoRDlJjkS7BYz55XOtYbrMrKV)\n\n" +
  "----------\n\n" +
  "[Most memorable moment in PotS's history](https://youtu.be/EGEJVbvHhiA?t=526)";