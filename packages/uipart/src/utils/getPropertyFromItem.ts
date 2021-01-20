import { ObjectItemKey } from '../../types'

import getNestedValue from './getNestedValue'
import getObjectValueByPath from './getObjectValueByPath'

export const getPropertyFromItem = (
  item: Record<string, unknown>,
  property: ObjectItemKey,
  fallback?: any,
): any => {
  if (property == null) return item === undefined ? fallback : item

  if (item !== Object(item)) return fallback === undefined ? item : fallback

  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback)

  if (Array.isArray(property)) return getNestedValue(item, property, fallback)

  if (typeof property !== 'function') return fallback

  const value = property(item, fallback)

  return typeof value === 'undefined' ? fallback : value
}

export default getPropertyFromItem
