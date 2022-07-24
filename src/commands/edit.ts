import { Constants } from "discord.js";
import { CommandDefinition } from "../CommandDefinition";
import { Category } from "../constants";
import { editPlexMessage } from "../messages/edits/editPlexMessage";

export const edit: CommandDefinition = {
  name: "edit",
  description: "Edit a message in a Discord channel",
  commandDisplay: ["edit plex <server> <operational> <custom_status>?"],
  category: Category.ADMIN,
  options: [
    {
      name: "plex",
      description: "Edit the Plex message in services channel - Only usable for Plex admins",
      type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
      options: [
        {
          name: "server",
          description: "Name of server to change status of",
          required: true,
          type: Constants.ApplicationCommandOptionTypes.STRING,
          choices: [{name: "puddingflix", value: "puddingflix"},
                    {name: "duckflix", value: "duckflix"}]
        },
        {
          name: "operational",
          description: "Is server operational?",
          required: true,
          type: Constants.ApplicationCommandOptionTypes.NUMBER,
          choices: [{name: "yes", value: 1},
                    {name: "no", value: 0}]
        },
        {
          name: "custom_status",
          description: "Optional custom message used for the server's status",
          required: false,
          type: Constants.ApplicationCommandOptionTypes.STRING
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