import { h, Transition, mergeProps } from 'vue'
import type { PropType, TransitionProps, FunctionalComponent, VNode } from 'vue'

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

interface MaybeTransitionProps extends TransitionProps {
  transition?: null | (TransitionProps & { component?: any })
}

export const MaybeTransition: FunctionalComponent<MaybeTransitionProps> = (
  props,
  { slots }
) => {
  const { transition, ...rest } = props

  if (!transition || typeof transition === 'boolean') return slots.default?.()

  const { component = Transition, ...customProps } =
    typeof transition === 'object' ? transition : {}

  return h(
    component,
    mergeProps(
      typeof transition === 'string'
        ? { name: transition }
        : (customProps as any),
      rest as any
    ),
    slots
  )
}
