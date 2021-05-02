/**
 * Wrap the value in array.
 *
 * @param v - The value to wrap.
 * @returns Returns array.
 */
export const wrapInArray = <T>(v: T | T[] | null | undefined): T[] => {
  return v == null ? [] : Array.isArray(v) ? v : [v]
}

export default wrapInArray
