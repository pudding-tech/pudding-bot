import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const git: CommandDefinition = {
  name: "git",
  description: "Link to PuddingBot git repo",
  category: Category.LINK,
  executor: async (interaction) => {
    const gitEmbed = new EmbedBuilder({
      title: "PuddingBot Git Repository",
      url: "https://github.com/Pudding-Tech/PuddingBot",
      description: "Click to go to PuddingBot repository on GitHub.",
      color: BOT_COLOR,
      footer: { text: "Feel free to contribute to the bot!" }
    });

    return interaction.reply({ embeds: [gitEmbed] });
  }
};