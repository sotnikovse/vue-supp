import {
  h,
  PropType,
  Transition,
  TransitionProps as _TransitionProps,
  VNode,
} from 'vue'

export interface TransitionProps {
  transition?: _TransitionProps | null
}

export const useTransitionProps = (defaultValue?: _TransitionProps) => {
  const type = Object as PropType<_TransitionProps>
  return {
    transition: defaultValue
      ? {
          type,
          default: () => defaultValue,
        }
      : type,
  }
}

export const useTransition = (props: TransitionProps) => {
  function genTransition(content: VNode | VNode[] | undefined) {
    if (!props.transition) return content

    return h(Transition, props.transition, {
      default: () => content,
    })
  }

  return {
    genTransition,
  }
}
