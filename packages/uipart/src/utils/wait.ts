/**
 * Promise delay.
 * @param {number} ms delay
 * @returns {Promise}
 */
export const wait = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export default wait
