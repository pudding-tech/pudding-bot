import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";
const SData = require("simple-data-storage");

export const filter: CommandDefinition = {
  name: "filter",
  description: "Enable, disable, or list music filters",
  commandDisplay: "filter <name>? <on/off>?",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      return msg.reply("There are no songs in the queue.");
    }

    // Check included commands. If only ".filter", list the currently enabled filters
    const filter = msg.content.substring(8, msg.content.length).split(" ");
    if (filter.length === 1 && filter[0] === "") {
      
      const filters = queue.getFiltersEnabled();
      
      if (filters.length === 0) {
        return msg.reply("No filters currently enabled.");
      }

      let filtersString = "";
      filters.forEach( (filter) => {
        filtersString += "- " + filter + "\n";
      });
      
      return msg.reply("Filters currently enabled:\n" + filtersString);
    }
    else if (filter.length < 2) {
      return msg.reply("You need to provide a filter command.");
    }

    // Set enable bool
    let enable: boolean;
    if (filter[1] === "on") {
      enable = true;
    } 
    else if (filter[1] === "off") {
      enable = false;
    }
    else {
      return msg.reply("Wrong formatting. Filter command can only be on or off.");
    }

    let filters = {
      "nightcore": false,
      "vaporwave": false,
      "reverse": false,
      "karaoke": false,
      "tremolo": false,
      "gate": false
    };

    // If first run, save filters object. If not, retrieve it from memory
    if (SData("filters") === undefined) {
      SData("filters", filters);
    }
    else {
      filters = SData("filters");
    }

    // Check if filter is valid, and if so set filter
    const filterKey = filter[0] as keyof typeof filters;
    if (!filters.hasOwnProperty(filterKey)) {
      return msg.channel.send("Requested filter not found");
    }
    filters[filterKey] = enable;
    await queue.setFilters(filters);

    return msg.channel.send(`Filter ${filter[0]} has been turned ${filter[1]}.`);
  }
};