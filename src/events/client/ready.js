import { Client } from "discord.js";

/**
 *
 * @param {Client} client
 */
export default async function (client) {
  client.on("ready", () => {
    console.log("Client >> client is ready! as " + client.user.tag);
  });
}
