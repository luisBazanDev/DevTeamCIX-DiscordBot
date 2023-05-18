import {
  Client,
  ChannelType,
  BaseChannel,
  PermissionsBitField,
} from "discord.js";

/**
 *
 * @param {Client} client
 * @param {String} name
 * @param {{
 *  parentId: String,
 *  guildId: String,
 *  type: ("voice"|"text"|"category"),
 *  description: String,
 *  permissions: [
 *    {
 *      id: String,
 *      allow?: [PermissionsBitField],
 *      deny?: [PermissionsBitField]
 *    }
 *  ],
 * }} options
 * @returns BaseChannel
 */
export async function createChannel(
  client,
  name,
  options = {
    parentId: null,
    guildId: null,
    type: null,
    permissions: [],
    description: "No description",
  }
) {
  const guildId = options.guildId ?? client.guildConfig.id;
  const guild = await client.guilds.resolve(guildId);

  const type =
    options.type === "voice"
      ? ChannelType.GuildVoice
      : options.type === "category"
      ? ChannelType.GuildCategory
      : ChannelType.GuildText;

  if (!guild) return null;

  return await guild.channels.create({
    name,
    type,
    parent: options.parentId ?? null,
    topic: options.description,
    permissionOverwrites: [
      {
        id: client.user.id,
        allow: PermissionsBitField.All,
      },
      ...(options.permissions ?? []),
    ],
  });
}
