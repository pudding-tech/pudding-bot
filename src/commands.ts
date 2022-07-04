import { CommandDefinition } from "./CommandDefinition";
import { help } from "./commands/help";
import { puddingtech } from "./commands/puddingtech";
import { git } from "./commands/git";
import { pudding } from "./commands/pudding";
import { avatar } from "./commands/avatar";
import { adventures } from "./commands/adventures";
import { nyan } from "./commands/nyan";
import { what } from "./commands/what";
import { mordor } from "./commands/mordor";
import { edit } from "./commands/edit";
import { pots } from "./commands/pots";
import { play } from "./commands/audio/play";
import { stop } from "./commands/audio/stop";
import { queue } from "./commands/audio/queue";
import { pause } from "./commands/audio/pause";
import { resume } from "./commands/audio/resume";
import { vol } from "./commands/audio/vol";
import { skip } from "./commands/audio/skip";
import { shuffle } from "./commands/audio/shuffle";

export const commands: CommandDefinition[] = [
  adventures,
  avatar,
  edit,
  git,
  help,
  mordor,
  nyan,
  pause,
  play,
  pots,
  pudding,
  puddingtech,
  queue,
  resume,
  shuffle,
  skip,
  stop,
  vol,
  what
];
