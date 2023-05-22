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
    {
      name: "social",
      description: "Comando para actualizar tus redes sociales",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "social",
          description: "Ingresar tu nueva red social",
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: Object.keys(clientConfig.social).map((k) => {
            return {
              name: clientConfig.social[k].name,
              value: k,
            };
          }),
        },
        {
          name: "link",
          description: "Ingresa el link de tu perfil",
          type: ApplicationCommandOptionType.String,
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
      case "social":
        var existsSocial = userData.information.social[args[1]];

        if (args.length !== 3) {
          const newSocial = { ...userData.information.social };
          delete newSocial[args[1]];
          userData.information.social = newSocial;
          await userData.save();
          interaction.reply({
            content: "La red social fue eliminada con exito",
            ephemeral: true,
          });
          return;
        } else {
          for (const url of clientConfig.social[args[1]].urls) {
            if (args[2].startsWith(url)) {
              const newSocial = { ...userData.information.social };
              newSocial[args[1]] = args[2];
              userData.information.social = newSocial;
              await userData.save();
              interaction.reply({
                content: "Red social actualizada con exito",
                ephemeral: true,
              });
              return;
            }
          }
          interaction.reply({
            content: "Link invalido",
            ephemeral: true,
          });
          return;
        }
        break;
      default:
        interaction.reply({
          content: "Fail on execute this command",
          ephemeral: true,
        });
        break;
    }

    await userData.save();

    interaction.reply({
      content: "Dato cambiado correctamente!",
      ephemeral: true,
    });
  },
};
