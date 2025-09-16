import { ApplicationCommandData, ChatInputCommandInteraction, Client, PermissionsString } from "discord.js";
import { Category } from "../constants.ts";

export type CommandDefinition = ApplicationCommandData & {
  category: Category,
  commandDisplay?: string | string[],
  requiredPermissions?: PermissionsString[],
  executor: (interaction: ChatInputCommandInteraction, client: Client) => Promise<unknown>
};
