import { computed, PropType, ComputedRef } from 'vue'

export interface AspectRatioProps {
  aspectRatio?: string | number
}
export interface UseAspectRatioProps {
  aspectRatio: string | number | undefined
}
export interface UseAspectRatio {
  computedAspectRatio: ComputedRef<number>
  aspectStyle: ComputedRef<Record<string, string> | undefined>
}

export const useAspectRatioProps = () => {
  return {
    aspectRatio: [String, Number] as PropType<string | number | undefined>,
  }
}

export const useAspectRatio = (props: AspectRatioProps): UseAspectRatio => {
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
