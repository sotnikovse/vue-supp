/**
 * String type check.
 * @param {any} v
 * @returns {boolean}
 */
export const isString = (v: any) => typeof v === 'string' || v instanceof String

/**
 * Number type check.
 * @param {any} v
 * @returns {boolean}
 */
export const isNumber = (v: any) => typeof v === 'number' && isFinite(v)

/**
 * Array type check.
 * @param {any} v
 * @returns {boolean}
 */
export const isArray = (v: any) => v && typeof v === 'object' && v.constructor === Array

/**
 * Object type check.
 * @param {any} v
 * @returns {boolean}
 */
export const isObject = (v: any) => v && typeof v === 'object' && v.constructor === Object

export const deepEqual = (a: any, b: any): boolean => {
  if (a === b) return true

  if (
    a instanceof Date &&
    b instanceof Date &&
    a.getTime() !== b.getTime()
  ) {
    // If the values are Date, compare them as timestamps
    return false
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false
  }

  const props = Object.keys(a)

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false
  }

  return props.every(p => deepEqual(a[p], b[p]))
}
