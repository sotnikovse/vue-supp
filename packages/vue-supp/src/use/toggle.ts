import { ref, watch, Ref, Prop } from 'vue'

import { SetupContext } from '../../types'

export interface ToggleProps {
  modelValue: any
}
export type UseToggleProps = Record<string, Prop<any>>
export type UseToggleEmits = string[]
export interface UseToggle {
  isActive: Ref<boolean>
}
export interface Toggle {
  useToggleProps: () => UseToggleProps
  useToggleEmits: () => UseToggleEmits
  useToggle: (props: ToggleProps, context: Pick<SetupContext, 'emit'>) => UseToggle
}

export const toggle = (prop = 'modelValue', event = 'update:modelValue') => {
  const useToggleProps = () => {
    return {
      [prop]: {
        default: false,
      },
    }
  }

  const useToggleEmits = () => {
    return [event]
  }

  const useToggle = (props: ToggleProps, { emit }: Pick<SetupContext, 'emit'>): UseToggle => {
    const isActive = ref<boolean>(!!props.modelValue)

    watch(() => props.modelValue, (val) => {
      isActive.value = !!val
    })

    watch(isActive, (val) => {
      emit(event, val)
    })

    return {
      isActive,
    }
  }

  return {
    useToggleProps,
    useToggleEmits,
    useToggle,
  }
}
