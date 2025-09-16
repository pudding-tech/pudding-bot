import { EmbedBuilder } from "discord.js";
import { useMainPlayer } from "discord-player";
import { CommandDefinition } from "../../types/CommandDefinition.ts";
import { BOT_COLOR, Category } from "../../constants.ts";

export const skip: CommandDefinition = {
  name: "skip",
  description: "Skips the currently playing song",
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

    const currentSong = queue.currentTrack;

    queue.node.skip();

    const skipEmbed = new EmbedBuilder({
      description: `**${currentSong?.title}** has been skipped.`,
      thumbnail: {
        url: currentSong?.thumbnail ?? ""
      },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [skipEmbed] });
  }
};
