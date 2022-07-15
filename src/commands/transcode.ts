import { MessageEmbed } from "discord.js";
import { CommandDefinition } from "../CommandDefinition";
import { BOT_COLOR, Category } from "../constants";

const onlyYou = "https://i.imgur.com/UcFW1p8.jpg";
const instructionsTV = "https://images.squarespace-cdn.com/content/v1/56b588f222482ef13bcdd001/1568815052837-CMLBWL8U4BF991PK7FDF/5.jpg";
const instructionsPC = "https://www.plexopedia.com/images/remote-quality-settings-windows.jpg";

export const transcode: CommandDefinition = {
    name: "transcode",
    description: "Instructions for enabling original quality in Plex",
    category: Category.IMAGES,
    executor: async (msg) => {
        const embeds: MessageEmbed[] = [];

        embeds.push(new MessageEmbed({
            title: "Instructions for TV app",
            image: { url: instructionsTV },
            color: BOT_COLOR,
        }));

        embeds.push(new MessageEmbed({
            title: "Instructions for PC app and Web",
            image: { url: instructionsPC },
            color: BOT_COLOR,
        }));

        embeds.push(new MessageEmbed({
            title: "Only you can prevent transcoding",
            image: { url: onlyYou },
            color: BOT_COLOR,
        }));

        return msg.channel.send({ embeds: embeds });
    }
};