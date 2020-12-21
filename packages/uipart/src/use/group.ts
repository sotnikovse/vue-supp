import { ref, computed, onMounted, SetupContext } from 'vue'

import { SetupProps } from '../../types'

import { deepEqual } from '../util/check'
import { wrapInArray } from '../util/array'

export const useGroupProps = () => {
  return {
    modelValue: {
      required: false,
    },
    multiple: Boolean,
    mandatory: {
      type: Boolean,
      default: true,
    },
    continuous: Boolean,
    max: {
      type: [Number, String],
      default: null,
    },
  }
}

export interface GroupProps {
  modelValue: any
  multiple?: boolean
  mandatory?: boolean
  continuous?: boolean
  max?: number
}
/**
 * @param {Object} props The props of use-case.
 * @prop {undefined} [props.modelValue]
 * @prop {boolean} [props.multiple]
 * @prop {boolean} [props.mandatory]
 * @prop {boolean} [props.continuous]
 * @prop {number} [props.max]
 * @param {Object} context The setup context.
 */
export const useGroup = (props: GroupProps | SetupProps, { emit }: SetupContext) => {
  const items = ref<any[]>([])

  const internal = ref(props.modelValue)

  const selected = computed({
    get: () => {
      const v = internal.value
      if (!v) return []
      return getIds(wrapInArray(v))
    },
    set: (val) => {
      internal.value = val
      const arr = getValues(val)
      emit('update:modelValue', props.multiple ? arr : arr[0])
    },
  })

  const hasActiveItems = computed(() => {
    return Boolean(items.value.find(item => !item.disabled))
  })

  const hasNext = computed(() => {
    if (props.multiple) return false
    const index = selectedIndex.value ?? -1

    return props.continuous || index < items.value.length - 1
  })

  const hasPrev = computed(() => {
    if (props.multiple) return false

    const index = selectedIndex.value ?? -1
    return props.continuous || index > 0
  })

  const selectedIndex = computed(() => {
    if (props.multiple) return

    return items.value.findIndex((item) => isSelected(item.id))
  })

  const register = (item: any, index: any) => {
    if (index != null) items.value.splice(index, 0, item)
    else items.value.push(item)
  }

  const unregister = (id: string) => {
    selected.value = selected.value.filter(v => v !== id)

    if (props.mandatory && !selected.value.length) {
      selected.value = [items.value[items.value.length - 1].id]
    }

    const index = items.value.findIndex(item => item.id === id)
    items.value.splice(index, 1)
  }

  onMounted(() => {
    // If mandatory and nothing is selected, then select first non-disabled item
    const item = items.value.find(item => !item.disabled)
    if (item && props.mandatory && !selected.value.length) {
      selected.value = [item.id]
    }
  })

  const select = (id: string, val: any) => {
    const item = items.value.find(item => item.id === id)
    if (val && item.disabled) return

    if (props.multiple) {
      const internalValue = selected.value.slice()
      const index = internalValue.findIndex(v => v === id)

      // We can't remove value if group is
      // mandatory, value already exists,
      // and it is the only value
      if (
        props.mandatory &&
        index > -1 &&
        internalValue.length <= 1
      ) return

      // We can't add value if it would
      // cause max limit to be exceeded
      if (
        props.max != null &&
        index < 0 &&
        internalValue.length + 1 > props.max
      ) return

      if (index < 0 && val) internalValue.push(id)
      else if (index >= 0 && !val) internalValue.splice(index, 1)

      selected.value = internalValue
    } else {
      if (props.mandatory && selected.value.includes(id)) return

      selected.value = val ? [id] : []
    }
  }

  const getOffsetId = (offset: number) => {
    // getting an offset from selected value obviously won't work with multiple values
    if (props.multiple) console.warn('This method is not supported when using "multiple" prop')

    // If there is nothing selected, then next value is first item
    if (!selected.value.length) return items.value[0].id

    const currentId = selected.value[0]
    const currentIndex = items.value.findIndex(i => i.id === currentId)
    const newIndex = (currentIndex + offset) % items.value.length

    return items.value[newIndex].id
  }

  const prev = () => {
    selected.value = [getOffsetId(items.value.length - 1)]
  }

  const next = () => {
    selected.value = [getOffsetId(1)]
  }

  const step = (steps: number) => {
    selected.value = [getOffsetId(steps)]
  }

  const isSelected = (id: string) => selected.value.includes(id)

  const getIds = (values: any) => {
    const ids = []

    for (const item of items.value) {
      if (
        (item.value != null && values.find((value: any) => deepEqual(value, item.value))) ||
        values.includes(item.id)
      ) {
        ids.push(item.id)
      }
    }

    return ids
  }

  const getValues = (ids: any[]) => {
    const values = []

    for (const item of items.value) {
      if (ids.includes(item.id)) {
        values.push(item.value != null ? item.value : item.id)
      }
    }

    return values
  }

  const state = {
    selected,
    selectedIndex,
    hasActiveItems,
    hasNext,
    hasPrev,
    register,
    unregister,
    select,
    prev,
    next,
    step,
    isSelected,
    getIds,
    getValues,
  }

  return state
}
