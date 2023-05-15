import { Client } from "discord.js";

/**
 *
 * @param {Client} client
 */
export default async function (client) {
  client.on("ready", async () => {
    console.log("🤖 Client >> client is ready! as " + client.user.tag);

    await (
      await client.guilds.fetch(client.guildConfig.id)
    ).commands.set(client.commands);
    console.log(
      `🤖 Client >> Commands register on ${
        client.guilds.cache.get(client.guildConfig.id).name
      } (${client.guilds.cache.get(client.guildConfig.id).id})`
    );
  });
}
