/**
 * Wrap the value in array.
 * @param {any} v
 * @returns {Array}
 */

export const wrapInArray = <T>(v: T | T[] | null | undefined): T[] => {
  return v == null
    ? []
    : Array.isArray(v)
      ? v
      : [v]
}

export default wrapInArray
