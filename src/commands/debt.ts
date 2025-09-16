import { EmbedBuilder, ApplicationCommandOptionType } from "discord.js";
import { CommandDefinition } from "../types/CommandDefinition.ts";
import { BOT_COLOR, Category } from "../constants.ts";
import { DebtEvent, DebtPayment, DebtPaymentSender } from "../types/types.ts";

export const debt: CommandDefinition = {
  name: "debt",
  description: "Display payment information for an event in Pudding Debt",
  commandDisplay: "debt <event>",
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

    const events: DebtEvent[] | null = await fetch("https://pudding-debt-api.hundseth.com/api/events", {
      method: "GET"
    })
      .then(res => {
        if (res.ok) {
          return res.json() as Promise<DebtEvent[]>;
        }
        return null;
      })
      .catch(err => {
        console.log(err);
        return null;
      });

    if (!events) {
      return interaction.editReply("There was an error contacting the Pudding Debt API.");
    }

    const event = events.find(event => event.name.toLowerCase() === eventName?.toLowerCase());

    if (!event) {
      return interaction.editReply("Name *" + eventName + "* doesn't match any existing events.");
    }

    const payments: DebtPayment[] | null = await fetch("https://pudding-debt-api.hundseth.com/api/payments?eventId=" + event.id, {
      method: "GET"
    })
      .then(res => {
        if (res.ok) {
          return res.json() as Promise<DebtPayment[]>;
        }
        return null;
      })
      .catch(err => {
        console.log(err);
        return null;
      });

    if (!payments) {
      return interaction.editReply("There was an error contacting the Pudding Debt API.");
    }

    const senders: DebtPaymentSender[] = [];

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
      description: "Payment information from the [Pudding Debt](https://pudding-debt.hundseth.com) application.",
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
