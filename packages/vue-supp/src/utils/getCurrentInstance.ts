import { getCurrentInstance as _getCurrentInstance, warn } from 'vue'

export function getCurrentInstance(name: string, message?: string) {
  const vm = _getCurrentInstance()

  if (!vm) {
    warn(
      `[${name}] ${message || 'must be called from inside a setup function'}`
    )
  }

  return vm
}
