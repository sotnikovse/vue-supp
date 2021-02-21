import { ref, watch, Ref, Prop } from 'vue'

import { SetupProps, SetupContext } from '../../types'

export interface ToggleProps {
  modelValue: Prop<any>
}
export type UseToggleProps = Record<string, Prop<any>>
export type UseToggleEmits = string[]
export interface UseToggle {
  isActive: Ref<boolean>
}
export interface Toggle {
  useToggleProps: () => UseToggleProps
  useToggleEmits: () => UseToggleEmits
  useToggle: (props: ToggleProps | SetupProps, context: Pick<SetupContext, 'emit'>) => UseToggle
}

export const toggle = (prop = 'modelValue', event = 'update:modelValue'): Toggle => {
  const useToggleProps = (): UseToggleProps => {
    return {
      [prop]: {
        default: false,
      },
    }
  }

  const useToggleEmits = (): UseToggleEmits => {
    return [event]
  }

  const useToggle = (props: ToggleProps | SetupProps, { emit }: Pick<SetupContext, 'emit'>): UseToggle => {
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
