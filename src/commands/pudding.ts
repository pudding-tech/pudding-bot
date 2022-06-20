import { CommandDefinition } from '../CommandDefinition';
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require('discord.js');

export const pudding: CommandDefinition = {
  name: "pudding",
  description: "Lots of pudding for everyone!",
  executor: async (msg) => {
    await msg.channel.send("Lots of pudding for everyone!");
  }
};