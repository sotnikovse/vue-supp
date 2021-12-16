/**
 * Promise delay.
 *
 * @category Util
 * @param ms - The delay in ms.
 * @returns Returns Promise.
 */
export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
