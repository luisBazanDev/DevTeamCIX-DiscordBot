import { Client, CommandInteraction } from "discord.js";

export default {
  name: "example-command",
  description: "this command is for test a bot",
  type: 1,
  options: [
    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure
    {
      type: 6, // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
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
  run: async (client, interaction, args) => {},
};
