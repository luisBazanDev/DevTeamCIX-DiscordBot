import { Client } from "discord.js";
import DotEnv from "dotenv";

DotEnv.config();

const client = new Client({
  intents: ["GuildMessageTyping", "Guilds", "GuildMessages"],
});

client.on("ready", () => {
  client.guilds
    .resolve("1082168079427047424")
    .channels.resolve("1106251088757260358")
    .send("Hello world");
});

client.login(process.env.DISCORD_TOKEN);
