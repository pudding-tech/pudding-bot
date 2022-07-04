import { CommandDefinition } from "../CommandDefinition";
//import { MessageEmbed } from 'Discord.js';
const { MessageEmbed } = require("discord.js");
import { commands } from "../commands";
import { BOT_COLOR, Category } from "../constants";

export const help: CommandDefinition = {
  name: "help",
  description: "Help for PuddingBot",
  category: Category.HELP,
  executor: async (msg) => {

    // Build strings of available commands
    let linkCommands = "";
    let funnyCommands = "";
    let utilCommands = "";
    let audioCommands = "";
    let adminCommands = "";

    commands.forEach( cmd => {
      switch (cmd.category) {
        case Category.LINK:
          linkCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
          break;
        case Category.IMAGES:
          funnyCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
          break;
        case Category.UTIL:
          utilCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
          break;
        case Category.AUDIO:
          audioCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
          break;
        case Category.ADMIN:
          adminCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
          break;
      }
    });

    const helpEmbed = new MessageEmbed({
      title: "PuddingBot  -  Help",
      description: "Hi, I'm Puddingbot, serving the Puddings Discord server.\n\n**Available commands:**",
      fields: [
        {
          name: `${Category.LINK}:`,
          value: linkCommands,
          inline: false
        },
        {
          name: `${Category.IMAGES}:`,
          value: funnyCommands,
          inline: false
        },
        {
          name: `${Category.UTIL}:`,
          value: utilCommands,
          inline: false
        },
        {
          name: `${Category.AUDIO}:`,
          value: audioCommands,
          inline: false
        },
        {
          name: `${Category.ADMIN}:`,
          value: adminCommands,
          inline: false
        }
      ],
      color: BOT_COLOR,
      footer: { text: "Contact mods if you have further questions" },
    });

    await msg.channel.send({ embeds: [helpEmbed] });
  }
};
