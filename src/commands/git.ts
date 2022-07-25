import { CommandDefinition } from "../CommandDefinition";
import { MessageEmbed } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const git: CommandDefinition = {
  name: "git",
  description: "Link to PuddingBot git repo",
  category: Category.LINK,
  executor: async (interaction) => {
    const gitEmbed = new MessageEmbed({
      title: "PuddingBot Git Repository",
      url: "https://github.com/Pudding-Tech/PuddingBot",
      description: "Click to go to PuddingBot repository on GitHub. For now only accessible for members of the Puddingtech organization.",
      color: BOT_COLOR,
      footer: { text: "Feel free to contribute to the bot!" }
    });

    return interaction.reply({ embeds: [gitEmbed] });
  }
};