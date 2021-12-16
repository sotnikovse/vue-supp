/**
 * Converts string to kebab case.
 *
 * @category String
 */
export function kebabCase(str: string) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`)
}
