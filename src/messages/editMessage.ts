import Discord from 'discord.js';
import { editPlexMessage } from './edits/editPlexMessage';

/**
 * Handle .edit command
 * @param {Discord.Client} bot Discord bot
 * @param {Discord.Message} msg Message object itself, used for sending messages
 * @param {string} text Text to check for various commands
 */
export const editMessage = async (bot: Discord.Client, msg: Discord.Message, text: string) => {

  // Extract first word
  const cmd = text.substring(0, text.includes(" ") ? text.indexOf(" ") : text.length);
  text = text.substring(cmd.length + 1, text.length);

  // Show available .edit commands
  if (cmd === "help") {
    msg.reply("These are the available commands for editing messages:\n\n" +
    "`.edit plex <...>`   -   This command is only usable for Plex admins");
    return;
  }

  // Edit Plex server status
  if (cmd === "plex") {
    editPlexMessage(bot, msg, text);
    return;
  }

  msg.reply("Nonexistant edit command supplied.\n" +
    "Use `.edit help` for a list of available edit commands.");
};