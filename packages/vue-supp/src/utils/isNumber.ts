/**
 * Number type check.
 */
export const isNumber = (v: any): boolean =>
  typeof v === 'number' && isFinite(v)

export default isNumber
