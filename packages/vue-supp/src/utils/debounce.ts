/**
 * Creates a debounced function that delays invoking `fn` until after `ms` milliseconds.
 *
 * @category Function
 */
export function debounce<T>(
  fn: (arg: T) => void,
  ms: number
): (arg: T) => void {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn
  }

  let timeout: any

  return (arg): void => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(arg)
    }, ms)
  }
}
