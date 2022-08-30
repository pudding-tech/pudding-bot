import Discord from "discord.js";
import { plexMessage } from "../plexMessage";

/**
 * Edit Plex message in services channel
 * @param {Discord.Client} bot Discord bot
 * @param {Discord.ChatInputCommandInteraction} interaction Interaction object
 */
export const editPlexMessage = async (bot: Discord.Client, interaction: Discord.ChatInputCommandInteraction) => {

  const server = interaction.options.getString("server");
  const operational = interaction.options.getNumber("operational");

  const status: boolean = operational ? true : false;
  let serverSelect: Array<boolean | null> = [];

  if (server === "puddingflix") {
    serverSelect = [status, null];
  }
  else if (server === "duckflix") {
    serverSelect = [null, status];
  }

  const customStatus = interaction.options.getString("custom_status") || undefined;

  // Allow only Plex administrators
  if (interaction.user.id !== "110276423779897344" && interaction.user.id !== "111967042424274944") {
    return interaction.reply({ content: "You do not have permissions to change the Plex services message.", ephemeral: true });
  }
  
  try {
    await plexMessage(bot, serverSelect, false, customStatus);
    return interaction.reply({ content: "You have successfully edited the Plex services message", ephemeral: true });
  }
  catch (e) {
    console.error(e);
    return interaction.reply({ content: "Something went wrong :(", ephemeral: true });
  }
};