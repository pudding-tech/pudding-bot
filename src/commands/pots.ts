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
      description: "[Click here to go to Puddings of the Storm - Heroes Lounge playlist](https://www.youtube.com/playlist?list=PLVXb9AssBoRDlJjkS7BYz55XOtYbrMrKV)",
      image: { url: "https://i.imgur.com/PsyVAU6.png" },
      color: BOT_COLOR
    });

    await msg.channel.send({ embeds: [potsEmbed] });
  }
};