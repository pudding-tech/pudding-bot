import { ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../types/CommandDefinition.ts";
import { Category } from "../constants.ts";
import { editPlexMessage } from "../messages/edits/editPlexMessage.ts";

export const edit: CommandDefinition = {
  name: "edit",
  description: "Edit a message in a Discord channel",
  commandDisplay: ["edit plex <server> <operational> <custom_status>?"],
  category: Category.ADMIN,
  options: [
    {
      name: "plex",
      description: "Edit the Plex message in services channel - Only usable for Plex admins",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "server",
          description: "Name of server to change status of",
          required: true,
          type: ApplicationCommandOptionType.String,
          choices: [{name: "puddingflix", value: "puddingflix"},
                    {name: "duckflix", value: "duckflix"}]
        },
        {
          name: "operational",
          description: "Is server operational?",
          required: true,
          type: ApplicationCommandOptionType.Number,
          choices: [{name: "yes", value: 1},
                    {name: "no", value: 0}]
        },
        {
          name: "custom_status",
          description: "Optional custom message used for the server's status",
          required: false,
          type: ApplicationCommandOptionType.String
        }
      ]
    }
  ],
  executor: async (interaction, bot) => {

    // Extract which message to edit
    const subCmd = interaction.options.getSubcommand();

    // Edit Plex server status
    if (subCmd === "plex") {
      return editPlexMessage(bot, interaction);
    }
  }
};
