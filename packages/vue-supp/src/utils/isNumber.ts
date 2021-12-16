/**
 * Number type check.
 *
 * @category Number
 * @param val - The value to check.
 * @returns Returns `true` if the value is number, else `false`.
 */
export function isNumber(val: any) {
  return typeof val === 'number' && isFinite(val)
}
