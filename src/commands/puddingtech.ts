import { CommandDefinition } from "../CommandDefinition";
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require("discord.js");
import { BOT_COLOR, Category } from "../constants";

export const puddingtech: CommandDefinition = {
  name: "puddingtech",
  description: "Link to Puddingtech page",
  category: Category.LINK,
  executor: async (msg) => {
    const puddingtechEmbed = new MessageEmbed({
      title: "Puddingtech Github page",
      url: "https://github.com/Pudding-Tech",
      description: "Click to go to Puddingtech organization page on Github.",
      color: BOT_COLOR
    });

    return msg.channel.send({ embeds: [puddingtechEmbed] });
  }
};