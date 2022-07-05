import { CommandDefinition } from "../CommandDefinition";
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../constants";

const img = "https://i.imgur.com/wAtmxTe.gif";

export const what: CommandDefinition = {
  name: "what",
  category: Category.IMAGES,
  executor: async (msg) => {
    const whatEmbed = new MessageEmbed({
      image: { url: img},
      color: BOT_COLOR
    });

    return msg.channel.send({ embeds: [whatEmbed] });
  }
};