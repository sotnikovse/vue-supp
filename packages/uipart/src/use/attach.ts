import { computed, Prop, ComputedRef } from 'vue'

import { SetupProps } from '../../types'

export interface UseAttachProp {
  attach: Prop<string | boolean | undefined>
}
export interface UseAttachSetupProps {
  attach: string | boolean | undefined
}
export interface UseAttach {
  target: ComputedRef<string | null>
}

export const useAttachProps = (defaultValue: string | boolean = true): UseAttachProp => {
  return {
    attach: {
      type: [String, Boolean],
      default: defaultValue,
    },
  }
}

export const useAttach = (props: UseAttachSetupProps | SetupProps, defaultTarget = '#app'): UseAttach => {
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
