import { CommandDefinition } from './CommandDefinition';
import { help } from './commands/help';
import { puddingtech } from './commands/puddingtech';
import { git } from './commands/git';
import { pudding } from './commands/pudding';
import { avatar } from './commands/avatar';
import { adventures } from './commands/adventures';
import { nyan } from './commands/nyan';

export const commands: CommandDefinition[] = [
  help,
  puddingtech,
  git,
  pudding,
  avatar,
  adventures,
  nyan
];
