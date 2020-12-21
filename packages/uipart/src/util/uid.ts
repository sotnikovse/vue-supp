const uidCounter: Record<string, number> = {}

/**
 * Generates a unique id.
 * @param {string} [prefix=$default] The value to prefix the id with.
 * @returns {string} Returns the unique id.
 */
const uid = (prefix = '$default'): string => {
  if (!uidCounter[prefix]) {
    uidCounter[prefix] = 0
  }

  const id = ++uidCounter[prefix]
  if (prefix === '$default') {
    return `${id}`
  }

  return `${prefix}${id}`
}

export default uid
