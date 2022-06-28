import { CommandDefinition } from './CommandDefinition';
import { help } from './commands/help';
import { puddingtech } from './commands/puddingtech';
import { git } from './commands/git';
import { pudding } from './commands/pudding';
import { avatar } from './commands/avatar';
import { adventures } from './commands/adventures';
import { nyan } from './commands/nyan';
import { what } from './commands/what';
import { mordor } from './commands/mordor';
import { edit } from './commands/edit';

export const commands: CommandDefinition[] = [
  adventures,
  avatar,
  edit,
  git,
  help,
  mordor,
  nyan,
  pudding,
  puddingtech,
  what
];
