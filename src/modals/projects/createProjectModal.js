import {
  Client,
  ModalSubmitInteraction,
  PermissionsBitField,
} from "discord.js";
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

      const projectName = parameters[0].value;
      const description = parameters[1].value ?? "No description";

      const projectRole = await createRole(client, projectName);

      const channels = [];

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
          const textChannel = await createChannel(client, projectName, {
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
          const voiceChannel = await createChannel(client, projectName, {
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
          });

          channels.push(
            { id: textChannel.id, type: "text" },
            { id: voiceChannel.id, type: "voice" }
          );
          break;
        case "simple":
          break;
        case "advanced":
          break;
      }

      interaction.reply({
        content: "Create project with template: " + template,
        ephemeral: true,
      });
    },
};
