import Discord, { MessageEmbed } from 'discord.js';
import { BOT_COLOR, Channels } from '../constants';
const SData = require('simple-data-storage');

/**
 * Create or edit Plex message in services Discord channel
 * @param {Discord.Client} client Discord bot
 * @param {Array<boolean>} serverStatus Message object itself, used for sending messages
 * @param {string} [customStatus] Optional custom server status message
 */
export const plexMessage = async (client: Discord.Client, serverStatus: Array<boolean>, customStatus?: string) => {

  // Get 'services' channel of Puddings server
  const channel = await client.channels.fetch(Channels.SERVICES_CHANNEL) as Discord.TextChannel;
  
  // Get all messages for the channel, send new if channel is empty, or edit message if not
  channel.messages.fetch()
    .then(async (messages) => {
      if (messages.size === 0) {
        // Create new message
        setStatus();
        await channel.send({ embeds: [plexStatusMsg(texts.puddingflixHeader, texts.puddingflixSubtext, texts.duckflixHeader, texts.duckflixSubtext)] });
      }
      else {
        // Edit existing message
        for (const message of messages) {
          try {
            if (customStatus === undefined) {
              setStatus();
            }
            else {
              setStatusCustom();
            }
            await message[1].edit({ embeds: [plexStatusMsg(texts.puddingflixHeader, texts.puddingflixSubtext, texts.duckflixHeader, texts.duckflixSubtext)] });
          }
          catch (e) {
            console.log(e);
          }
        }
      }
    });

  const setStatusCustom = () => {
    if (customStatus === undefined)
      return;

    // Check for custom status message and reset command
    if (customStatus === "" || customStatus === "reset") {
      // Set subtext depending on whether server is online or not
      if (serverStatus[0] || serverStatus[1])
        customStatus = texts.upSubtextStandard.substring(1, texts.upSubtextStandard.length -1);
      else
        customStatus = texts.downSubtextStandard.substring(1, texts.downSubtextStandard.length -1);
    }

    // Check which server message is for, update text and global server status
    if (serverStatus[0] !== null) {
      texts.puddingflixHeader = texts.puddingflix + (serverStatus[0] ? texts.upCheckmark : texts.downCheckmark);
      texts.puddingflixSubtext = "*" + customStatus + "*";
      SData("puddingflix", serverStatus[0]);
    }
    else if (serverStatus[1] !== null) {
      texts.duckflixHeader = texts.duckflix + (serverStatus[1] ? texts.upCheckmark : texts.downCheckmark);
      texts.duckflixSubtext = "*" + customStatus + "*";
      SData("duckflix", serverStatus[1]);
    }
  };

  const setStatus = () => {
    if (serverStatus[0] === true && serverStatus[1] === true) {
      if (serverStatus[0] !== SData("puddingflix")) {
        texts.puddingflixHeader = texts.puddingflix + texts.upCheckmark;
        texts.puddingflixSubtext = texts.upSubtextStandard;
      }
      if (serverStatus[1] !== SData("duckflix")) {
        texts.duckflixHeader = texts.duckflix + texts.upCheckmark;
        texts.duckflixSubtext = texts.upSubtextStandard;
      }
    }
    else if (serverStatus[0] === true && serverStatus[1] === false) {
      if (serverStatus[0] !== SData("puddingflix")) {
        texts.puddingflixHeader = texts.puddingflix + texts.upCheckmark;
        texts.puddingflixSubtext = texts.upSubtextStandard;
      }
      if (serverStatus[1] !== SData("duckflix")) {
        texts.duckflixHeader = texts.duckflix + texts.downCheckmark;
        texts.duckflixSubtext = texts.downSubtextStandard;
      }
    }
    else if (serverStatus[0] === false && serverStatus[1] === true) {
      if (serverStatus[0] !== SData("puddingflix")) {
        texts.puddingflixHeader = texts.puddingflix + texts.downCheckmark;
        texts.puddingflixSubtext = texts.downSubtextStandard;
      }
      if (serverStatus[1] !== SData("duckflix")) {
        texts.duckflixHeader = texts.duckflix + texts.upCheckmark;
        texts.duckflixSubtext = texts.upSubtextStandard;
      }
    }
    else if (serverStatus[0] === false && serverStatus[1] === false) {
      if (serverStatus[0] !== SData("puddingflix")) {
        texts.puddingflixHeader = texts.puddingflix + texts.downCheckmark;
        texts.puddingflixSubtext = texts.downSubtextStandard;
      }
      if (serverStatus[1] !== SData("duckflix")) {
        texts.duckflixHeader = texts.duckflix + texts.downCheckmark;
        texts.duckflixSubtext = texts.downSubtextStandard;
      }
    }
    // Update server status saved cache
    SData("puddingflix", serverStatus[0]);
    SData("duckflix", serverStatus[1]);
  }
};

let texts = {
  puddingflixHeader: "",
  puddingflixSubtext: "",
  duckflixHeader: "",
  duckflixSubtext: "",

  puddingflix: "Puddingflix  ",
  duckflix: "Duckflix  ",
  upCheckmark: ":white_check_mark:",
  downCheckmark: ":x:",
  upSubtextStandard:"*Operational*",
  downSubtextStandard: "*Server unavailable*"
};

const plexStatusMsg = (puddingflixHeader: string, puddingflixSub: string, duckflixHeader: string, duckflixSub: string) => {
  return new MessageEmbed({
    title: "Current status of Plex servers",
    description: "See which Plex servers are currently operational. This post is automatically updated every hour.\n\u200b",
    fields: [
      {
        name: puddingflixHeader,
        value: puddingflixSub
      },
      {
        name: duckflixHeader,
        value: duckflixSub
      },
      {
        name: "\u200b",
        value: "Request a show or movie at <https://ombi.hundseth.com>\n\nContact <@110276423779897344> or <@111967042424274944> if you have questions"
      }
    ],
    color: BOT_COLOR
  }
)};
