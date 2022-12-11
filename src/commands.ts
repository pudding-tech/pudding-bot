import { CommandDefinition } from "./types/CommandDefinition";
import { help } from "./commands/help";
import { puddingtech } from "./commands/puddingtech";
import { git } from "./commands/git";
import { avatar } from "./commands/avatar";
import { adventures } from "./commands/adventures";
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
import { filter } from "./commands/audio/filter";
import { transcode } from "./commands/transcode";
import { debt } from "./commands/debt";
import { img } from "./commands/img";
import { gif } from "./commands/gif";

export const commands: CommandDefinition[] = [
  adventures,
  avatar,
  debt,
  edit,
  filter,
  gif,
  git,
  help,
  img,
  pause,
  play,
  pots,
  puddingtech,
  queue,
  resume,
  shuffle,
  skip,
  stop,
  transcode,
  vol
];
