import { getCurrentInstance as _getCurrentInstance } from 'vue'

/**
 * Helper for vue getCurrentInstance.
 *
 * @category Util
 */
export function getCurrentInstance(name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    throw new Error(
      `[${name}] ${message || 'must be called from inside a setup function'}`
    )
  }

  return vm
}
