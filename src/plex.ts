import Discord from 'discord.js';
import { plexMessage } from './messages/plexMessage';
var PlexAPI = require('plex-api');
var cron = require('node-cron');

export const plexConnect = async (bot: Discord.Client) => {

  // Connect to Puddingflix and Duckflix
  let plexClientPuddingflix = new PlexAPI({hostname: process.env.PUDDINGFLIX_IP, port: process.env.PUDDINGFLIX_PORT, token: process.env.PUDDINGFLIX_TOKEN});
  let plexClientDuckflix = new PlexAPI({hostname: process.env.DUCKFLIX_IP, port: process.env.DUCKFLIX_PORT, token: process.env.DUCKFLIX_TOKEN});
  
  let puddingflix: boolean = false;
  let duckflix: boolean = false;
  let puddingflixLastValue: boolean;
  let duckflixLastValue: boolean;

  // Function for updating Plex status message
  const serversCheck = async () => {

    // Check if Puddingflix is online
    try {
      let result = await plexClientPuddingflix.query("/") 
      console.log("Plex Media Server '" + result.MediaContainer.friendlyName + "' is running, version " + result.MediaContainer.version);
      puddingflix = true;
    }
    catch (e) {
      puddingflix = false;
      console.error("Could not connect to puddingflix");
    };

    // Check if Duckflix is online
    try {
      let result = await plexClientDuckflix.query("/") 
      console.log("Plex Media Server '" + result.MediaContainer.friendlyName + "' is running, version " + result.MediaContainer.version);
      duckflix = true;
    }
    catch (e) {
      duckflix = false;
      console.error("Could not connect to duckflix");
    };
    
    // Do not send edit request if status has not changed
    if (puddingflix === puddingflixLastValue && duckflix === duckflixLastValue) {
      console.log("No plex status changes")
      return;
    }
    puddingflixLastValue = puddingflix;
    duckflixLastValue = duckflix;

    console.log("Puddingflix online: " + puddingflix + "\nDuckflix online: " + duckflix);
    plexMessage(bot, [puddingflix, duckflix]);
  };

  serversCheck();

  // Run check every hour
  cron.schedule('0 * * * *', async () => {
    serversCheck();
  });
};
