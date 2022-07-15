import { Constants } from "discord.js";
import { CommandDefinition } from "../CommandDefinition";
import { MessageEmbed } from "discord.js";
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
      type: Constants.ApplicationCommandOptionTypes.USER
    }
  ],
  executor: async (interaction) => {

    const user = interaction.options.getUser("user") ||  interaction.user;

    const avatarEmbed = new MessageEmbed({
      image: {
        url: user.displayAvatarURL({ dynamic: true, size: 4096 })
      },
      color: BOT_COLOR
    });

    if (user === interaction.options.getUser("user"))
      avatarEmbed.title = user.tag;
    else
      avatarEmbed.title = interaction.user.tag;

    return interaction.reply({ embeds: [avatarEmbed] });
  }
};