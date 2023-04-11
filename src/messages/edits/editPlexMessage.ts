import Discord from "discord.js";
import { plexConnection } from "../../index";
import { Server } from "../../types/types";

/**
 * Edit Plex message in services channel
 * @param {Discord.Client} bot Discord bot
 * @param {Discord.ChatInputCommandInteraction} interaction Interaction object
 */
export const editPlexMessage = async (bot: Discord.Client, interaction: Discord.ChatInputCommandInteraction) => {

  const serverText = interaction.options.getString("server");
  const operational = interaction.options.getNumber("operational");

  const status: boolean = operational ? true : false;
  let server: Server;

  if (serverText === "puddingflix") {
    server = Server.PUDDINGFLIX;
  }
  else if (serverText === "duckflix") {
    server = Server.DUCKFLIX;
  }
  else {
    return;
  }

  const customMessage = interaction.options.getString("custom_status") ?? undefined;

  // Allow only Plex administrators
  if (interaction.user.id !== "110276423779897344" && interaction.user.id !== "111967042424274944") {
    return interaction.reply({ content: "You do not have permissions to change the Plex services message.", ephemeral: true });
  }
  
  try {
    await plexConnection.plexMessage?.updateCustom(server, status, customMessage);
    return interaction.reply({ content: "You have successfully edited the Plex services message", ephemeral: true });
  }
  catch (err) {
    console.error(err);
    return interaction.reply({ content: "Something went wrong :(", ephemeral: true });
  }
};
