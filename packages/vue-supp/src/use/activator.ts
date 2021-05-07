import {
  ref,
  reactive,
  cloneVNode,
  onMounted,
  onBeforeMount,
  onUnmounted,
  nextTick,
  watch,
  PropType,
  VNode,
  Slots,
  Ref,
  ComponentPublicInstance,
} from 'vue'

import { Data } from '../../types'

import { useModel } from './model'

import parseEventName from '../utils/parseEventName'

export interface ActivatorProps {
  modelValue: any
  activator?: string | HTMLElement | Element | ComponentPublicInstance | null
  disabled?: boolean
  openOnHover: boolean
  openOnFocus: boolean
  openOnClick: boolean
  disableKeys?: boolean
}

type Listeners = Record<string, (e?: any) => void>

type Options = { attrs: Data; listeners: Listeners }

export const useActivatorProps = () => {
  return {
    modelValue: {
      type: [Boolean, String, Number] as PropType<ActivatorProps['activator']>,
      default: false,
    },
    activator: {
      type: [String, Object] as PropType<ActivatorProps['activator']>,
      validator: (val: unknown) => {
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
  {
    slots,
    reference,
  }: {
    slots: Slots
    reference?: Ref
  }
) => {
  const _activatorNode = ref<VNode[]>()
  const _activatorElement = ref<HTMLElement | null>(null)
  const _listeners = ref<Listeners>({})
  // override or add extra attributes and listeners
  const _options = reactive<Options>({
    attrs: {},
    listeners: {},
  })

  const isActive = useModel(props, 'modelValue')

  watch(
    () => props.activator,
    () => {
      resetActivator()
    }
  )

  watch(
    [
      () => props.openOnHover,
      () => props.openOnFocus,
      () => props.openOnClick,
      () => props.disableKeys,
    ],
    () => {
      genActivatorListeners()
    }
  )

  watch(
    () => props.disabled,
    (val) => {
      if (val) isActive.value = false
    }
  )

  onMounted(() => {
    if (props.activator) {
      genActivatorListeners()
    }
    watch(
      _listeners,
      (val, oldVal) => {
        _removeActivatorEvents(oldVal)
        _addActivatorEvents(val)
      },
      { immediate: true }
    )
  })

  onBeforeMount(() => {
    nextTick(() => {
      if (props.modelValue) isActive.value = true
    })
  })

  onUnmounted(() => {
    _removeActivatorEvents()
  })

  const resetActivator = () => {
    _removeActivatorEvents()
    _activatorElement.value = null
    _getActivator()
    _addActivatorEvents()
  }

  const setActivatorAttrs = (attrs: Data = {}) => {
    _options.attrs = attrs
  }

  const setActivatorListeners = (listeners: Listeners = {}) => {
    _options.listeners = listeners
    genActivatorListeners()
  }

  const genActivatorAttributes = ($attrs?: Data) => {
    return Object.assign(
      {
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': isActive.value ? true : undefined,
      },
      _options.attrs,
      $attrs
    )
  }

  const genActivatorListeners = ($listeners?: Listeners) => {
    if (props.disabled) return {}

    const listeners: Listeners = {}

    if (props.openOnHover) {
      listeners.onMouseenter = () => {
        isActive.value = true
      }
      listeners.onMouseleave = () => {
        isActive.value = false
      }
    } else if (props.openOnClick) {
      listeners.onClick = (e: MouseEvent) => {
        e.stopPropagation()

        isActive.value = !isActive.value
      }
    }

    if (props.openOnFocus) {
      listeners.onFocus = () => {
        isActive.value = !isActive.value
      }
    }

    if (!props.disableKeys) {
      listeners.onKeydown = (e: KeyboardEvent) => {
        if (e.key === 'Esc' || e.key === 'Escape') {
          isActive.value = false
        }
      }
    }

    Object.assign(listeners, _options.listeners, $listeners)

    _listeners.value = listeners

    return _listeners.value
  }

  const genActivator = ($attrs?: Data, $listeners?: Listeners) => {
    if (props.activator) return

    const attrs = genActivatorAttributes($attrs)
    const listeners = genActivatorListeners($listeners)
    const data = {
      ...attrs,
      ...listeners,
      ref: reference,
    }

    const listenersParsed = Object.keys(listeners).reduce((acc, key) => {
      const [type] = parseEventName(key)
      acc[type] = listeners[key]
      return acc
    }, {} as Listeners)

    // Auto merge data only if node length eq 1 and not nested slot,
    // in other case set manually on v-slot ref, attrs and listeners
    const node = slots.activator?.({
      attrs: attrs,
      listeners: listenersParsed,
      ref: reference,
    })
    // TODO: skip Symbol(Comment) in dev
    if (
      node &&
      node.length === 1 &&
      !node.some((n) => n.key === '_activator')
    ) {
      _activatorNode.value = node.map((n) => cloneVNode(n, data))
    } else {
      _activatorNode.value = node
    }
    return _activatorNode.value
  }

  const focusActivator = (options?: FocusOptions) => {
    if (_activatorElement.value) {
      _activatorElement.value.focus(options)
    } else {
      // Focus first Element with role="button" or aria-haspopup="true"
      if (_activatorNode.value?.length) {
        let element
        for (const n of _activatorNode.value) {
          let el = n.el
          while (el && el.nextSibling) {
            /* ELEMENT */
            if (
              el.nodeType === 1 &&
              (el.getAttribute('role') === 'button' ||
                el.getAttribute('aria-haspopup') === 'true')
            ) {
              element = el
              break
            } else {
              el = el.nextSibling
            }
          }
          if (element) {
            element.focus(options)
            break
          }
        }
        return element
      }
    }
  }

  const _addActivatorEvents = ($listeners?: Listeners) => {
    const _activator = _getActivator()
    if (!props.activator || props.disabled || !_activator) return

    const listeners = $listeners || _listeners.value

    const keys = Object.keys(listeners).map((key) => {
      const [type, modifiers] = parseEventName(key)
      return [key, type, modifiers]
    })

    for (const [key, type, modifiers] of keys) {
      _activator.addEventListener(
        type as string,
        listeners[key as string],
        modifiers as AddEventListenerOptions
      )
    }
  }

  const _removeActivatorEvents = ($listeners?: Listeners) => {
    if (!props.activator || !_activatorElement.value) return

    const listeners = $listeners || _listeners.value

    const keys = Object.keys(listeners).map((key) => {
      const [type, modifiers] = parseEventName(key)
      return [key, type, modifiers]
    })

    for (const [key, type, modifiers] of keys) {
      _activatorElement.value.removeEventListener(
        type as string,
        listeners[key as string],
        modifiers as AddEventListenerOptions
      )
    }
  }

  const _getActivator = () => {
    if (_activatorElement.value) return _activatorElement.value

    if (!props.activator) return

    let _activator: HTMLElement | null = null

    if (typeof props.activator === 'string') {
      // Selector
      _activator = document.querySelector(props.activator)
    } else if (_isElement((props.activator as ComponentPublicInstance).$el)) {
      // Component
      _activator = (props.activator as ComponentPublicInstance).$el
    } else if (_isElement(props.activator)) {
      // HTMLElement | Element
      _activator = props.activator as HTMLElement
    }

    _activatorElement.value = _activator

    return _activator
  }

  const _isElement = (el: unknown) => {
    return el && (el instanceof HTMLElement || el instanceof Element)
  }

  return {
    isActive,
    setActivatorAttrs,
    setActivatorListeners,
    genActivatorAttributes,
    genActivatorListeners,
    genActivator,
    focusActivator,
  }
}
