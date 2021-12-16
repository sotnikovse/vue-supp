/**
 * String type check.
 *
 * @category Util
 * @param val - The value to check.
 * @returns Returns `true` if the value is string, else `false`.
 */
export function isString(val: any): val is string {
  return typeof val === 'string' || val instanceof String
}
