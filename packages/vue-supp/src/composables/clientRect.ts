import { ref, onMounted, onUnmounted } from 'vue'

import type { Ref } from 'vue'

export const useClientRect = (
  element: Ref<Element | HTMLElement | null | undefined>,
  hasResizeListener?: boolean,
  shouldRound?: boolean
) => {
  const options: AddEventListenerOptions = {
    passive: true,
  }

  const clientRect = ref<DOMRectReadOnly>()

  const getBoundedClientRect = (el: Element | HTMLElement) => {
    const rect = el.getBoundingClientRect()

    return !shouldRound
      ? rect
      : ({
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          bottom: Math.round(rect.bottom),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          x: Math.round(rect.x),
          y: Math.round(rect.y),
        } as DOMRectReadOnly)
  }

  const updateClientRect = () => {
    if (!element.value) return
    clientRect.value = getBoundedClientRect(element.value)
  }

  onMounted(() => {
    updateClientRect()
    if (hasResizeListener) {
      window.addEventListener('resize', updateClientRect, options)
    }
  })

  onUnmounted(() => {
    if (hasResizeListener) {
      window.removeEventListener('resize', updateClientRect, options)
    }
  })

  return {
    clientRect,
    updateClientRect,
  }
}
