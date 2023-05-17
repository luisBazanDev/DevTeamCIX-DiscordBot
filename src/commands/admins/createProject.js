import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
  ModalBuilder,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";

export default {
  name: "create-project",
  description: "Comando crear un proyecto",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "template",
      description: "Que templete quieres usar",
      choices: [
        {
          name: "Clasico 1 canal de voz y texto",
          value: "clasic",
        },
        {
          name: "Simple, 1 canal de texto",
          value: "simple",
        },
        {
          name: "Avanzado, 2 canales de texto, 1 canal de voz",
          value: "advanced",
        },
      ],
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

    const template = args[0];

    const nameRow = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("name")
        .setLabel("Nombre del proyecto")
        .setPlaceholder("Project Name")
        .setStyle(TextInputStyle.Short)
        .setMinLength(3)
        .setMaxLength(24)
        .setRequired(true)
    );
    const descriptionRow = new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("description")
        .setLabel("Descripción del proyecto")
        .setPlaceholder("Project description")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false)
    );

    const modal = new ModalBuilder()
      .setCustomId("create-project_" + template)
      .setTitle("New project")
      .addComponents(nameRow, descriptionRow);

    interaction.showModal(modal);
  },
};
