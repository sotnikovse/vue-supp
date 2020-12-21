import { computed, Prop, Ref } from 'vue'

import { SetupProps } from '../../types'

export interface UseAspectRatioProps {
  aspectRatio: Prop<string | number>
}
export interface UseAspectRatioSetupProps {
  aspectRatio?: string | number
}
export interface UseAspectRatio {
  computedAspectRatio: Ref<number>
  aspectStyle: Ref<Record<string, string> | undefined>
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
