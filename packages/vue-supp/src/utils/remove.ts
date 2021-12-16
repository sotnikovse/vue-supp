/**
 * Remove an item from Array.
 *
 * @category Array
 */
export function remove<T>(array: T[], value: T) {
  if (!array) return false
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}
