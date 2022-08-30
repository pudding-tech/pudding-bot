import { CommandDefinition } from "../CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

const img = "https://c.tenor.com/lTtlX5xlfmgAAAAC/nyan-cat.gif";

export const nyan: CommandDefinition = {
  name: "nyan",
  description: "It's nyan time",
  category: Category.IMAGES,
  executor: async (interaction) => {
    const nyanEmbed = new EmbedBuilder({
      title: "NYAN",
      description: "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan",
      image: { url: img},
      color: BOT_COLOR,
      footer: { text: "nyannyannyannyannyannyannyannyannyannyannyannyannyannyannyannyan" },
    });
    
    return interaction.reply({ embeds: [nyanEmbed] });
  }
};