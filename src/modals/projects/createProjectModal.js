import { Client, ModalSubmitInteraction } from "discord.js";

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

      if (!template)
        return interaction.reply({
          content: "An error has occured, not found templete",
          ephemeral: true,
        });

      console.log(template, parameters);

      interaction.reply({
        content: "Create project with template: " + template,
        ephemeral: true,
      });
    },
};
