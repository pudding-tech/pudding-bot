import { CommandDefinition } from "./types/CommandDefinition.ts";
import { help } from "./commands/help.ts";
import { puddingtech } from "./commands/puddingtech.ts";
import { git } from "./commands/git.ts";
import { avatar } from "./commands/avatar.ts";
import { adventures } from "./commands/adventures.ts";
import { edit } from "./commands/edit.ts";
import { pots } from "./commands/pots.ts";
import { play } from "./commands/audio/play.ts";
import { stop } from "./commands/audio/stop.ts";
import { queue } from "./commands/audio/queue.ts";
import { pause } from "./commands/audio/pause.ts";
import { resume } from "./commands/audio/resume.ts";
import { vol } from "./commands/audio/vol.ts";
import { skip } from "./commands/audio/skip.ts";
import { shuffle } from "./commands/audio/shuffle.ts";
import { filter } from "./commands/audio/filter.ts";
import { transcode } from "./commands/transcode.ts";
import { debt } from "./commands/debt.ts";
import { img } from "./commands/img.ts";
import { gif } from "./commands/gif.ts";

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
