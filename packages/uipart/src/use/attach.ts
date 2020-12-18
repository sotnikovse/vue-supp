import { computed } from 'vue'

import { SetupProps } from '../types'

/**
 * @param {string, boolean} [defaultValue=true] The default value.
 */
export const useAttachProps = (defaultValue: string | boolean = true) => {
  return {
    attach: {
      type: [String, Boolean],
      default: defaultValue,
    },
  }
}

export interface AttachProps {
  attach: string | boolean | undefined
}
/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {string|boolean} props.attach The attach target prop.
 * @param {string} [defaultTarget=#app] The default target.
 */
export const useAttach = (props: AttachProps | SetupProps, defaultTarget: string = '#app') => {
  const target = computed(() => {
    if (props.attach === false) {
      return null
    } else if (typeof props.attach === 'string' && props.attach !== '') {
      const el = document.querySelector(props.attach)
      // If element doesn't exist, detach to app
      if (el) {
        return props.attach
      }
      return defaultTarget
    }
    return defaultTarget
  })

  return {
    target,
  }
}
