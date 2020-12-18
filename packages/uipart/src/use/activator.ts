import {
  ref,
  reactive,
  computed,
  cloneVNode,
  onMounted,
  onBeforeMount,
  onUnmounted,
  nextTick,
  watch,
} from 'vue'

import { SetupProps, SetupContext } from '../types'

import { useToggle } from './toggle'

import { parseEventName } from '../util/parse'

export const useActivatorProps = () => {
  return {
    modelValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    activator: {
      type: [String, Object, HTMLElement, Element],
      default: null,
    },
    openOnHover: {
      type: Boolean,
      default: true,
    },
    openOnFocus: {
      type: Boolean,
      default: true,
    },
    openOnClick: {
      type: Boolean,
      default: true,
    },
    disableKeys: Boolean,
    disabled: Boolean,
  }
}

export interface ActivatorProps {
  modelValue: string | number | boolean | null | undefined
  activator: any
  disabled: boolean
  openOnHover: boolean
  openOnFocus: boolean
  openOnClick: boolean
  disableKeys: boolean
}
/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {string|number|boolean} [props.modelValue]
 * @param {string|Object|HTMLElement|Element} [props.activator]
 * @param {boolean} [props.disabled]
 * @param {boolean} [props.openOnHover]
 * @param {boolean} [props.openOnFocus]
 * @param {boolean} [props.openOnClick]
 * @param {boolean} [props.disableKeys]
 */
export const useActivator = (props: ActivatorProps | SetupProps, { slots, emit }: SetupContext) => {
  const activatorNode = ref<any>(null)
  const activatorElement = ref<HTMLElement|null>(null)
  const _listeners = ref<any>({})

  const toggleProps = reactive({
    modelValue: computed(() => props.modelValue),
  })
  const { isActive } = useToggle(toggleProps, { emit })

  watch([() => props.activator, () => props.openOnHover], () => {
    resetActivator()
  })

  watch(_listeners, () => {
    nextTick(addActivatorEvents)
  })

  onMounted(() => {
    genActivatorListeners()
  })

  watch(() => props.disabled, (val) => {
    if (val) isActive.value = false
  })

  onBeforeMount(() => {
    nextTick(() => {
      if (props.modelValue) isActive.value = true
    })
  })

  onUnmounted(() => {
    removeActivatorEvents()
  })

  // Functions
  const resetActivator = () => {
    removeActivatorEvents()
    activatorElement.value = null
    getActivator()
    genActivatorListeners()
  }

  const genActivatorAttributes = ($attrs?: any) => {
    return Object.assign({
      role: 'button',
      'aria-haspopup': true,
      'aria-expanded': isActive.value ? true : undefined,
    }, $attrs)
  }

  const genActivatorListeners = ($listeners?: any) => {
    if (props.disabled) return {}

    const listeners:any = {}

    if (props.openOnHover) {
      listeners.onMouseenter = () => {
        isActive.value = true
      }
      listeners.onMouseleave = () => {
        isActive.value = false
      }
    } else {
      listeners.onClick = (e: MouseEvent) => {
        e.stopPropagation()

        isActive.value = !isActive.value
      }
    }

    if (props.openOnFocus) {
      listeners.onFocus = () => {
        isActive.value = true
      }
    }

    if (!props.disableKeys) {
      listeners.onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Esc' || e.key === 'Escape') {
          isActive.value = false
        }
      }
    }

    Object.assign(listeners, $listeners)

    _listeners.value = listeners

    return _listeners.value
  }

  const genActivator = ($attrs?: any, $listeners?: any) => {
    const attrs = genActivatorAttributes($attrs)
    const listeners = genActivatorListeners($listeners)
    const data = {
      ...attrs,
      ...listeners,
    }

    const listenersParsed = Object.keys(listeners).reduce((acc, key) => {
      const [type] = parseEventName(key)
      acc[type] = listeners[key]
      return acc
    }, {} as Record<string, any>)
    const node = slots.activator ? slots.activator({ attrs, listeners: listenersParsed }) : []

    // Auto merge data only in first node,
    // in other case set manually on v-slot attrs and listeners
    const [firstNode, ...others] = node
    const transformedNode = firstNode ? cloneVNode(firstNode, data) : undefined
    activatorNode.value = transformedNode
    return firstNode ? [transformedNode, ...others] : undefined
  }

  const addActivatorEvents = () => {
    const _activator: any = getActivator()
    if (
      !props.activator ||
      props.disabled ||
      !_activator
    ) return

    const keys = Object.keys(_listeners.value)
      .map(key => {
        const [type, modifiers] = parseEventName(key)
        return [key, type, modifiers]
      })

    for (const [key, type, modifiers] of keys) {
      _activator.addEventListener(type, _listeners.value[key], modifiers)
    }
  }

  const removeActivatorEvents = () => {
    if (
      !props.activator ||
      !activatorElement.value
    ) return

    const keys = Object.keys(_listeners.value)
      .map(key => {
        const [type, modifiers] = parseEventName(key)
        return [key, type, modifiers]
      })

    for (const [key, type, modifiers] of keys) {
      activatorElement.value.removeEventListener(type, _listeners.value[key], modifiers)
    }

    _listeners.value = {}
  }

  const getActivator = () => {
    if (activatorElement.value) return activatorElement.value

    let _activator = null

    if (props.activator) {
      const target = document

      if (typeof props.activator === 'string') {
        // Selector
        _activator = target.querySelector(props.activator)
      } else if (props.activator.$el) {
        // Component
        _activator = props.activator.$el
      } else {
        // HTMLElement | Element
        _activator = props.activator
      }
    } else if (activatorNode.value) {
      _activator = activatorNode.value.el
    }

    activatorElement.value = _activator

    return activatorElement.value
  }

  return {
    isActive,
    activatorElement,
    genActivatorAttributes,
    genActivatorListeners,
    genActivator,
    addActivatorEvents,
    removeActivatorEvents,
    getActivator,
  }
}
