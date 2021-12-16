import { computed, warn } from 'vue'
import { isBrowser, propsFactory } from '../utils'

import type { PropType } from 'vue'

export interface TeleportProps {
  teleport: boolean | string | Element
}

export const makeTeleportProps = propsFactory({
  teleport: {
    type: [String, Boolean] as PropType<boolean | string | Element>,
    default: true,
  },
})

export function useTeleport(props: TeleportProps) {
  const teleportTarget = computed(() => {
    const target = props.teleport

    if (target === false || !isBrowser) return undefined

    const targetElement =
      target === true
        ? document.body
        : typeof target === 'string'
        ? document.querySelector(target)
        : target

    if (targetElement == null) {
      warn(`Unable to locate target ${target}`)
      return undefined
    }

    return targetElement
  })

  return {
    teleportTarget,
  }
}
