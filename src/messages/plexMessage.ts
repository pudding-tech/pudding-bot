import Discord, { MessageEmbed } from 'discord.js';
import { BOT_COLOR, Channels } from '../constants';

export const plexMessage = async (client: Discord.Client, serverStatus: Array<boolean>) => {

  // Get 'services' channel of Puddings server
  const channel = await client.channels.fetch(Channels.SERVICES_CHANNEL) as Discord.TextChannel;

  // Get all messages for the channel, send new if channel is empty, or edit message if not
  channel.messages.fetch()
    .then(async (messages) => {
      if (messages.size === 0) {
        // Create new message
        channel.send({ embeds: [plexStatusMsg(status.puddingflixOperationalHeader, status.puddingflixOperationalSubtext, status.duckflixOperationalHeader, status.duckflixOperationalSubtext)] });
      }
      else {
        // Edit existing message
        for (const message of messages) {
          try {
            
            if (serverStatus[0] === true && serverStatus[1] === true) {
              await message[1].edit({ embeds: [plexStatusMsg(status.puddingflixOperationalHeader, status.puddingflixOperationalSubtext, status.duckflixOperationalHeader, status.duckflixOperationalSubtext)] });
            }
            else if (serverStatus[0] === true && serverStatus[1] === false) {
              await message[1].edit({ embeds: [plexStatusMsg(status.puddingflixOperationalHeader, status.puddingflixOperationalSubtext, status.duckflixDownHeader, status.duckflixDownSubtext)] });
            }
            else if (serverStatus[0] === false && serverStatus[1] === true) {
              await message[1].edit({ embeds: [plexStatusMsg(status.puddingflixDownHeader, status.puddingflixDownSubtext, status.duckflixOperationalHeader, status.duckflixOperationalSubtext)] });
            }
            else if (serverStatus[0] === false && serverStatus[1] === false) {
              await message[1].edit({ embeds: [plexStatusMsg(status.puddingflixDownHeader, status.puddingflixDownSubtext, status.duckflixDownHeader, status.duckflixDownSubtext)] });
            }
          }
          catch (e) {
            console.log(e);
          }
        }
      }
    })
};

let status = {
  puddingflixOperationalHeader: "Puddingflix :white_check_mark:",
  puddingflixOperationalSubtext: "*Operational*",
  duckflixOperationalHeader: "Duckflix :white_check_mark:",
  duckflixOperationalSubtext: "*Operational*",
  puddingflixDownHeader: "Puddingflix :x:",
  puddingflixDownSubtext: "*Server down*",
  duckflixDownHeader: "Duckflix :x:",
  duckflixDownSubtext: "*Server down*",
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
