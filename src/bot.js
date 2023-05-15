import {
  Client,
  IntentsBitField as Intents,
  Partials,
  Collection,
} from "discord.js";
import connectDatabase from "./database/connect.js";
import guildConfig from "./config/guild.js";
import { loadEvents } from "./handlers/handlersManager.js";

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
connectDatabase();

// Client settings
client.guildConfig = guildConfig;
client.commands = new Collection();

// Client utilities

// Load handlers
loadEvents(client);

// Login bot
client.login(process.env.DISCORD_TOKEN);
