import { computed, PropType, ComputedRef } from 'vue'

export interface AspectRatioProps {
  aspectRatio?: string | number
}
export interface UseAspectRatio {
  aspectStyle: ComputedRef<Record<string, string> | undefined>
}

export const useAspectRatioProps = () => {
  return {
    aspectRatio: [String, Number] as PropType<string | number | undefined>,
  }
}

export const useAspectRatio = (props: AspectRatioProps): UseAspectRatio => {
  return {
    aspectStyle: computed(() => {
      const ratio = Number(props.aspectRatio)

      return ratio
        ? { paddingBottom: String((1 / ratio) * 100) + '%' }
        : undefined
    }),
  }
}
