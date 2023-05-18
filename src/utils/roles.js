import { Client } from "discord.js";
/**
 *
 * @param {Client} client
 * @param {String} name
 * @param {{
 *  guildId: String,
 *  color: Number
 * }} options
 */
export async function createRole(client, name, options = {}) {
  const guildId = options.guildId ?? client.guildConfig.id;
  const guild = await client.guilds.resolve(guildId);

  if (!guild) return null;

  return await guild.roles.create({
    color: options.color ?? guild.roles.everyone.color,
    name: name,
  });
}
