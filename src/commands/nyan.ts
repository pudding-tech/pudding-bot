import { CommandDefinition } from '../CommandDefinition';
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require('discord.js');
import { BOT_COLOR } from '../constants';

const URL = "https://c.tenor.com/lTtlX5xlfmgAAAAC/nyan-cat.gif"

export const nyan: CommandDefinition = {
  name: "nyan",
  description: "nyan nyan",
  executor: async (msg) => {
    const nyanEmbed = new MessageEmbed({
      title: "NYAN",
      description: "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan",
      image: { url: URL},
      color: BOT_COLOR,
      footer: { text: 'nyannyannyannyannyannyannyannyannyannyannyannyannyannyannyannyan' },
    });

    await msg.channel.send({ embeds: [nyanEmbed] });
  },
};