import axios from "axios";
import { CommandDefinition } from "../CommandDefinition";
import { MessageEmbed, Constants } from "discord.js";
import { BOT_COLOR, Category } from "../constants";
import { DebtEvent, DebtPayment } from "../types";

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
      type: Constants.ApplicationCommandOptionTypes.STRING
    }
  ],
  executor: async (interaction) => {

    await interaction.deferReply();
    const eventName = interaction.options.getString("event");

    const eventsRes = await axios
      .get("https://pudding-debt-api.hundseth.com/api/events")
      .catch( (err) => {
        console.log(err);
      });

    if (!eventsRes) {
      return interaction.editReply("There was an error contacting the Pudding Debt API.");
    }

    const events: DebtEvent[] = eventsRes.data;
    const event = events.find(event => event.name.toLowerCase() === eventName?.toLowerCase());

    if (!event) {
      return interaction.editReply("Name *" + eventName + "* doesn't match any existing events.");
    }

    const paymentsRes = await axios
      .get("https://pudding-debt-api.hundseth.com/api/payments?eventId=" + event.id)
      .catch( (err) => {
        console.log(err);
      });

    if (!paymentsRes) {
      return interaction.editReply("There was an error contacting the Pudding Debt API.");
    }

    const payments: DebtPayment[] = paymentsRes.data;

    const debtEmbed = new MessageEmbed({
      title: event.name,
      description: "Payment information from the Pudding Debt application.",
      color: BOT_COLOR
    });

    payments.forEach( payment => {
      debtEmbed.addFields({ name: "*From* " + payment.sender.name + " *to* " + payment.receiver.name, value: payment.amount.toFixed(2) + " kr", inline: false});
    });

    return interaction.editReply({ embeds: [debtEmbed] });
  }
};