import {
  ref,
  computed,
  watch,
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  inject,
  toRefs,
} from 'vue'

import { SetupProps, SetupContext } from '../../types'

export const useInputValidationProps = () => {
  return {
    rules: {
      type: Array,
      default: () => ([]),
    },
    pattern: String,
    patternMessage: String,
    validateOnBlur: Boolean,
    forceValidate: Boolean,
    error: Boolean,
    errorMessages: {
      type: Array,
      default: [],
    },
    messagesOnFocused: Boolean,
    hideDetails: {
      type: [Boolean, String],
      default: undefined,
    },
    errorCount: {
      type: Number,
      default: 1,
    },
  }
}

/**
 * @param {Object} props The props of use-case.
 * @prop {string} [props.id]
 * @prop {number|string|boolean} [props.internalValue] // Mutable, should be ref
 * @prop {boolean} [props.isFocused]
 * @prop {Array} [props.rules]
 * @prop {string} [props.pattern]
 * @prop {string} [props.patternMessage]
 * @prop {boolean} [props.validateOnBlur]
 * @prop {boolean} [props.forceValidate]
 * @prop {boolean} [props.error]
 * @prop {Array} [props.errorMessages]
 * @prop {boolean} [props.messagesOnFocused]
 * @prop {string|boolean} [props.hideDetails]
 * @prop {number} [props.errorCount]
 * @param {Object} context The setup context.
 * @param {Symbol} injectKey The injection key.
 */
export const useInputValidation = (props: SetupProps, { emit }: Pick<SetupContext, 'emit'>, injectKey: symbol) => {
  const formApi: any = injectKey ? inject(injectKey, null) : undefined

  const { internalValue } = toRefs(props)

  const valid = ref<boolean>(false)

  const hasInput = ref<boolean>(false)
  const hasFocused = ref<boolean>(false)
  const errorBucket = ref<any[]>([])
  const isResetting = ref<boolean>(false)
  const isPatternMismatch = ref<boolean>(false)

  const isDisabled = computed(() => props.disabled || (!!formApi?.disabled))
  const isReadonly = computed(() => props.readonly || (!!formApi?.readonly))

  const isInteractive = computed(() => {
    return !isDisabled.value && !isReadonly.value
  })

  const internalErrorMessages = computed(() => {
    return props.error ? props.errorMessages : []
  })

  const hasError = computed(() => {
    return (
      errorBucket.value.length > 0 ||
      internalErrorMessages.value.length > 0
    )
  })

  const hasMessages = computed(() => {
    return errorMessages.value.length > 0 || internalErrorMessages.value.length > 0
  })

  const showDetails = computed(() => {
    return props.hideDetails === false || (props.hideDetails === 'auto' && hasMessages.value)
  })

  const errorMessages = computed(() => {
    if (internalErrorMessages.value.length > 0) {
      return internalErrorMessages.value
    } else if (shouldValidate.value) {
      return errorBucket.value
    } else return []
  })

  const messagesToDisplay = computed(() => {
    return errorMessages.value.slice(0, props.errorCount)
  })

  const shouldValidate = computed(() => {
    if (props.forceValidate) return true
    if (isResetting.value) return false

    return props.validateOnBlur
      ? hasFocused.value
      : (hasInput.value || hasFocused.value)
  })

  const hasSuccess = computed(() => {
    return !props.validateOnBlur || valid.value
  })

  const hasState = computed(() => {
    if (isDisabled.value || !props.stateIcon) return false

    return (
      hasSuccess.value ||
      (shouldValidate.value && hasError.value)
    )
  })

  const validationState = computed(() => {
    return valid.value ? 'success' : 'error'
  })

  watch(internalValue, () => {
    hasInput.value = true
    // skip validation if not focused
    ;(props.validateOnBlur && !hasFocused.value) || nextTick(validate)
  })

  // validate on blur
  watch(() => props.isFocused, (val) => {
    if (
      !val &&
      !isDisabled.value
    ) {
      hasFocused.value = true
      props.validateOnBlur && nextTick(validate)
    }
  })

  watch(isResetting, () => {
    setTimeout(() => {
      hasInput.value = false
      hasFocused.value = false
      isResetting.value = false
      validate()
    }, 0)
  })

  watch(hasError, (val) => {
    if (shouldValidate.value) {
      emit('update:error', val)
    }
  })

  onBeforeMount(() => {
    formApi && formApi.register(input)
    validate()
  })

  onBeforeUnmount(() => {
    formApi && formApi.unregister(input)
  })

  const reset = () => {
    isResetting.value = true
    internalValue.value = Array.isArray(internalValue.value)
      ? []
      : undefined
  }

  const resetValidation = () => {
    isResetting.value = true
  }

  const validate = (force = false, value?: any) => {
    const _errorBucket = []
    value = value || internalValue.value

    if (force) hasInput.value = hasFocused.value = true

    for (let index = 0; index < props.rules.length; index++) {
      const rule = props.rules[index]
      const valid = typeof rule === 'function' ? rule(value) : rule

      if (valid === false || typeof valid === 'string') {
        _errorBucket.push(valid || '')
      } else if (typeof valid !== 'boolean') {
        // eslint-disable-next-line
        console.log(`Rules should return a string or boolean, received '${typeof valid}' instead`)
      }
    }

    errorBucket.value = _errorBucket
    valid.value = _errorBucket.length === 0

    return valid.value
  }

  // For form
  const input = {
    id: props.id,
    hasError,
    shouldValidate,
    reset,
    resetValidation,
    validate,
  }

  return {
    valid,
    isDisabled,
    isReadonly,
    isInteractive,
    hasError,
    hasMessages,
    showDetails,
    errorMessages,
    messagesToDisplay,
    shouldValidate,
    hasState,
    validationState,
    isPatternMismatch,
    reset,
    resetValidation,
    validate,
  }
}
