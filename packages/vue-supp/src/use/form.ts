// https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/composables/form.ts

import { computed, inject, provide, ref } from 'vue'
import { useModel } from './model'
import { getCurrentInstance, propsFactory } from '../utils'

import type { ComputedRef, InjectionKey, PropType, Ref } from 'vue'

export interface FormProvide {
  register: (
    id: number | string,
    validate: () => Promise<string[]>,
    reset: () => void,
    resetValidation: () => void
  ) => void
  unregister: (id: number | string) => void
  items: Ref<FormField[]>
  isDisabled: ComputedRef<boolean>
  isReadonly: ComputedRef<boolean>
  isValidating: Ref<boolean>
}

interface FormField {
  id: number | string
  validate: () => Promise<string[]>
  reset: () => void
  resetValidation: () => void
}

interface FormValidationResult {
  id: number | string
  errorMessages: string[]
}

export const FormKey: InjectionKey<FormProvide> = Symbol.for('form')

export interface FormProps {
  disabled: boolean
  fastFail: boolean
  lazyValidation: boolean
  readonly: boolean
  modelValue: boolean | null
  'onUpdate:modelValue': ((val: boolean | null) => void) | undefined
}

export const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  lazyValidation: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean as PropType<boolean | null>,
    default: null,
  },
})

export function createForm(props: FormProps) {
  const vm = getCurrentInstance('createForm')
  const model = useModel(props, 'modelValue')

  const isDisabled = computed(() => props.disabled)
  const isReadonly = computed(() => props.readonly)
  const isValidating = ref(false)
  const items = ref<FormField[]>([])
  const errorMessages = ref<FormValidationResult[]>([])

  async function submit(e: Event) {
    e.preventDefault()

    const results = []
    let valid = true

    errorMessages.value = []
    model.value = null
    isValidating.value = true

    for (const item of items.value) {
      const itemErrorMessages = await item.validate()

      if (itemErrorMessages.length > 0) {
        valid = false

        results.push({
          id: item.id,
          errorMessages: itemErrorMessages,
        })
      }

      if (!valid && props.fastFail) break
    }

    errorMessages.value = results
    model.value = valid
    isValidating.value = false

    vm?.emit('submit', e)
  }

  async function reset(e: Event) {
    e.preventDefault()

    items.value.forEach((item) => item.reset())
    model.value = null

    vm?.emit('reset', e)
  }

  async function resetValidation() {
    items.value.forEach((item) => item.resetValidation())
    errorMessages.value = []
    model.value = null

    vm?.emit('resetValidation')
  }

  provide(FormKey, {
    register: (id, validate, reset, resetValidation) => {
      items.value.push({
        id,
        validate,
        reset,
        resetValidation,
      })
    },
    unregister: (id) => {
      items.value = items.value.filter((item) => {
        return item.id !== id
      })
    },
    isDisabled,
    isReadonly,
    isValidating,
    items,
  })

  return {
    errorMessages,
    isDisabled,
    isReadonly,
    isValidating,
    items,
    submit,
    reset,
    resetValidation,
  }
}

export function useForm() {
  return inject(FormKey, null)
}
