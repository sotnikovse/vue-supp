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
  PropType,
  VNode,
} from 'vue'

import { SetupContext } from '../../types'

import { toggle } from './toggle'

import parseEventName from '../utils/parseEventName'

export interface ActivatorProps {
  modelValue: string | number | boolean | null | undefined
  activator?: any
  disabled?: boolean
  openOnHover: boolean
  openOnFocus: boolean
  openOnClick: boolean
  disableKeys?: boolean
}

export const useActivatorProps = () => {
  return {
    modelValue: {
      type: [Boolean, String, Number] as PropType<
        string | number | boolean | null | undefined
      >,
      default: false,
    },
    activator: {
      default: (null as unknown) as PropType<
        string | HTMLElement | VNode | Element | null
      >,
      validator: (val: string | Record<string, unknown>) => {
        return ['string', 'object'].includes(typeof val)
      },
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

export const useActivator = (
  props: ActivatorProps,
  { slots, emit }: Pick<SetupContext, 'slots' | 'emit'>
) => {
  const activatorNode = ref<any>()
  const activatorElement = ref<HTMLElement>()
  const _listeners = ref<any>({})

  const { useToggle } = toggle()

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

  watch(
    () => props.disabled,
    (val) => {
      if (val) isActive.value = false
    }
  )

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
    activatorElement.value = undefined
    getActivator()
    genActivatorListeners()
  }

  const genActivatorAttributes = ($attrs?: any) => {
    return Object.assign(
      {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': isActive.value ? true : undefined,
      },
      $attrs
    )
  }

  const genActivatorListeners = ($listeners?: any) => {
    if (props.disabled) return {}

    const listeners: any = {}

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
    const node = slots.activator
      ? slots.activator({ attrs, listeners: listenersParsed })
      : []

    // Auto merge data only in first node,
    // in other case set manually on v-slot attrs and listeners
    const [firstNode, ...others] = node
    const transformedNode = firstNode ? cloneVNode(firstNode, data) : undefined
    activatorNode.value = transformedNode
    return firstNode ? [transformedNode, ...others] : undefined
  }

  const addActivatorEvents = () => {
    const _activator: any = getActivator()
    if (!props.activator || props.disabled || !_activator) return

    const keys = Object.keys(_listeners.value).map((key) => {
      const [type, modifiers] = parseEventName(key)
      return [key, type, modifiers]
    })

    for (const [key, type, modifiers] of keys) {
      _activator.addEventListener(
        type as any,
        _listeners.value[key as string],
        modifiers
      )
    }
  }

  const removeActivatorEvents = () => {
    if (!props.activator || !activatorElement.value) return

    const keys = Object.keys(_listeners.value).map((key) => {
      const [type, modifiers] = parseEventName(key)
      return [key, type, modifiers]
    })

    for (const [key, type, modifiers] of keys) {
      activatorElement.value.removeEventListener(
        type as any,
        _listeners.value[key as string],
        modifiers as any
      )
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
    } else if (
      activatorNode.value &&
      activatorNode.value.key === '_activator' &&
      activatorNode.value.children.length
    ) {
      // set correct element on nested activator slot
      // TODO: select element recursively if element type is 'Symbol' or 'text'
      _activator = activatorNode.value.children[0].el
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
