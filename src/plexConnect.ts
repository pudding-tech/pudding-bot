import Discord from "discord.js";
import { plexMessage } from "./messages/plexMessage";
const PlexAPI = require("plex-api");
const cron = require("node-cron");
const SData = require("simple-data-storage");

export const plexConnect = async (bot: Discord.Client) => {

  if (!process.env.PUDDINGFLIX_IP || !process.env.PUDDINGFLIX_PORT || !process.env.PUDDINGFLIX_TOKEN || !process.env.PLEX_CLIENT_IDENTIFIER) {
    console.log("Missing Puddingflix environment variables. Will not attempt to connect to Plex services.");
    return;
  }
  if (!process.env.DUCKFLIX_IP || !process.env.DUCKFLIX_PORT || !process.env.DUCKFLIX_TOKEN || !process.env.PLEX_CLIENT_IDENTIFIER) {
    console.log("Missing Duckflix environment variables. Will not attempt to connect to Plex services.");
    return;
  }

  // Connect to Puddingflix
  const plexClientPuddingflix = new PlexAPI({
    hostname: process.env.PUDDINGFLIX_IP,
    port: process.env.PUDDINGFLIX_PORT,
    token: process.env.PUDDINGFLIX_TOKEN,
    options: {
      identifier: process.env.PLEX_CLIENT_IDENTIFIER,
      deviceName: "PuddingBot"
    }
  });

  // Connect to Duckflix
  const plexClientDuckflix = new PlexAPI({
    hostname: process.env.DUCKFLIX_IP,
    port: process.env.DUCKFLIX_PORT,
    token: process.env.DUCKFLIX_TOKEN,
    options: {
      identifier: process.env.PLEX_CLIENT_IDENTIFIER,
      deviceName: "PuddingBot"
    }
  });
  
  let puddingflix = false;
  let duckflix = false;
  let puddingflixLastValue: boolean;
  let duckflixLastValue: boolean;

  const serversCheck = async () => {

    // Check if Puddingflix is online
    try {
      const result = await plexClientPuddingflix.query("/");
      console.log("Plex Media Server '" + result.MediaContainer.friendlyName + "' is running, version " + result.MediaContainer.version);
      puddingflix = true;
    }
    catch (e) {
      puddingflix = false;
      console.error("Could not connect to Puddingflix");
    }

    // Check if Duckflix is online
    try {
      const result = await plexClientDuckflix.query("/");
      console.log("Plex Media Server '" + result.MediaContainer.friendlyName + "' is running, version " + result.MediaContainer.version);
      duckflix = true;
    }
    catch (e) {
      duckflix = false;
      console.error("Could not connect to Duckflix");
    }

    puddingflixLastValue = SData("puddingflix");
    duckflixLastValue = SData("duckflix");

    // Do not send edit request if status has not changed
    if (puddingflix === puddingflixLastValue && duckflix === duckflixLastValue) {
      console.log("No plex status changes - " + new Date());
      return;
    }

    plexMessage(bot, [puddingflix, duckflix], true);
  };

  await serversCheck();

  // Run check every hour
  cron.schedule("0 * * * *", async () => {
    await serversCheck();
  });
};
