import dotenv from "dotenv";
dotenv.config();
import { ShardingManager } from "discord.js";

const manager = new ShardingManager("./src/bot.js", {
  totalShards: "auto",
  token: process.env.DISCORD_TOKEN,
  respawn: true,
});

manager.on("shardCreate", (shard) => {
  shard.on("spawn", () => {
    console.log("ShardSpawn");
  });
});

manager.spawn();
