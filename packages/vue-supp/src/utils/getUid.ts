const uidCounter: Record<string, number> = {}

/**
 * Generates a unique id.
 *
 * @category Util
 * @param prefix - The value to prefix the id with.
 * @returns Returns the unique id.
 */
export function getUid(prefix = '$default') {
  if (!uidCounter[prefix]) {
    uidCounter[prefix] = 0
  }

  const id = ++uidCounter[prefix]
  if (prefix === '$default') {
    return `${id}`
  }

  return `${prefix}${id}`
}
