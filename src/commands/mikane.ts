import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../types/CommandDefinition.ts";
import { BOT_COLOR, Category } from "../constants.ts";
import { MikaneEvent, MikanePayment, MikanePaymentSender } from "../types/types.ts";
import env from "../env.ts";

export const mikane: CommandDefinition = {
  name: "mikane",
  description: "Display payment information for an event in Mikane",
  commandDisplay: "mikane <event>",
  category: Category.UTIL,
  options: [
    {
      name: "event",
      description: "Name of event to display payments for",
      required: true,
      type: ApplicationCommandOptionType.String
    }
  ],
  executor: async (interaction) => {

    await interaction.deferReply();
    const eventName = interaction.options.getString("event");

    if (!env.MIKANE_API_KEY) {
      return interaction.editReply("Mikane API key not set - please contact the bot administrator.");
    }

    const res = await fetch(`https://api.mikane.no/api/eventbyname?name=${encodeURIComponent(eventName ?? "")}`, {
      method: "GET",
      headers: {
        "Authorization": env.MIKANE_API_KEY
      }
    })
      .catch(err => {
        console.log(err);
        return null;
      });

    if (!res) {
      return interaction.editReply("There was an error contacting the Mikane API.");
    }
    if (res.status === 401) {
      return interaction.editReply("Unauthorized request to Mikane API - invalid API key.");
    }
    if (res.status === 403) {
      return interaction.editReply("Forbidden request to Mikane API - access denied.");
    }
    if (res.status === 404) {
      return interaction.editReply("Name *" + eventName + "* doesn't match any existing non-private events.");
    }
    if (!res.ok) {
      return interaction.editReply("Something went wrong :(");
    }

    const event: MikaneEvent = await res.json() as MikaneEvent;

    const res2 = await fetch(`https://api.mikane.no/api/events/${encodeURIComponent(event.id)}/payments`, {
      method: "GET",
      headers: {
        "Authorization": env.MIKANE_API_KEY
      }
    })
      .catch(err => {
        console.log(err);
        return null;
      });

    if (!res2) {
      return interaction.editReply("There was an error contacting the Mikane API.");
    }
    if (res2.status === 401) {
      return interaction.editReply("Unauthorized request to Mikane API - invalid API key.");
    }
    if (res2.status === 403) {
      return interaction.editReply("Forbidden request to Mikane API - access denied.");
    }
    if (res.status === 404) {
      return interaction.editReply("Name *" + eventName + "* doesn't match any existing non-private events.");
    }
    if (!res2.ok) {
      return interaction.editReply("Something went wrong :(");
    }

    const payments: MikanePayment[] = await res2.json() as MikanePayment[];
    const senders: MikanePaymentSender[] = [];

    payments.forEach(payment => {
      const sender = senders.find( sender => {
        return sender.id === payment.sender.id;
      });
      const receiver = { id: payment.receiver.id, name: payment.receiver.name, amount: payment.amount };
      
      if (!sender) {
        senders.push({id: payment.sender.id, name: payment.sender.name, receivers: [receiver] });
      }
      else {
        sender.receivers.push(receiver);
      }
    });

    const debtEmbed = new EmbedBuilder({
      title: event.name,
      description: "Payment information from the [Mikane](https://mikane.no) application.",
      color: BOT_COLOR
    });

    senders.forEach(sender => {
      let receiverLine = "";
      if (sender.receivers.length === 1) {
        receiverLine = `- ${sender.receivers[0].name}: \u200B ${sender.receivers[0].amount.toFixed(2).replace(".", ",")} kr`;
      }
      else if (sender.receivers.length > 1) {
        sender.receivers.forEach( receiver => {
          receiverLine += `- ${receiver.name}: \u200B ${receiver.amount.toFixed(2).replace(".", ",")} kr\n`;
        });
      }
      debtEmbed.addFields({ name: sender.name + " owes money to", value: receiverLine, inline: false});
    });

    return interaction.editReply({ embeds: [debtEmbed] });
  }
};
