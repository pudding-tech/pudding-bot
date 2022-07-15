import Discord from "discord.js";
import { editPlexMessage } from "./editPlexMessage";

/**
 * Handle /edit command
 * @param {Discord.Client} bot Discord bot
 * @param {Discord.CommandInteraction} interaction Interaction object
 */
export const editMessage = async (bot: Discord.Client, interaction: Discord.CommandInteraction) => {

  // Extract which message to edit
  const subCmd = interaction.options.getSubcommand();
  console.log(subCmd);

  if (!subCmd) {
    return interaction.reply({ content: "Message to edit not supplied!", ephemeral: true });
  }

  // Show available /edit commands
  else if (subCmd === "help") {
    return interaction.reply("These are the available commands for editing messages:\n\n" +
    "`/edit message:plex <...>`   -   This command is only usable for Plex admins");
  }

  // Edit Plex server status
  else if (subCmd === "plex") {
    return editPlexMessage(bot, interaction);
  }

  return interaction.reply({ content: "Edit command not specified.\n" +
    "Use `/edit message:help` for a list of available edit commands.", ephemeral: true });
};