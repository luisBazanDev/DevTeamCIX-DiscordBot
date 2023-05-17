/**
 *
 * @param {String[]} array
 */
export function parseArrayToString(array) {
  if (array.length <= 0) return "`-----`";

  return array.map((value) => `- ${value}`).join("\n");
}
