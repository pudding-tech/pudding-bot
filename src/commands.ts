import { CommandDefinition } from "./types/CommandDefinition.ts";
import { adventures } from "./commands/adventures.ts";
import { avatar } from "./commands/avatar.ts";
import { edit } from "./commands/edit.ts";
import { filter } from "./commands/audio/filter.ts";
import { gif } from "./commands/gif.ts";
import { git } from "./commands/git.ts";
import { help } from "./commands/help.ts";
import { img } from "./commands/img.ts";
import { mikane } from "./commands/mikane.ts";
import { pause } from "./commands/audio/pause.ts";
import { play } from "./commands/audio/play.ts";
import { pots } from "./commands/pots.ts";
import { puddingtech } from "./commands/puddingtech.ts";
import { queue } from "./commands/audio/queue.ts";
import { resume } from "./commands/audio/resume.ts";
import { shuffle } from "./commands/audio/shuffle.ts";
import { skip } from "./commands/audio/skip.ts";
import { stop } from "./commands/audio/stop.ts";
import { transcode } from "./commands/transcode.ts";
import { vol } from "./commands/audio/vol.ts";

export const commands: CommandDefinition[] = [
  adventures,
  avatar,
  edit,
  filter,
  gif,
  git,
  help,
  img,
  mikane,
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
