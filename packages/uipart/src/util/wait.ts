/**
 * Promise delay.
 * @param {number} ms delay
 * @returns {Promise}
 */
export const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
