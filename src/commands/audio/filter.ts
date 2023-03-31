import { ApplicationCommandOptionType } from "discord.js";
import { useMasterPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition";
import { Category } from "../../constants";

export const filter: CommandDefinition = {
  name: "filter",
  description: "Toggle filter, or list active music filters",
  commandDisplay: "filter <name>?",
  category: Category.AUDIO,
  options: [
    {
      name: "name",
      description: "Name of filter",
      required: false,
      type: ApplicationCommandOptionType.String,
      choices: [{ name: "nightcore",  value: "nightcore"},
                { name: "vaporwave", value: "vaporwave" },
                { name: "karaoke", value: "karaoke" },
                { name: "lofi", value: "lofi" },
                { name: "vibrato", value: "vibrato" },
                { name: "tremolo", value: "tremolo" },
                { name: "bassboost", value: "bassboost" },
                { name: "surrounding", value: "surrounding" }]
    }
  ],
  executor: async (interaction) => {

    const player = useMasterPlayer();

    if (!player || !interaction.guildId) {
      return;
    }
    await interaction.deferReply();

    const queue = player.nodes.get(interaction.guildId);
    if (!queue) {
      return interaction.editReply("There are no songs in the queue.");
    }

    const filterName = interaction.options.getString("name");
    
    // If no name provided - list the currently enabled filters
    if (!filterName) {
      const filters = queue.filters.ffmpeg.getFiltersEnabled();
      
      if (filters.length === 0) {
        return interaction.editReply("No filters currently enabled.");
      }

      let filtersString = "";
      filters.forEach(filter => {
        filtersString += "- " + filter + "\n";
      });
      
      return interaction.editReply("Filters currently enabled:\n" + filtersString);
    }

    const filters = [
      "nightcore",
      "vaporwave",
      "karaoke",
      "lofi",
      "vibrato",
      "tremolo",
      "bassboost",
      "surrounding"
    ] as const;
    type Filter = typeof filters[number];

    // Convert to possible filter type
    const filterKey = filterName as Filter;
    
    try {
      // Toggle filter
      await queue.filters.ffmpeg.toggle(filterKey);
      const toggled = queue.filters.ffmpeg.getFiltersEnabled().includes(filterKey);

      return interaction.editReply(`Filter ${filterKey} has been turned ${toggled ? "on" : "off"}.`);
    }
    catch (err) {
      console.error(err);
    }
  }
};
