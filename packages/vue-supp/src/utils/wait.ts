/**
 * Promise delay.
 *
 * @param ms - The delay in ms.
 * @returns Returns Promise.
 */
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export default wait
