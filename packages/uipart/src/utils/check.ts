/**
 * String type check.
 */
export const isString = (v: any): boolean => typeof v === 'string' || v instanceof String

/**
 * Number type check.
 */
export const isNumber = (v: any): boolean => typeof v === 'number' && isFinite(v)

/**
 * Array type check.
 */
export const isArray = (v: any): boolean => v && typeof v === 'object' && v.constructor === Array

/**
 * Object type check.
 */
export const isObject = (v: any) => v && typeof v === 'object' && v.constructor === Object

export default {
  isString,
  isNumber,
  isArray,
  isObject,
}
