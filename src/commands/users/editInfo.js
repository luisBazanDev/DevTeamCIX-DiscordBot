import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  Client,
  CommandInteraction,
} from "discord.js";
import { resolveUser } from "../../database/models/users.js";

export default {
  name: "edit-info",
  description: "Comando para editar la información de tu perfil",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "dato",
      description: "Que tipo de dato deseas actualizar",
      choices: [
        {
          name: "email",
          value: "email",
        },
        {
          name: "descripcion",
          value: "description",
        },
        {
          name: "grado",
          value: "grade",
        },
        {
          name: "tecnologias",
          value: "technologies",
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.String,
      required: true,
      name: "nuevo-valor",
      description: "El nuevo valor a actualizar",
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
        userData.information.grade = args[1].toLowerCase();
        break;
      case "technologies":
        userData.information.technologies = args[1].toLowerCase();
        break;
    }

    await userData.save();

    interaction.reply({
      content: "Dato cambiado correctamente!",
      ephemeral: true,
    });
  },
};
