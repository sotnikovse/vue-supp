/**
 * Create a new subset object by omitting giving keys.
 *
 * @category Object
 */
export function omit<T extends Record<any, any>>(
  object: T,
  keysToOmit: string[] = []
) {
  const clone = Object.assign({}, object)
  for (const key of keysToOmit) {
    if (key in clone) delete clone[key]
  }
  return clone
}
