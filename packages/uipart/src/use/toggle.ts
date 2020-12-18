import { ref, watch, Ref } from 'vue'

const DEFAULT_PROP = 'modelValue'
const DEFAULT_EVENT = 'update:modelValue'

/**
 * @param {string} [prop=DEFAULT_PROP] The emit event name.
 */
export const useToggleProps = (prop: string = DEFAULT_PROP) => {
  return {
    [prop]: {
      default: false,
    },
  }
}

/**
 * @param {boolean} [returnArray=true] Return Array or Object emits.
 * @param {string} [event=DEFAULT_EVENT] The emit event name.
 */
export const useToggleEmits = (returnArray: boolean = true, event: string = DEFAULT_EVENT) => {
  return returnArray ? [event] : {
    [event]: () => true,
  }
}

/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {undefined} props.modelValue The model value.
 * @param {Object} context The context of use-case.
 * @param {Function} context.emit The emit function.
 * @param {string} [event=DEFAULT_EVENT] The emit event name.
 */
export const useToggle = (props: any, { emit }: any, event: string = DEFAULT_EVENT) => {
  // Data
  const isActive: Ref = ref(!!props.modelValue)

  // Watch
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

/**
 * @param {string} [prop=DEFAULT_PROP] The prop name.
 * @param {string} [event=DEFAULT_EVENT] The emit event name.
 */
export const toggle = (prop: string = DEFAULT_PROP, event: string = DEFAULT_EVENT) => {
  return {
    useToggleProps: () => useToggleProps(prop),
    useToggle: (props: any, context: any) => useToggle(props, context, event),
    useToggleEmits: useToggleEmits,
  }
}
