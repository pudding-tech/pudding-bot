import { CommandDefinition } from "../CommandDefinition";
import { MessageEmbed } from "discord.js";
import { commands } from "../commands";
import { BOT_COLOR, Category } from "../constants";

export const help: CommandDefinition = {
  name: "help",
  description: "Help for PuddingBot",
  category: Category.HELP,
  executor: async (interaction) => {

    // Build strings of available commands
    let linkCommands = "\u200b";
    let imagesCommands = "\u200b";
    let utilCommands = "\u200b";
    let audioCommands = "\u200b";
    let adminCommands = "\u200b";

    commands.forEach( cmd => {
      switch (cmd.category) {
        case Category.LINK:
          linkCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
          break;
        case Category.IMAGES:
          imagesCommands += `\`.${cmd.commandDisplay || cmd.name}\`\n`;
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
          value: linkCommands || " ",
          inline: false
        },
        {
          name: `${Category.IMAGES}:`,
          value: imagesCommands || " ",
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

    return interaction.reply({ embeds: [helpEmbed] });
  }
};
