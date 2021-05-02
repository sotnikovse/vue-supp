import { computed, ComputedRef, PropType } from 'vue'

export interface AttachProps {
  attach: string | boolean | null | undefined
}
export interface UseAttach {
  target: ComputedRef<string | null>
}

export const useAttachProps = (defaultValue: string | boolean = true) => {
  return {
    attach: {
      type: [String, Boolean] as PropType<string | boolean | null | undefined>,
      default: defaultValue,
    },
  }
}

export const useAttach = (
  props: AttachProps,
  defaultTarget = '#app'
): UseAttach => {
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
