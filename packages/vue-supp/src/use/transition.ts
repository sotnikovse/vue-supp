import { PropType, TransitionProps } from 'vue'

export const useTransitionProps = (defaultValue?: TransitionProps) => {
  const type = Object as PropType<TransitionProps | null>
  return {
    transition: defaultValue
      ? {
          type,
          default: () => defaultValue,
        }
      : type,
  }
}
