/**
 * Convert to unit.
 * @param {string,number,null,undefined} value The value to convert.
 * @param {string} [unit=px] The unit value.
 * @returns {string,undefined} Returns the converted value.
 */
export const convertToUnit = (value: string | number | null | undefined, unit = 'px'): string | undefined => {
  if (value == null || value === '') {
    return undefined
  } else if (isNaN(+value)) {
    return String(value)
  } else {
    return `${Number(value)}${unit}`
  }
}

export default convertToUnit
