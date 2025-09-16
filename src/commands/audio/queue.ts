import { EmbedBuilder } from "discord.js";
import { useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { BOT_COLOR, Category } from "../../constants.ts";

export const queue: CommandDefinition = {
  name: "queue",
  description: "Displays current music queue",
  category: Category.AUDIO,
  executor: async (interaction) => {

    const player = useMainPlayer();

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.nodes.get(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    let queueString = queue.tracks.map((song, i) => {
      return `${i + 1}. ${song.title}  -  ${song.duration}`;
    }).join("\n");

    if (queueString.length === 0) {
      queueString = "-- No upcoming songs --";
    }

    const currentSong = queue.currentTrack;
    const progressBar = queue.node.createProgressBar({
      timecodes: true,
      length: 9,
      indicator: ":white_square_button:"
    });

    const queueEmbed = new EmbedBuilder({
      description: `Currently playing:\n**${currentSong?.title}**\n\n` +
        "Requested by *" + currentSong?.requestedBy?.tag + "*\n\n" +
        progressBar + "\n\n" +
        "Current volume: " + queue.node.volume + "%\n\n" +
        "**Queue:**\n" + queueString,
        thumbnail: {
          url: currentSong?.thumbnail ?? ""
        },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [queueEmbed] });
  }
};
