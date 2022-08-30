import { CommandDefinition } from "../CommandDefinition";
import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { BOT_COLOR, Category } from "../constants";

export const avatar: CommandDefinition = {
  name: "avatar",
  description: "Display a user's avatar",
  commandDisplay: "avatar <user>?",
  category: Category.UTIL,
  options: [
    {
      name: "user",
      description: "Display avatar of this user",
      required: false,
      type: ApplicationCommandOptionType.User
    }
  ],
  executor: async (interaction) => {

    const user = interaction.options.getUser("user") ||  interaction.user;

    const avatarEmbed = new EmbedBuilder({
      image: {
        url: user.displayAvatarURL({ size: 4096 })
      },
      color: BOT_COLOR
    });

    if (user === interaction.options.getUser("user"))
      avatarEmbed.setTitle(user.tag);
    else
      avatarEmbed.setTitle(interaction.user.tag);

    return interaction.reply({ embeds: [avatarEmbed] });
  }
};