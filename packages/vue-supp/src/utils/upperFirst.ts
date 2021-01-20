/**
 * Makes the first character of a string uppercase.
 * @param {string} str The value to transforme.
 * @returns {string} Returns transformed string.
 */
export const upperFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default upperFirst
