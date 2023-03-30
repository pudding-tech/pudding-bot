import Discord, { ApplicationCommandData } from "discord.js";
import { Category } from "../constants";

export type CommandDefinition = ApplicationCommandData & {
  category: Category,
  commandDisplay?: string | string[],
  requiredPermissions?: Discord.PermissionsString[],
  executor: (interaction: Discord.ChatInputCommandInteraction, client: Discord.Client) => Promise<unknown>
};
