import { isObject } from './isObject'

/**
 * Deep merge
 *
 * @category Object
 */
export function mergeDeep(
  source: Record<string, any> = {},
  target: Record<string, any> = {},
  out: Record<string, any> = {}
) {
  for (const key in source) {
    out[key] = source[key]
  }

  for (const key in target) {
    const sourceProperty = source[key]
    const targetProperty = target[key]

    // Only continue deep merging if
    // both properties are objects
    if (isObject(sourceProperty) && isObject(targetProperty)) {
      out[key] = mergeDeep(sourceProperty, targetProperty)

      continue
    }

    out[key] = targetProperty
  }

  return out
}
