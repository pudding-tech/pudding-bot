import { CommandDefinition } from './CommandDefinition';
import { help } from './commands/help';
import { puddingtech } from './commands/puddingtech';
import { git } from './commands/git';
import { pudding } from './commands/pudding';
import { nyan } from './commands/nyan';

export const commands: CommandDefinition[] = [
  help,
  puddingtech,
  git,
  pudding,
  nyan
];
