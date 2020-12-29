import { ref, onMounted, onUnmounted } from 'vue'

import { SetupProps } from '../../types'

export interface ClientRectProps {
  element: Element | HTMLElement
  hasResizeListener?: boolean
  shouldRound?: boolean
}

export const useClientRect = (props: ClientRectProps | SetupProps) => {
  const options: AddEventListenerOptions = {
    passive: true,
  }

  const clientRect = ref({})

  const getBoundedClientRect = (el: Element | HTMLElement) => {
    const rect = el.getBoundingClientRect()

    return !props.shouldRound
      ? rect
      : {
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          bottom: Math.round(rect.bottom),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }
  }

  const updateClientRect = () => {
    if (!props.element || !props.element) return
    clientRect.value = getBoundedClientRect(props.element)
  }

  onMounted(() => {
    updateClientRect()
    if (props.hasResizeListener) {
      window.addEventListener('resize', updateClientRect, options)
    }
  })

  onUnmounted(() => {
    if (props.hasResizeListener) {
      window.removeEventListener('resize', updateClientRect, options)
    }
  })

  return {
    clientRect,
    updateClientRect,
  }
}
