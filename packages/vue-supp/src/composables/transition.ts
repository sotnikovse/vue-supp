// https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/composables/transition.ts

import { h, Transition, mergeProps } from 'vue'
import { propsFactory } from '../utils'

import type {
  Component,
  PropType,
  TransitionProps,
  FunctionalComponent,
} from 'vue'

export const makeTransitionProps = propsFactory({
  transition: [String, Boolean, Object] as PropType<
    string | false | (TransitionProps & { component?: Component })
  >,
})

interface MaybeTransitionProps extends TransitionProps {
  transition?: string | boolean | (TransitionProps & { component?: any })
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
