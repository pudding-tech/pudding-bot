import { CommandDefinition } from "../../CommandDefinition";
import { Category } from "../../constants";

export const filter: CommandDefinition = {
  name: "filter",
  description: "Enable or disable a music filter",
  commandDisplay: "filter <name> <on/off>",
  category: Category.AUDIO,
  executor: async (msg, bot, player) => {

    if (!player || !msg.guildId) {
      return;
    }

    const queue = player.getQueue(msg.guildId);
    if (!queue) {
      return msg.reply("There are no songs in the queue.");
    }

    // Check included commands
    const filter = msg.content.substring(8, msg.content.length).split(" ");
    if (filter.length === 1 && filter[0] === "") {
      const filters = queue.getFiltersEnabled();
      return msg.reply("Filters currently enabled:\n" + filters);
    }
    else if (filter.length < 2) {
      return msg.reply("You need to provide a filter command.");
    }

    let enable: boolean;
    if (filter[1] === "on") {
      enable = true;
    } 
    else if (filter[1] === "off") {
      enable = false;
    }
    else {
      return msg.reply("Wrong formatting. Filter command can only be on or off.");
    }

    switch (filter[0]) {
      case "nightcore":
        await queue.setFilters({"nightcore": enable});
        break;
      case "vaporwave":
        await queue.setFilters({"vaporwave": enable});
        break;
      case "reverse":
        await queue.setFilters({"reverse": enable});
        break;
      case "karaoke":
        await queue.setFilters({"karaoke": enable});
        break;
      case "tremolo":
        await queue.setFilters({"tremolo": enable});
        break;
      case "gate":
        await queue.setFilters({"gate": enable});
        break;
      default:
        return msg.channel.send("Requested filter not found.");
    }

    return msg.channel.send(`Filter ${filter[0]} has been turned ${filter[1]}.`);
  }
};