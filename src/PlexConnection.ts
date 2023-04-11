import Discord from "discord.js";
import PlexAPI from "plex-api";
import { Cron } from "croner";
import { PlexMessage } from "./messages/PlexMessage";

export class PlexConnection {

  static instance: PlexConnection;
  private bot: Discord.Client | null = null;
  private plexClientPuddingflix: any;
  private plexClientDuckflix: any;
  private puddingflix: boolean | null = null;
  private duckflix: boolean | null = null;
  plexMessage: PlexMessage | null = null;

  /**
   * PlexConnection singleton. Use `run` to start server check
   */
  constructor(bot: Discord.Client) {
    if (PlexConnection.instance) {
      console.log("PlexConnection singleton cannot be instantiated more than once - returning same instance");
      return PlexConnection.instance;
    }

    PlexConnection.instance = this;
    this.bot = bot;

    if (!process.env.PUDDINGFLIX_IP || !process.env.PUDDINGFLIX_PORT || !process.env.PUDDINGFLIX_TOKEN || !process.env.PLEX_CLIENT_IDENTIFIER) {
      console.log("Missing Puddingflix environment variables. Will not attempt to connect to Plex services.");
      return;
    }
    if (!process.env.DUCKFLIX_IP || !process.env.DUCKFLIX_PORT || !process.env.DUCKFLIX_TOKEN || !process.env.PLEX_CLIENT_IDENTIFIER) {
      console.log("Missing Duckflix environment variables. Will not attempt to connect to Plex services.");
      return;
    }

    // Connect to Puddingflix
    this.plexClientPuddingflix = new PlexAPI({
      hostname: process.env.PUDDINGFLIX_IP,
      port: process.env.PUDDINGFLIX_PORT,
      token: process.env.PUDDINGFLIX_TOKEN,
      options: {
        identifier: process.env.PLEX_CLIENT_IDENTIFIER,
        deviceName: "PuddingBot"
      }
    });

    // Connect to Duckflix
    this.plexClientDuckflix = new PlexAPI({
      hostname: process.env.DUCKFLIX_IP,
      port: process.env.DUCKFLIX_PORT,
      token: process.env.DUCKFLIX_TOKEN,
      options: {
        identifier: process.env.PLEX_CLIENT_IDENTIFIER,
        deviceName: "PuddingBot"
      }
    });

    this.plexMessage = new PlexMessage(this.bot);
  }

  /**
   * Runs Plex connection. 
   * Automatically checks servers and updates Discord channel every hour
   */
  run = async () => {
    if (!this.plexMessage) {
      return;
    }
    await this.serversUpdate();

    // Run update check every hour
    Cron("0 * * * *", { timezone: "Europe/Oslo" }, async () => {
      await this.serversUpdate();
    });
  };

  setPuddingflix = (operational: boolean) => {
    this.puddingflix = operational;
  };

  setDuckflix = (operational: boolean) => {
    this.duckflix = operational;
  };

  private serversUpdate = async () => {

    let puddingflix = false;
    let duckflix = false;

    // Check if Puddingflix is online
    try {
      const result = await this.plexClientPuddingflix.query("/");
      console.log("Plex Media Server '" + result.MediaContainer.friendlyName + "' is running, version " + result.MediaContainer.version);
      puddingflix = true;
    }
    catch (e) {
      console.log("Could not connect to Puddingflix");
    }

    // Check if Duckflix is online
    try {
      const result = await this.plexClientDuckflix.query("/");
      console.log("Plex Media Server '" + result.MediaContainer.friendlyName + "' is running, version " + result.MediaContainer.version);
      duckflix = true;
    }
    catch (e) {
      console.log("Could not connect to Duckflix");
    }

    if (puddingflix !== this.puddingflix) {
      console.log("Puddingflix status changed at " + new Date());
    }
    if (duckflix !== this.duckflix) {
      console.log("Duckflix status changed at " + new Date());
    }
    if (puddingflix === this.puddingflix && duckflix === this.duckflix) {
      console.log("No plex status changes - " + new Date());
    }

    if (this.bot && this.plexMessage) {
      try {
        await this.plexMessage.update(
          puddingflix,
          duckflix,
          puddingflix === this.puddingflix ? false : true,
          duckflix === this.duckflix ? false : true
        );
      }
      catch (err) {
        console.error("Something went wrong updating Plex status message:\n", err);
      }
    }

    this.puddingflix = puddingflix;
    this.duckflix = duckflix;
  };
}
