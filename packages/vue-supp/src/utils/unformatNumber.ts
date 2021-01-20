/**
 * Unformat number.
 * @param {string|number} value
 * @param {string} decimal
 * @returns {number}
 */
export const unformatNumber = (value: string | number, decimal?: string): number | null => {
  if (value === null) return null
  // Fails silently (need decent errors):
  value = value || 0

  // Return the value as-is if it's already a number:
  if (typeof value === 'number') return value

  // Decimal can be ',' or '.'
  decimal = decimal ?? '(,|.)'

  // Build regex to strip out everything except digits, decimal point and minus sign:
  const regex = new RegExp('[^0-9-' + decimal + ']', 'g')
  const unformatted = parseFloat(
    ('' + value)
      .replace(/\((?=\d+)(.*)\)/, '-$1') // replace bracketed values with negatives
      .replace(regex, '') // strip out any cruft
      .replace(',', '.'), // make sure decimal point is standard
  )

  // This will fail silently which may cause trouble, let's wait and see:
  return !isNaN(unformatted) ? unformatted : 0
}

export default unformatNumber
