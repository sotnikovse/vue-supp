/**
 * Object type check.
 *
 * @category Util
 * @param val - The value to check.
 * @returns Returns `true` if the value is object, else `false`.
 */
export function isObject(val: any): val is object {
  return val !== null && typeof val === 'object' && !Array.isArray(val)
}
