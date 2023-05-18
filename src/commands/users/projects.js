import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import projects from "../../database/models/projects.js";
import { parseArrayToString } from "../../utils/embeds.js";

export default {
  name: "projects",
  description: "Este comando es el comando principal de los proyectos",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: "Listar todos los proyectos",
      name: "list",
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

    if (args[0] === "list") {
      (await projects.find()).map((project) => project.name);
    }

    const embed = new EmbedBuilder({
      title: "projects",
      description: parseArrayToString(
        (await projects.find()).map((project) => project.name)
      ),
    });

    interaction.reply({ embeds: [embed] });
  },
};
