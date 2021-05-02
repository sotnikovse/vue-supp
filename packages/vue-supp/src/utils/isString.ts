/**
 * String type check.
 *
 * @param v - The value to check.
 * @returns Returns `true` if the value is string, else `false`.
 */
export const isString = (v: any): boolean =>
  typeof v === 'string' || v instanceof String

export default isString
