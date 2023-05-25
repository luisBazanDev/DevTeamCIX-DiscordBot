import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
  PermissionFlagsBits,
} from "discord.js";
import { resolveUser } from "../../database/models/users.js";

export default {
  name: "example-command",
  description: "this command is for test a bot",
  type: ApplicationCommandType.ChatInput,
  default_member_permissions: PermissionFlagsBits.Administrator,
  options: [
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
    {
      type: ApplicationCommandOptionType.User, // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
      name: "user",
      description: "idk it's a simple example",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const embed = new EmbedBuilder()
      .setTitle("Hello world!")
      .setDescription(JSON.stringify(await resolveUser(interaction.user)));
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
