/**
 * Makes the first character of a string uppercase.
 *
 * @category String
 * @param str - The value to transform.
 * @returns Returns transformed string.
 */
export function upperFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
