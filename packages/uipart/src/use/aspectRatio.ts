import { computed } from 'vue'

import { SetupProps } from '../types'

export const useAspectRatioProps = () => {
  return {
    aspectRatio: [String, Number],
  }
}

export interface AspectRatioProps {
  aspectRatio?: string | number
}
/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {string|number} props.aspectRatio The aspect ratio.
 */
export const useAspectRatio = (props: AspectRatioProps | SetupProps) => {
  const computedAspectRatio = computed(() => Number(props.aspectRatio))

  const aspectStyle = computed(() => {
    return computedAspectRatio.value
      ? { paddingBottom: (1 / computedAspectRatio.value) * 100 + '%' }
      : undefined
  })

  return {
    computedAspectRatio,
    aspectStyle,
  }
}
