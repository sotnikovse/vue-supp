import { ref, onMounted, onUnmounted } from 'vue'

import { SetupProps } from '../types'

export interface DimensionsProps {
  element: Element | HTMLElement
  hasResizeListener?: boolean
  shouldRound?: boolean
}

/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {HTMLElement} props.element The HTML element.
 * @param {boolean} [props.hasResizeListener] Should add resize listener.
 * @param {boolean} [props.shouldRound] Should round dimensions.
 */
export const useDimensions = (props: DimensionsProps | SetupProps) => {
  const options: AddEventListenerOptions = {
    passive: true
  }

  const dimensions = ref({})

  const getBoundedClientRect = (el: Element | HTMLElement) => {
    const rect = el.getBoundingClientRect()

    return !props.shouldRound ? rect : {
      top: Math.round(rect.top),
      left: Math.round(rect.left),
      bottom: Math.round(rect.bottom),
      right: Math.round(rect.right),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    }
  }

  const updateDimensions = () => {
    if (!props.element || !props.element) return
    dimensions.value = getBoundedClientRect(props.element)
  }

  onMounted(() => {
    updateDimensions()
    if (props.hasResizeListener) {
      window.addEventListener('resize', updateDimensions, options)
    }
  })

  onUnmounted(() => {
    if (props.hasResizeListener) {
      window.removeEventListener('resize', updateDimensions, options)
    }
  })

  return {
    dimensions,
    updateDimensions,
  }
}
