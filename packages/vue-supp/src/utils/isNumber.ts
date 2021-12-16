/**
 * Number type check.
 *
 * @category Util
 * @param val - The value to check.
 * @returns Returns `true` if the value is number, else `false`.
 */
export function isNumber(val: any): val is number {
  return typeof val === 'number' && isFinite(val)
}
