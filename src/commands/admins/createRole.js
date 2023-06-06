import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  PermissionFlagsBits,
} from "discord.js";

import { createRole } from '../../utils/roles.js';

export default {
  name: "create-role",
  description: "Comando crear un rol",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: PermissionFlagsBits.Administrator,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "name",
      description: "El nombre del rol",
    },
    {
      type: ApplicationCommandOptionType.Number,
      required: false,
      name: "color",
      description: "El color del rol",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    if (client.clientConfig.superUsers.indexOf(interaction.user.id) === -1)
      return interaction.reply({
        content: "No permissions.",
        ephemeral: true,
      });

    const name = args[0];
    const color = args[1] || guild.roles.everyone.color;

    const role = await createRole(client, name, {
      color,
    });

    interaction.reply({
      content: `Role "${role.name}" created.`,
    });
  },
};