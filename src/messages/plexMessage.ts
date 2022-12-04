import Discord, { EmbedBuilder } from "discord.js";
import SData from "simple-data-storage";
import { BOT_COLOR, Channels } from "../constants";

/**
 * Create or edit Plex message in services Discord channel
 * @param {Discord.Client} client Discord bot
 * @param {Array<boolean | null>} serverStatus Operational status for the servers
 * @param {boolean} [autoTriggered] Whether the function is triggered automatically or manually
 * @param {string} [customMessage] Optional custom server status message
 */
export const plexMessage = async (client: Discord.Client, serverStatus: Array<boolean | null>, autoTriggered: boolean, customMessage?: string) => {

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
        const message = messages.first(1);
        try {
          autoTriggered ? setStatus() : setStatusCustom();
          return await message[0].edit({ embeds: [plexStatusMsg(texts.puddingflixHeader, texts.puddingflixSubtext, texts.duckflixHeader, texts.duckflixSubtext)] });
        }
        catch (e) {
          console.log(e);
          return;
        }
      }
    });

  const setStatusCustom = () => {

    // Check for custom message
    if (customMessage === undefined) {
      // Set subtext depending on whether server is online or not
      if (serverStatus[0] || serverStatus[1])
        customMessage = texts.upSubtextStandard;
      else
        customMessage = texts.downSubtextStandard;
    }
    else {
      customMessage = "*" + customMessage + "*";
    }

    // Check which server message is for, then update text and server status
    if (serverStatus[0] !== null) {
      texts.puddingflixHeader = texts.puddingflix + (serverStatus[0] ? texts.upCheckmark : texts.downCheckmark);
      texts.puddingflixSubtext = customMessage;
      SData("puddingflix", serverStatus[0]);
    }
    else if (serverStatus[1] !== null) {
      texts.duckflixHeader = texts.duckflix + (serverStatus[1] ? texts.upCheckmark : texts.downCheckmark);
      texts.duckflixSubtext = customMessage;
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
  };
};

const texts = {
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
  return new EmbedBuilder({
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
  });
};
