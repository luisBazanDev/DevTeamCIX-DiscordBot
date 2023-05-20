import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { resolveUser } from "../../database/models/users.js";
import { parseArrayToString } from "../../utils/embeds.js";

export default {
  name: "information",
  description: "this command is for test a bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      name: "user",
      description: "Si no se coloca un usuario se mostrará tu informacion.",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    var user = interaction.user;
    if (args.length === 1) user = await client.users.fetch(args[0]);

    const userData = await resolveUser(user);

    const embed = new EmbedBuilder({
      color: 0xfdfd96,
      thumbnail: {
        url: user.displayAvatarURL(),
        height: 5,
        width: 5,
      },
      title: `Informacion de ${userData.displayName ?? user.username}`,
      description:
        userData.information.description ??
        "```Sorry :(\nNo sabemos nada de esta persona\n\nHablale a ver si te cuenta algo interesante!```",
      fields: [
        {
          name: "E-mail",
          value: userData.email ?? "`-----`",
          inline: true,
        },
        {
          name: "Ciclo",
          value: userData.information.grade ?? "`-----`",
          inline: true,
        },
        {
          name: "Discord tag",
          value: user.tag,
          inline: true,
        },
        {
          name: "Proyectos",
          value: parseArrayToString(userData.information.projects),
          inline: true,
        },
        {
          name: "Tecnologias",
          value: parseArrayToString(
            userData.information.technologies.map((techDB) => {
              for (const tech of client.clientConfig.tech) {
                if (tech.value === techDB) return tech.name;
              }
              return techDB;
            })
          ),
          inline: true,
        },
        {
          name: "Redes sociales",
          value: parseArrayToString(Object.values(userData.information.social)),
          inline: true,
        },
      ],
    });

    interaction.reply({
      embeds: [embed],
    });
  },
};
