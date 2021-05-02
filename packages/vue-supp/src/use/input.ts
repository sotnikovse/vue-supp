import { h, ref, computed, onMounted } from 'vue'

import { SetupContext } from '../../types'

export type InputValue = string | number | null | undefined
export interface InputProps {
  modelValue: InputValue
  name?: string
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  autofocus?: boolean
  placeholder?: string
  inputClass?: string
}

export const useInputProps = () => {
  return {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    name: String,
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    autofocus: Boolean,
    placeholder: String,
    inputClass: String,
  }
}

export const useInput = (
  props: InputProps,
  { emit }: Pick<SetupContext, 'emit'>
) => {
  const inputElement = ref<HTMLElement>()
  const internal = ref<InputValue>(props.modelValue)
  const isFocused = ref<boolean>(false)
  const badInput = ref<boolean>(false)

  const isDirty = computed(() => {
    return (
      (internal.value && internal.value.toString().length > 0) || badInput.value
    )
  })

  onMounted(() => {
    if (props.autofocus) {
      inputElement.value?.focus()
    }
  })

  const focus = () => {
    inputElement.value?.focus()
  }

  const blur = () => {
    // Safari tab order gets broken if called synchronous
    window.requestAnimationFrame(() => {
      inputElement.value?.blur()
    })
  }

  const onFocus = () => {
    isFocused.value = true
  }
  const onBlur = () => {
    isFocused.value = false
  }

  const genInput = (data: Record<string, any>) => {
    return h('input', {
      ref: inputElement,
      modelValue: internal.value,
      name: props.name,
      required: props.required,
      readonly: props.readonly,
      disabled: props.disabled,
      placeholder: props.placeholder,
      class: props.inputClass ? props.inputClass.trim() : undefined,
      onFocus: onFocus,
      onBlur: onBlur,
      ...data,
    })
  }

  const emitChange = () => {
    const val = internal.value
    if (val !== props.modelValue) {
      emit('update:modelValue', val)
    }
  }

  const setInternalValue = (val: InputValue) => {
    internal.value = val
  }

  return {
    inputElement,
    internal,
    isFocused,
    isDirty,
    badInput,
    focus,
    blur,
    genInput,
    emitChange,
    setInternalValue,
  }
}
