/**
 * Converts string to kebab case.
 *
 * @category String
 */
export function kebabCase(str: string) {
  return str
    .replace(/[^a-z]/gi, '-')
    .replace(/\B([A-Z])/g, '-$1')
    .toLowerCase()
}
