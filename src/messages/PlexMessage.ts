import Discord, { EmbedBuilder } from "discord.js";
import { plexConnection } from "../index";
import { BOT_COLOR, Channels } from "../constants";
import { Server } from "../constants";
import { formatDate } from "../utils/formatDate";

export class PlexMessage {

  private bot: Discord.Client;
  private puddingflixHeader = "";
  private puddingflixSubtext = "";
  private duckflixHeader = "";
  private duckflixSubtext = "";
  private texts = {
    puddingflix: "Puddingflix  ",
    duckflix: "Duckflix  ",
    upCheckmark: ":white_check_mark:",
    downCheckmark: ":x:",
    upSubtextStandard:"*Operational*",
    downSubtextStandard: "*Server unavailable*"
  };
  
  /**
   * Handle and send/update Plex status message in services channel
   * @param bot 
   */
  constructor(bot: Discord.Client) {
    this.bot = bot;
  }

  /**
   * Update Plex server status.  
   * Create or edit Plex message in services Discord channel.
   * @param puddingflix Puddingflix status
   * @param duckflix Duckflix status
   * @param puddingflixChanged Whether puddingflix status has changed or not
   * @param duckflixChanged Whether duckflix status has changed or not
   */
  update = async (puddingflix: boolean, duckflix: boolean, puddingflixChanged: boolean, duckflixChanged: boolean) => {

    const channel = await this.getServicesChannel();

    this.setStatus(puddingflix, duckflix, puddingflixChanged, duckflixChanged);
    await this.sendMessage(channel);
  };

  /**
   * Update Plex server status of selected server.  
   * Create or edit Plex message in services Discord channel.
   * @param server Server to update
   * @param status Status of server
   * @param customMessage Optional custom server status message
   */
  updateCustom = async (server: Server, status: boolean, customMessage?: string) => {

    const channel = await this.getServicesChannel();

    this.setStatusCustom(server, status, customMessage);
    await this.sendMessage(channel);
    
    // Update server status
    if (server === Server.PUDDINGFLIX) {
      plexConnection.setPuddingflix(status);
    }
    else if (server === Server.DUCKFLIX) {
      plexConnection.setDuckflix(status);
    }
  };

  /**
   * Get 'services' Discord channel
   */
  private getServicesChannel = async () => {
    const channel = await this.bot.channels.fetch(Channels.SERVICES_CHANNEL) as Discord.TextChannel;
    return channel;
  };

  /**
   * Create or edit Plex message in Discord channel
   * @param channel Channel to send/edit message in
   */
  private sendMessage = async (channel: Discord.TextChannel) => {

    // Get all messages for the channel, send new if channel is empty, or edit message if not
    const messages = await channel.messages.fetch();

    if (messages.size === 0) {
      // Create new message
      try {
        await channel.send({ embeds: [this.plexStatusMsg()] });
      }
      catch (err) {
        console.error(err);
      }
    }
    else {
      // Edit existing message
      try {
        const message = messages.first(1);
        await message[0].edit({ embeds: [this.plexStatusMsg()] });
      }
      catch (err) {
        console.error(err);
      }
    }
  };

  /**
   * Updates all texts based on input
   * @param puddingflix Status of puddingflix
   * @param duckflix Status of duckflix
   * @param puddingflixChanged Whether puddingflix status has changed or not
   * @param duckflixChanged Whether duckflix status has changed or not
   */
  private setStatus = (puddingflix: boolean, duckflix: boolean, puddingflixChanged: boolean, duckflixChanged: boolean) => {
    if (puddingflixChanged && puddingflix) {
      this.puddingflixHeader = this.texts.puddingflix + this.texts.upCheckmark;
      this.puddingflixSubtext = this.texts.upSubtextStandard;
    }
    else if (puddingflixChanged && !puddingflix) {
      this.puddingflixHeader = this.texts.puddingflix + this.texts.downCheckmark;
      this.puddingflixSubtext = this.texts.downSubtextStandard;
    }
    if (duckflixChanged && duckflix) {
      this.duckflixHeader = this.texts.duckflix + this.texts.upCheckmark;
      this.duckflixSubtext = this.texts.upSubtextStandard;
    }
    else if (duckflixChanged && !duckflix) {
      this.duckflixHeader = this.texts.duckflix + this.texts.downCheckmark;
      this.duckflixSubtext = this.texts.downSubtextStandard;
    }
  };

  /**
   * Updates texts for selected server based on input
   * @param server Server to update
   * @param status Status of server
   * @param customMessage Optional custom server status message
   */
  private setStatusCustom = (server: Server, status: boolean, customMessage?: string) => {
    let message: string;
    if (customMessage) {
      message = "*" + customMessage + "*";
    }
    else {
      if (status) {
        message = this.texts.upSubtextStandard;
      }
      else {
        message = this.texts.downSubtextStandard;
      }
    }

    if (server === Server.PUDDINGFLIX) {
      this.puddingflixHeader = this.texts.puddingflix + (status ? this.texts.upCheckmark : this.texts.downCheckmark);
      this.puddingflixSubtext = message;
    }
    else if (server === Server.DUCKFLIX) {
      this.duckflixHeader = this.texts.duckflix + (status ? this.texts.upCheckmark : this.texts.downCheckmark);
      this.duckflixSubtext = message;
    }
  };

  /**
   * Return formatted message embed object
   * @returns Embed object
   */
  private plexStatusMsg = () => {
    return new EmbedBuilder({
      title: "Current status of Plex servers",
      description: "Last updated: **" + formatDate(new Date()) + "**\n\nSee which Plex servers are currently operational. This post is automatically updated every hour.\n\u200b",
      fields: [
        {
          name: this.puddingflixHeader,
          value: this.puddingflixSubtext
        },
        {
          name: this.duckflixHeader,
          value: this.duckflixSubtext
        },
        {
          name: "\u200b",
          value: "Request a show/movie at <https://overseerr.hundseth.com>\n\nContact <@110276423779897344> or <@111967042424274944> if you have questions"
        }
      ],
      color: BOT_COLOR
    });
  };
}
