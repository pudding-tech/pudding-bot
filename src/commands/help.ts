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

    const buildCommandString = (cmd: CommandDefinition): string => {
      if (Array.isArray(cmd.commandDisplay)) {
        let commandString = "";
        cmd.commandDisplay.forEach( displayName => { commandString += `\`/${displayName}\`\n`; });
        return commandString;
      }
      else {
        return `\`/${cmd.commandDisplay || cmd.name}\`\n`;
      }
    };

    commands.forEach( cmd => {
      switch (cmd.category) {
        case Category.LINK:
          linkCommands += buildCommandString(cmd);
          break;
        case Category.IMAGES:
          imagesCommands += buildCommandString(cmd);
          break;
        case Category.UTIL:
          utilCommands += buildCommandString(cmd);
          break;
        case Category.AUDIO:
          audioCommands += buildCommandString(cmd);
          break;
        case Category.ADMIN:
          adminCommands += buildCommandString(cmd);
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
          value: imagesCommands,
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
