import { Image, ImageData } from "./types/types.ts";

const imagesData: ImageData[] = [
  { name: "Mordor", url: "https://i.imgur.com/yUinmn9.png" },
  { name: "Draw me", url: "https://i.imgur.com/pUWZIir.jpg" },
  { name: "Hurr durr", url: "https://i.imgur.com/Mwrq3F5.jpg" }
];

const gifsData: ImageData[] = [
  { name: "Pudding", url: "https://c.tenor.com/02c70YZ5A5IAAAAC/pudding.gif", title: "Lots of pudding for everyone!" },
  { name: "Nyan", url: "https://c.tenor.com/lTtlX5xlfmgAAAAC/nyan-cat.gif", title: "NYAN", description: "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan"
        + "nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan nyan", footer: "nyannyannyannyannyannyannyannyannyannyannyannyannyannyannyannyan" },
  { name: "What", url: "https://i.imgur.com/wAtmxTe.gif" },
  { name: "Samurai Cop - Frank", url: "https://i.imgur.com/HNwtuEE.gif" }
];

const addValueToImages = (data: ImageData[]): Image[] => {
  return data.map((image, index) => ({
    ...image,
    value: index
  }));
};

export const images = addValueToImages(imagesData);
export const gifs = addValueToImages(gifsData);
