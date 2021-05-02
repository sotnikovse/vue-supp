/**
 * Number type check.
 *
 * @param v - The value to check.
 * @returns Returns `true` if the value is number, else `false`.
 */
export const isNumber = (v: any): boolean =>
  typeof v === 'number' && isFinite(v)

export default isNumber
