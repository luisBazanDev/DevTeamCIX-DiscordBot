import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from "discord.js";
import { resolveUser } from "../../database/models/users.js";
import clientConfig from "../../config/client.js";

export default {
  name: "edit-info",
  description: "Comando para editar la información de tu perfil",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "email",
      description: "Comando para actualizar su correo electronico",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "email",
          description: "Nuevo correo",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "description",
      description: "Comando para actualizar su descripcion",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "description",
          description: "Nueva descripcion",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "grade",
      description: "Comando para actualizar su descripcion",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "grade",
          description: "Nuevo grado 1 al 10",
          type: ApplicationCommandOptionType.Integer,
          min_value: 1,
          max_value: 10,
          required: true,
        },
      ],
    },
    {
      name: "technologies",
      description: "Comando para actualizar las tecnologias que manejas",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "tech",
          description: "Habilitar o deshabilitar la tecnologia especificada",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: clientConfig.tech,
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
    const userData = await resolveUser(interaction.user);
    console.log(args);

    switch (args[0].toLowerCase()) {
      case "email":
        userData.email = args[1].toLowerCase();
        break;
      case "description":
        userData.information.description = args[1].toLowerCase();
        break;
      case "grade":
        userData.information.grade = args[1];
        break;
      case "technologies":
        const technologie = args[1].toLowerCase();
        const index = userData.information.technologies.indexOf(technologie);
        index == -1
          ? userData.information.technologies.push(technologie)
          : userData.information.technologies.splice(index, index);
        break;
    }

    await userData.save();

    interaction.reply({
      content: "Dato cambiado correctamente!",
      ephemeral: true,
    });
  },
};
