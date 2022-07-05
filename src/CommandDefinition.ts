import Discord from "discord.js";
import { Player } from "discord-player";
import { Category } from "./constants";

export interface CommandDefinition {
  name: string,
  description?: string,
  category: Category,
  commandDisplay?: string,
  requiredPermissions?: Discord.PermissionString[],
  executor: (msg: Discord.Message, client: Discord.Client, player?: Player) => Promise<unknown>
}