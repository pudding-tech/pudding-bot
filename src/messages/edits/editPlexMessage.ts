import Discord from "discord.js";
import { plexMessage } from "../plexMessage";

/**
 * Edit Plex message in services channel
 * @param {Discord.Client} bot Discord bot
 * @param {Discord.CommandInteraction} interaction Interaction object
 */
export const editPlexMessage = async (bot: Discord.Client, interaction: Discord.CommandInteraction) => {

  const server = interaction.options.getString("server");
  //console.log("server: " + server);

  if (server === "puddingflix" || server === "duckflix") {

    const operational = interaction.options.getNumber("operational");
    //console.log("operational: " + operational);

    if (operational === 0 || operational === 1) {

      const status: boolean = operational ? true : false;
      //console.log("status: " + status);

      let serverSelect: Array<any> = [];

      if (server === "puddingflix") {
        serverSelect = [status, null];
      }
      else if (server === "duckflix") {
        serverSelect = [null, status];
      }

      const customStatus = interaction.options.getString("custom_status") || undefined;

      // Check permissions
      if (interaction.user.id !== "110276423779897344" && interaction.user.id !== "111967042424274944") {
        return interaction.reply("You do not have permissions to change the Plex services message.");
      }
      
      try {
        await plexMessage(bot, serverSelect, customStatus);
        return await interaction.reply("You have successfully editited the Plex services message");
      }
      catch (e) {
        console.error(e);
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
    
    return interaction.reply(text);
  }

  return interaction.reply("Wrong formatting for edit Plex command.\n" +
    "Use `.edit plex help` for help formatting for Plex.");
};