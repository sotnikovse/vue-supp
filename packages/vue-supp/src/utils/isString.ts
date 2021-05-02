/**
 * String type check.
 */
export const isString = (v: any): boolean =>
  typeof v === 'string' || v instanceof String

export default isString
