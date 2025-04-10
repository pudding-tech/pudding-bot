import Discord from "discord.js";
import { Cron } from "croner";
import { DOMParser } from "@xmldom/xmldom";
import { PlexMessage } from "./messages/PlexMessage";

export class PlexConnection {

  static instance: PlexConnection;
  private bot: Discord.Client | null = null;
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
    this.plexMessage = new PlexMessage(this.bot);
  }

  /**
   * Runs Plex connection. 
   * Automatically checks servers and updates Discord channel every hour
   */
  run = async () => {
    if (!process.env.PUDDINGFLIX_HOST || !process.env.PUDDINGFLIX_PORT) {
      console.log("Missing Puddingflix environment variables - will not attempt to connect to Plex services.");
      return;
    }
    if (!process.env.DUCKFLIX_HOST || !process.env.DUCKFLIX_PORT) {
      console.log("Missing Duckflix environment variables - will not attempt to connect to Plex services.");
      return;
    }

    await this.serversUpdate();

    // Run update check every hour
    new Cron("0 * * * *", { timezone: "Europe/Oslo" }, async () => {
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
    puddingflix = await this.checkServerStatus("Puddingflix", process.env.PUDDINGFLIX_HOST!, process.env.PUDDINGFLIX_PORT!);

    // Check if Duckflix is online
    duckflix = await this.checkServerStatus("Duckflix", process.env.DUCKFLIX_HOST!, process.env.DUCKFLIX_PORT!);

    const puddingflixChanged = puddingflix === this.puddingflix ? false : true;
    const duckflixChanged = duckflix === this.duckflix ? false : true;

    if (puddingflixChanged && this.puddingflix) {
      console.log("Puddingflix status changed at " + new Date());
    }
    if (duckflixChanged && this.duckflix) {
      console.log("Duckflix status changed at " + new Date());
    }
    if (!puddingflixChanged && !duckflixChanged) {
      console.log("No plex status changes - " + new Date());
    }

    if (this.bot && this.plexMessage) {
      try {
        await this.plexMessage.update(
          puddingflix,
          duckflix,
          puddingflixChanged,
          duckflixChanged
        );
      }
      catch (err) {
        console.error("Something went wrong updating Plex status message:\n", err);
      }
    }

    this.puddingflix = puddingflix;
    this.duckflix = duckflix;
  };

  private checkServerStatus = async (serverName: string, host: string, port: string) => {
    try {
      const res = await fetch(`https://${host}:${port}/identity`, { method: "GET" });
      if (!res.ok) {
        throw new Error(`${serverName} server responded with status ${res.status}`);
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("text/xml")) {
        throw new Error(`${serverName} server did not respond with XML content type`);
      }

      const xmlText = await res.text();
      const doc = new DOMParser().parseFromString(xmlText, "text/xml");
      const version = doc.getElementsByTagName("MediaContainer")[0]?.getAttribute("version");
      if (!version) {
        throw new Error(`Could not find version attribute in ${serverName} XML response`);
      }

      console.log(`Plex Media Server '${serverName}' is running, version ${version}`);
      return true;
    }
    catch (err){
      console.error(`Could not connect to ${serverName}`);
      console.error(err);
      return false;
    }
  };
}
