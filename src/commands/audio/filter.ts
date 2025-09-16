import { ApplicationCommandOptionType } from "discord.js";
import { useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { Category } from "../../constants.ts";

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
      choices: [filters.map(f => ({ name: f, value: f }))].flat()
    }
  ],
  executor: async (interaction) => {

    const player = useMainPlayer();

    if (!player || !interaction.guildId) {
      return;
    }
    await interaction.deferReply();

    const queue = player.nodes.get(interaction.guildId);
    if (!queue) {
      return interaction.editReply("There are no songs in the queue.");
    }

    const name = interaction.options.getString("name");
    const filterName = filters.includes(name as Filter) ? (name as Filter) : null;

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

    try {
      // Toggle filter
      await queue.filters.ffmpeg.toggle(filterName);
      const toggled = queue.filters.ffmpeg.getFiltersEnabled().includes(filterName);

      return interaction.editReply(`Filter ${filterName} has been turned ${toggled ? "on" : "off"}.`);
    }
    catch (err) {
      console.error(err);
    }
  }
};
