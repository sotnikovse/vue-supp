/**
 * String type check.
 *
 * @category String
 * @param val - The value to check.
 * @returns Returns `true` if the value is string, else `false`.
 */
export function isString(val: any) {
  return typeof val === 'string' || val instanceof String
}
