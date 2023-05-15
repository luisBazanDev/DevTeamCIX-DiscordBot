import {
  Client,
  CommandInteraction,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

export default {
  name: "example-command",
  description: "this command is for test a bot",
  type: ApplicationCommandType.ChatInput,
  options: [
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
    {
      type: ApplicationCommandOptionType.User, // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
      name: "user",
      description: "idk it's a simple example",
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    interaction.reply({
      content: "Hello world!",
      ephemeral: true,
    });
  },
};
