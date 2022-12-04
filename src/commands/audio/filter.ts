import SData from "simple-data-storage";
import { ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../../types/CommandDefinition";
import { Category } from "../../constants";

export const filter: CommandDefinition = {
  name: "filter",
  description: "Enable, disable, or list music filters",
  commandDisplay: "filter <name>? <on/off>?",
  category: Category.AUDIO,
  options: [
    {
      name: "name",
      description: "Name of filter",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [{ name: "nightcore",  value: "nightcore"},
                { name: "vaporwave", value: "vaporwave" },
                { name: "reverse", value: "reverse" },
                { name: "karaoke", value: "karaoke" },
                { name: "tremolo", value: "tremolo" },
                { name: "gate", value: "gate" }]
    },
    {
      name: "toggle",
      description: "Enable or disable filter",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [{ name: "on",  value: "true" },
                { name: "off", value: "false" }]
    },
  ],
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    // Check included commands. If only "/filter", list the currently enabled filters
    const filter = interaction.options.getString("name");
    const toggle: boolean = JSON.parse(interaction.options.getString("toggle")!);
    
    if (!filter && toggle === null) {
      
      const filters = queue.getFiltersEnabled();
      
      if (filters.length === 0) {
        return interaction.reply("No filters currently enabled.");
      }

      let filtersString = "";
      filters.forEach( (filter) => {
        filtersString += "- " + filter + "\n";
      });
      
      return interaction.reply("Filters currently enabled:\n" + filtersString);
    }
    else if (!filter && toggle !== null) {
      return interaction.reply({ content: "You need to provide a filter name.", ephemeral: true });
    }
    else if (filter && toggle === null) {
      return interaction.reply({ content: "You need to specify if filter should be turned on or off.", ephemeral: true });
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
    const filterKey = filter as keyof typeof filters;
    filters[filterKey] = toggle;
    await queue.setFilters(filters);

    return interaction.reply(`Filter ${filter} has been turned ${toggle ? "on" : "off"}.`);
  }
};