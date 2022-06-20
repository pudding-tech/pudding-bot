import Discord from 'discord.js';

export interface CommandDefinition {
  name: string,
  description?: string,
  executor: (msg: Discord.Message, client?: Discord.Client) => Promise<any>
};