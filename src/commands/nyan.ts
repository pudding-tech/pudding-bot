import { CommandDefinition } from "../CommandDefinition";
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../constants";

const img = "https://c.tenor.com/lTtlX5xlfmgAAAAC/nyan-cat.gif";

export const nyan: CommandDefinition = {
  name: "nyan",
  category: Category.IMAGES,
  executor: async (msg) => {
    const nyanEmbed = new MessageEmbed({
      title: "NYAN",
      description: "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan",
      image: { url: img},
      color: BOT_COLOR,
      footer: { text: "nyannyannyannyannyannyannyannyannyannyannyannyannyannyannyannyan" },
    });

    return msg.channel.send({ embeds: [nyanEmbed] });
  }
};