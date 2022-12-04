import { CommandDefinition } from "../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

const instructionsTV = "https://images.squarespace-cdn.com/content/v1/56b588f222482ef13bcdd001/1568815052837-CMLBWL8U4BF991PK7FDF/5.jpg";
const instructionsPC = "https://www.plexopedia.com/images/remote-quality-settings-windows.jpg";
const onlyYou = "https://i.imgur.com/UcFW1p8.jpg";

export const transcode: CommandDefinition = {
    name: "transcode",
    description: "Instructions for enabling original quality in Plex",
    category: Category.IMAGES,
    executor: async (interaction) => {
        const embeds: EmbedBuilder[] = [];

        embeds.push(new EmbedBuilder({
            title: "Instructions for TV app",
            image: { url: instructionsTV },
            color: BOT_COLOR,
        }));

        embeds.push(new EmbedBuilder({
            title: "Instructions for PC app and Web",
            image: { url: instructionsPC },
            color: BOT_COLOR,
        }));

        embeds.push(new EmbedBuilder({
            image: { url: onlyYou },
            color: BOT_COLOR,
        }));

        return interaction.reply({ embeds: embeds });
    }
};