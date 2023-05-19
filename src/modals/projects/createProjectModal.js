import {
  Client,
  ModalSubmitInteraction,
  PermissionsBitField,
} from "discord.js";
import ProjectsDB from "../../database/models/projects.js";
import { createChannel } from "../../utils/channels.js";
import { createRole } from "../../utils/roles.js";

export default {
  customId: "create-project",
  run:
    /**
     *
     * @param {Client} client
     * @param {ModalSubmitInteraction} interaction
     * @param {[{customId: String, value: any}]} parameters
     */
    async (client, interaction, parameters) => {
      const template = interaction.customId.split("_")[1];

      if (!template || parameters.length < 2)
        return interaction.reply({
          content: "An error has occured, on create project",
          ephemeral: true,
        });

      interaction.deferReply({
        ephemeral: true,
      });

      const projectName = parameters[0].value;
      const description = parameters[1].value ?? "No description";

      const projectRole = await createRole(client, projectName);

      const channels = [];
      const previewChannels = [];

      const projectSection = await createChannel(client, projectName, {
        type: "category",
        permissions: [
          {
            id: interaction.guild.id,
            deny: [PermissionsBitField.All],
          },
          {
            id: interaction.member.id,
            allow: [PermissionsBitField.All],
          },
          {
            id: projectRole.id,
            allow: [PermissionsBitField.Default],
          },
        ],
      });

      channels.push({
        id: projectSection.id,
        type: "category",
      });

      switch (template) {
        case "clasic":
          previewChannels.push(
            {
              parentId: projectSection.id,
              description,
              permissions: [
                {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.All],
                },
                {
                  id: interaction.member.id,
                  allow: [PermissionsBitField.All],
                },
                {
                  id: projectRole.id,
                  allow: [PermissionsBitField.Default],
                },
              ],
            },
            {
              name: `Reuniones ${projectName}`,
              parentId: projectSection.id,
              type: "voice",
              permissions: [
                {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.All],
                },
                {
                  id: interaction.member.id,
                  allow: [PermissionsBitField.All],
                },
                {
                  id: projectRole.id,
                  allow: [PermissionsBitField.Default],
                },
              ],
            }
          );
          break;
        case "simple":
          previewChannels.push({
            parentId: projectSection.id,
            description,
            permissions: [
              {
                id: interaction.guild.id,
                deny: [PermissionsBitField.All],
              },
              {
                id: interaction.member.id,
                allow: [PermissionsBitField.All],
              },
              {
                id: projectRole.id,
                allow: [PermissionsBitField.Default],
              },
            ],
          });
          break;
        case "advanced":
          previewChannels.push(
            {
              name: `Recursos ${projectName}`,
              parentId: projectSection.id,
              description,
              permissions: [
                {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.All],
                },
                {
                  id: interaction.member.id,
                  allow: [PermissionsBitField.All],
                },
                {
                  id: projectRole.id,
                  allow: [PermissionsBitField.Default],
                },
              ],
            },
            {
              name: `General ${projectName}`,
              parentId: projectSection.id,
              description,
              permissions: [
                {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.All],
                },
                {
                  id: interaction.member.id,
                  allow: [PermissionsBitField.All],
                },
                {
                  id: projectRole.id,
                  allow: [PermissionsBitField.Default],
                },
              ],
            },
            {
              name: `Reuniones ${projectName}`,
              parentId: projectSection.id,
              type: "voice",
              permissions: [
                {
                  id: interaction.guild.id,
                  deny: [PermissionsBitField.All],
                },
                {
                  id: interaction.member.id,
                  allow: [PermissionsBitField.All],
                },
                {
                  id: projectRole.id,
                  allow: [PermissionsBitField.Default],
                },
              ],
            }
          );
          break;
      }

      for (const previewChannel of previewChannels) {
        const channel = await createChannel(
          client,
          previewChannel.name ?? projectName,
          previewChannel
        );

        channels.push({
          id: channel.id,
          type: previewChannel.type,
        });
      }

      const project = new ProjectsDB({
        name: projectName,
        description,
        administrators: [],
        channels,
      });

      await project.save();

      interaction.editReply({
        content: "Create project with template: " + template,
      });
    },
};
