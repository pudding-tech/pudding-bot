import { CommandDefinition } from '../CommandDefinition';
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require('discord.js');
import { BOT_COLOR } from '../constants';

export const git: CommandDefinition = {
  name: "git",
  description: "Link to PuddingBot git repo",
  executor: async (msg) => {
    const gitEmbed = new MessageEmbed({
      title: "PuddingBot Git Repository",
      url: "https://github.com/Pudding-Tech/PuddingBot",
      description: "Click to go to PuddingBot repository on Github.",
      color: BOT_COLOR,
      footer: { text: "Feel free to contribute to the bot!" }
    });

    await msg.channel.send({ embeds: [gitEmbed] });
  },
};