import Discord, { MessageEmbed } from 'discord.js';
import { BOT_COLOR, Channels } from '../constants';

export const servicesMessage = async (client: Discord.Client, serverStatus: Array<boolean>) => {

  // Get 'services' channel of Puddings server
  const channel = await client.channels.fetch(Channels.SERVICES_CHANNEL) as Discord.TextChannel;

  // Get all messages for the channel, send new if channel is empty, or edit message if not
  channel.messages.fetch()
    .then(async (messages) => {
      if (messages.size === 0) {
        // Create new message
        channel.send({ embeds: [allOperational] });
      }
      else {
        // Edit existing message
        for (const message of messages) {
          try {
            
            if (serverStatus[0] === true && serverStatus[1] === true) {
              await message[1].edit({ embeds: [allOperational] });
            }
            else if (serverStatus[0] === true && serverStatus[1] === false) {
              await message[1].edit({ embeds: [onlyPuddingflix] });
            }
            else if (serverStatus[0] === false && serverStatus[1] === true) {
              await message[1].edit({ embeds: [onlyDuckflix] });
            }
            else if (serverStatus[0] === false && serverStatus[1] === false) {
              await message[1].edit({ embeds: [noneOperational] });
            }
          }
          catch (e) {
            console.log(e);
          }
        }
      }
    })
};

const allOperational = new MessageEmbed({
  title: "Current status of Plex servers",
  description: "See which plex servers are currently operational. This post is automatically updated every hour. WIP\n\u200b",
  fields: [
    {
      name: "Puddingflix :white_check_mark:",
      value: "*Operational*",
      inline: false
    },
    {
      name: "Duckflix :white_check_mark:",
      value: "*Operational (downtime to be expected due to server migration)*"
    },
    {
      name: "\u200b",
      value: "Request a show or movie at <https://ombi.hundseth.com>\n\nContact @aydex or <@111967042424274944> if you have questions"
    }
  ],
  color: BOT_COLOR
});

const onlyPuddingflix = new MessageEmbed({
  title: "Current status of Plex servers",
  description: "See which plex servers are currently operational. This post is automatically updated every hour. WIP\n\u200b",
  fields: [
    {
      name: "Puddingflix :white_check_mark:",
      value: "*Operational*"
    },
    {
      name: "Duckflix :x:",
      value: "*Server down*"
    },
    {
      name: "\u200b",
      value: "Request a show or movie at <https://ombi.hundseth.com>\n\nContact @aydex or <@111967042424274944> if you have questions"
    }
  ],
  color: BOT_COLOR
});

const onlyDuckflix = new MessageEmbed({
  title: "Current status of Plex servers",
  description: "See which plex servers are currently operational. This post is automatically updated every hour. WIP\n\u200b",
  fields: [
    {
      name: "Puddingflix :x:",
      value: "*Server down*"
    },
    {
      name: "Duckflix :white_check_mark:",
      value: "*Operational (downtime to be expected due to server migration)*"
    },
    {
      name: "\u200b",
      value: "Request a show or movie at <https://ombi.hundseth.com>\n\nContact @aydex or <@111967042424274944> if you have questions"
    }
  ],
  color: BOT_COLOR
});

const noneOperational = new MessageEmbed({
  title: "Current status of Plex servers",
  description: "See which plex servers are currently operational. This post is automatically updated every hour. WIP\n\u200b",
  fields: [
    {
      name: "Puddingflix :x:",
      value: "*Server down*"
    },
    {
      name: "Duckflix :x:",
      value: "*Server down*"
    },
    {
      name: "\u200b",
      value: "Request a show or movie at <https://ombi.hundseth.com>\n\nContact @aydex or <@111967042424274944> if you have questions"
    }
  ],
  color: BOT_COLOR
});