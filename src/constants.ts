import packageJson from "../package.json" with { type: "json" };

export const VERSION = `v${packageJson.version}`;
export const BOT_COLOR = 0xc292d4;

export enum Channels {
  GENERAL_CHANNEL = "110276579342442496",
  SERVICES_CHANNEL = "988498917001945158"
}

export enum Category {
  LINK = "Links",
  IMAGES = "Images and GIFs",
  UTIL = "Utilities",
  AUDIO = "Audio",
  ADMIN = "Admin commands",
  HELP = "Help commands"
}

export enum Server {
  PUDDINGFLIX = "puddingflix",
  DUCKFLIX = "duckflix"
}
