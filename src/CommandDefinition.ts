import Discord from 'discord.js';

export interface CommandDefinition {
  name: string,
  description?: string,
  requiredPermissions?: Discord.PermissionString[],
  executor: (msg: Discord.Message, client?: Discord.Client) => Promise<any>
};