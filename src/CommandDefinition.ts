import Discord, { ApplicationCommandData } from "discord.js";
import { Player } from "discord-player";
import { Category } from "./constants";

export type CommandDefinition = ApplicationCommandData & {
  category: Category,
  commandDisplay?: string | string[],
  requiredPermissions?: Discord.PermissionString[],
  executor: (interaction: Discord.CommandInteraction, client: Discord.Client, player?: Player) => Promise<unknown>
};