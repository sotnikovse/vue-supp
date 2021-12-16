/**
 * Replace char from String at index.
 *
 * @category String
 * @param str - The source string.
 * @param index - The index for replacement.
 * @param replacement - The replace value.
 * @returns Returns result of manupulations.
 */
export function replaceAt(str: string, index: number, replacement: string) {
  if (!str) return str
  return str.substring(0, index) + replacement + str.substring(index + 1)
}
