import Discord from "discord.js";
import { plexMessage } from "../plexMessage";

/**
 * Edit Plex message in services channel
 * @param {Discord.Client} bot Discord bot
 * @param {Discord.Message} msg Message object itself, used for sending messages
 * @param {string} text Text to check for various commands
 */
export const editPlexMessage = async (bot: Discord.Client, msg: Discord.Message, text: string) => {

  const server = text.substring(0, text.includes(" ") ? text.indexOf(" ") : text.length);
  text = text.substring(text.indexOf(" ") + 1, text.length);

  if (server === "puddingflix" || server === "duckflix") {

    const operational = text.substring(0, text.includes(" ") ? text.indexOf(" ") : text.length);
    text = text.substring(text.includes(" ") ? text.indexOf(" ") + 1: 1, text.length);

    if (operational === "0" || operational === "1") {

      const status: boolean = parseInt(operational) ? true : false;
      let serverSelect: Array<any> = [];

      if (server === "puddingflix") {
        serverSelect = [status, null];
      }
      else if (server === "duckflix") {
        serverSelect = [null, status];
      }

      const customStatus = text.split("\"")[1] || "";

      // Check permissions
      const author = msg.author.id;
      if (author !== "110276423779897344" && author !== "111967042424274944") {
        return msg.reply("You do not have permissions to change the Plex services message");
      }
      
      try {
        await plexMessage(bot, serverSelect, customStatus);
        return await msg.reply("You have successfully editited the Plex services message");
      }
      catch (e) {
        console.log(e);
        return;
      }
    }
  }

  if (server === "help") {
    const text = "Formatting for editing the Plex message in the services channel should be done in the following way:\n\n" +
    "`.edit plex <server> <operational> \"<custom status>\"`\n\n" +
    "*<server>* can be either puddingflix or duckflix\n" +
    "*<operational>* can be either 1 (online) or 0 (offline)\n" +
    "*<custom status>* is optional, and used for writing a custom message for the server's status. " +
    "If nothing is supplied the default status for online and offline will be used. " +
    "*<custom status>* should be enclosed in \"\" (double quotes).\n\n" +
    "Examples:\n`.edit plex puddingflix 0 \"Maintenance\"`\n`.edit plex puddingflix 1`";
    
    return msg.channel.send(text);
  }

  return msg.reply("Wrong formatting for edit Plex command.\n" +
    "Use `.edit plex help` for help formatting for Plex.");
};