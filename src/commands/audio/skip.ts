import { CommandDefinition } from "../../CommandDefinition";
import { MessageEmbed } from "discord.js";
import { BOT_COLOR, Category } from "../../constants";

export const skip: CommandDefinition = {
  name: "skip",
  description: "Skips the currently playing song",
  category: Category.AUDIO,
  executor: async (interaction, bot, player) => {

    if (!player || !interaction.guildId) {
      return;
    }

    const queue = player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply("There are no songs in the queue.");
    }

    const currentSong = queue.current;

    queue.skip();

    const skipEmbed = new MessageEmbed({
      description: `**${currentSong.title}** has been skipped.`,
      thumbnail: {
        url: currentSong.thumbnail
      },
      color: BOT_COLOR
    });

    return interaction.reply({ embeds: [skipEmbed] });
  }
};