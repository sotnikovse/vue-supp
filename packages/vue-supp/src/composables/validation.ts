// https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/composables/validation.ts

import { computed, onBeforeMount, onBeforeUnmount, ref, warn } from 'vue'
import { getCurrentInstance, getUid, propsFactory } from '../utils'
import { useForm } from './form'

import type { PropType } from 'vue'

export type ValidationResult = string | true
export type ValidationRule =
  | ValidationResult
  | PromiseLike<ValidationResult>
  | ((value: any) => ValidationResult)
  | ((value: any) => PromiseLike<ValidationResult>)

export interface ValidationProps {
  disabled?: boolean
  error?: boolean
  errorMessages?: string | string[]
  maxErrors?: string | number
  id?: string
  readonly?: boolean
  rules: ValidationRule[]
  modelValue?: any
}

export const makeValidationProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  errorMessages: {
    type: [Array, String] as PropType<string | string[]>,
    default: () => [],
  },
  maxErrors: {
    type: [Number, String],
    default: 1,
  },
  id: String,
  readonly: Boolean,
  rules: {
    type: Array as PropType<ValidationRule[]>,
    default: () => [],
  },
  modelValue: null,
})

export function useValidation(props: ValidationProps) {
  const form = useForm()
  const errorMessages = ref<string[]>([])
  const isPristine = ref(true)
  const isDisabled = computed(
    () => !!(props.disabled || form?.isDisabled.value)
  )
  const isReadonly = computed(
    () => !!(props.readonly || form?.isReadonly.value)
  )
  const isValid = computed(() => {
    if (
      props.error ||
      props.errorMessages?.length ||
      errorMessages.value.length
    )
      return false

    return isPristine.value ? null : true
  })
  const isValidating = ref(false)

  const vm = getCurrentInstance('useValidation')
  const uid = computed(() => props.id ?? getUid())

  onBeforeMount(() => {
    form?.register(uid.value, validate, reset, resetValidation)
  })

  onBeforeUnmount(() => {
    form?.unregister(uid.value)
  })

  function reset() {
    resetValidation()

    vm?.emit('update:modelValue', null)
  }

  function resetValidation() {
    isPristine.value = true
    errorMessages.value = []
  }

  async function validate() {
    const results = []

    isValidating.value = true

    for (const rule of props.rules) {
      if (results.length >= (props.maxErrors || 1)) {
        break
      }

      const handler = typeof rule === 'function' ? rule : () => rule
      const result = await handler(props?.modelValue?.value ?? props.modelValue)

      if (result === true) continue

      if (typeof result !== 'string') {
        warn(
          `${result} is not a valid value. Rule functions must return boolean true or a string.`
        )

        continue
      }

      results.push(result)
    }

    errorMessages.value = results
    isValidating.value = false
    isPristine.value = false

    return errorMessages.value
  }

  return {
    errorMessages,
    isDisabled,
    isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
  }
}
