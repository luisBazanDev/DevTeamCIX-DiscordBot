import { Client } from "discord.js";
import { glob } from "glob";

/**
 *
 * @param {Client} client
 */

export async function loadEvents(client) {
  for (const file of await glob("./src/events/**/*.js", { absolute: false })) {
    try {
      console.log(
        "Event Handler >> Load event " + file.replace("src\\events\\", "")
      );
      const event = await import(file.replace("src", "./.."));
      event.default(client);
    } catch (err) {
      console.error("Event handler (Error) >> ", err);
    }
  }
}
