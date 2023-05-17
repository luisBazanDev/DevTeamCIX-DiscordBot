import { Client, ModalSubmitInteraction } from "discord.js";

/**
 *
 * @param {Client} client
 */
export default async function (client) {
  client.on(
    "interactionCreate",
    /**
     *
     * @param {ModalSubmitInteraction} interaction
     */ async (interaction) => {
      if (!interaction.isModalSubmit()) return;

      // Only commands on main guild
      if (interaction.guildId != client.guildConfig.id) return;

      const modal = client.modals.get(interaction.customId.split("_")[0]);

      if (!modal)
        return interaction.reply({
          content: "An error has occured",
          ephemeral: true,
        });

      const parameters = [];
      interaction.components.forEach((row) => {
        row.components.forEach((cell) => {
          parameters.push({
            customId: cell.customId,
            value: cell.value,
          });
        });
      });

      modal.run(client, interaction, parameters);
    }
  );
}
