import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
} from "discord.js";

/**
 *
 * @param {Client} client
 */
export default async function (client) {
  client.on(
    "interactionCreate",
    /**
     *
     * @param {CommandInteraction} interaction
     */ async (interaction) => {
      if (!interaction.isCommand) return;

      // Only commands on main guild
      if (interaction.guildId != client.guildConfig.id) return;

      const cmd = client.commands.get(interaction.commandName);
      if (!cmd)
        return interaction.reply({
          content: "An error has occured ",
          ephemeral: true,
        });

      const args = [];

      for (const option of interaction.options.data) {
        if (option.type === ApplicationCommandOptionType.Subcommand) {
          if (option.name) args.push(option.name);
          option.options?.forEach((x) => {
            if (x.value) args.push(x.value);
          });
        } else if (option.value) args.push(option.value);
      }

      cmd.run(client, interaction, args);
    }
  );
}
