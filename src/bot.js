import { Client, IntentsBitField as Intents, Partials } from "discord.js";

const client = new Client({
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  intents: [
    Intents.Flags.Guilds,
    Intents.Flags.GuildMessages,
    Intents.Flags.GuildMembers,
    Intents.Flags.GuildMessageTyping,
    Intents.Flags.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.Message,
    Partials.User,
  ],
});

// Connect to database

// Client settings

// Client utilities

// Load handlers

// Login bot
client.login(process.env.DISCORD_TOKEN);
