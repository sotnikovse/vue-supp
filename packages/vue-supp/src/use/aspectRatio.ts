import { computed, PropType } from 'vue'

export interface AspectRatioProps {
  aspectRatio?: string | number
}

export const useAspectRatioProps = () => {
  return {
    aspectRatio: [String, Number] as PropType<string | number | undefined>,
  }
}

export const useAspectRatio = (props: AspectRatioProps) => {
  return {
    aspectStyle: computed(() => {
      const ratio = Number(props.aspectRatio)

      return ratio
        ? { paddingBottom: String((1 / ratio) * 100) + '%' }
        : undefined
    }),
  }
}
