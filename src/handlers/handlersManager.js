import { Client } from "discord.js";
import { glob } from "glob";

/**
 *
 * @param {Client} client
 */
export async function loadEvents(client) {
  for (const file of await glob("./src/events/**/*.js", { absolute: false })) {
    try {
      console.log("🔔 Event Handler >> Load event " + file.slice(10));
      const event = await import(file.replace("src", "./.."));
      event.default(client);
    } catch (err) {
      console.error("❌ Event handler (Error) >> ", err);
    }
  }
}

/**
 *
 * @param {Client} client
 */
export async function loadCommands(client) {
  for (const file of await glob("./src/commands/**/*.js")) {
    const command = (await import(file.replace("src", "./.."))).default;
    if (!command?.name) return;

    if (["MESSAGE", "USER"].includes(command.type)) delete command.description;
    client.commands.set(command.name, command);
    console.log("👻 Command Handler >> Load command " + command.name);
  }
}

/**
 *
 * @param {Client} client
 */
export async function loadModals(client) {
  for (const file of await glob("./src/modals/**/*.js")) {
    const modal = (await import(file.replace("src", "./.."))).default;
    if (!modal?.customId) return;

    client.modals.set(modal.customId, modal);
    console.log("🎛️  Modal Handler >> Load command " + modal.customId);
  }
}
