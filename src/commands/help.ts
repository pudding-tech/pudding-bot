import { CommandDefinition } from '../CommandDefinition';
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require('discord.js');
import { commands } from '../commands';
import { BOT_COLOR } from '../constants';

export const help: CommandDefinition = {
  name: "help",
  description: "Help for PuddingBot",
  executor: async (msg) => {

    // Build string of available commands
    let helpCommands: string = "";
    commands.forEach( cmd => {
      helpCommands += `\`.${cmd.name}\`\n`;
    })
    helpCommands = helpCommands.replace("\`.help\`\n", "");

    const helpEmbed = new MessageEmbed({
      title: "PuddingBot  -  Help",
      description: "**Available commands:**\n" + helpCommands,
      color: BOT_COLOR,
      footer: { text: 'Contact mods if you have further questions' },
    });

    await msg.channel.send({ embeds: [helpEmbed] });
  }
};