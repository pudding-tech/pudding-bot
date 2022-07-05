import { CommandDefinition } from "../CommandDefinition";
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../constants";

const img = "https://c.tenor.com/02c70YZ5A5IAAAAC/pudding.gif";

export const pudding: CommandDefinition = {
  name: "pudding",
  category: Category.IMAGES,
  executor: async (msg) => {
    const puddingEmbed = new MessageEmbed({
      title: "Lots of pudding for everyone!",
      image: { url: img},
      color: BOT_COLOR
    });

    return msg.channel.send({ embeds: [puddingEmbed] });
  }
};