import { User } from "discord.js";

export const getWelcomeMessage = (user: User): string => {
  const welcomeMessages = [
    `Brace yourselves - ${user} just joined the server.`,
    `Challenger approaching - ${user} has appeared.`,
    `Welcome ${user}. Leave your weapons by the door.`,
    `${user} just joined... or did they?`,
    `${user} joined your party.`,
    `Ready player ${user}.`,
    `${user} joined. You must construct additional pylons.`,
    `It's dangerous to go alone, take ${user}.`,
    `Congratulations ${user}, you're approved!`,
    `Welcome ${user}. Stay a while and listen.`,
    `${user} has spawned in the server.`,
    `${user}, we're friends through eternity, loyalty, honesty.\nWe'll stay together through thick or thin.`,
    `${user}, we are friends now! Hello friend!`,
    `Ugh, I've known much better ${user}s.`,
    `${user} joined.\nOh, dear, I expected so much more.`,
    `${user} joined.\n...mmmMMMMmm... acceptable.`,
    `${user}, FEEEEL THE HATRED OF TEN THOUSAND YEARS!`,
    `**PuddingBot:** \u200B お前はもう死んでいる。\n${user}**:** \u200B なに？！`,
    `Vegeta, what's ${user}'s power level? \nIt's over nine-thousaaaaand!!`
  ];

  return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
};