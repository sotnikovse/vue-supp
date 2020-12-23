import { computed, Prop, ComputedRef } from 'vue'

import { SetupProps } from '../../types'

export interface UseAspectRatioProps {
  aspectRatio: Prop<string | number | undefined>
}
export interface UseAspectRatioSetupProps {
  aspectRatio?: string | number
}
export interface UseAspectRatio {
  computedAspectRatio: ComputedRef<number>
  aspectStyle: ComputedRef<Record<string, string> | undefined>
}

export const useAspectRatioProps = (): UseAspectRatioProps => {
  return {
    aspectRatio: [String, Number],
  }
}

export const useAspectRatio = (props: UseAspectRatioSetupProps | SetupProps): UseAspectRatio => {
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
