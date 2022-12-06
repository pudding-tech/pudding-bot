import { CommandDefinition } from "../../types/CommandDefinition";
import { EmbedBuilder } from "discord.js";
import { BOT_COLOR, Category } from "../../constants";

export const queue: CommandDefinition = {
  name: "queue",
  description: "Displays current music queue",
  category: Category.AUDIO,
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    let queueString = queue.tracks.map( (song, i) => {
      return `${i + 1}. ${song.title}  -  ${song.duration}`;
    }).join("\n");

    if (queueString.length === 0) {
      queueString = "-- No upcoming songs --";
    }

    const currentSong = queue.current;
    const progressBar = queue.createProgressBar({
      timecodes: true,
      length: 9,
      indicator: ":white_square_button:"
    });

    const queueEmbed = new EmbedBuilder({
      description: `Currently playing:\n**${currentSong.title}**\n\n` +
        "Requested by *" + interaction.user.tag + "*\n\n" +
        progressBar + "\n\n" +
        "Current volume: " + queue.volume + "%\n\n" +
        "**Queue:**\n" + queueString,
        thumbnail: {
          url: currentSong.thumbnail
        },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [queueEmbed] });
  }
};