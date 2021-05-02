/**
 * Convert to unit.
 *
 * @param value - The value to convert.
 * @param unit - The unit value.
 * @returns Returns the converted value.
 */
export const convertToUnit = (
  value: string | number | null | undefined,
  unit = 'px'
): string | undefined => {
  if (value == null || value === '') {
    return undefined
  } else if (isNaN(+value)) {
    return String(value)
  } else {
    return `${Number(value)}${unit}`
  }
}

export default convertToUnit
