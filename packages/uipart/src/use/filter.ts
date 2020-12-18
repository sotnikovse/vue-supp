import { ref, computed, watch, PropType } from 'vue'

import { SetupProps, SetupContext } from '../types'

import { getPropertyFromItem } from '../util/object'

const EVENT = 'update:search'

export const useFilterProps = () => {
  return {
    search: {
      type: String as PropType<string | null | undefined>,
      default: null,
    },
    noFilter: Boolean,
    noDataText: String,
    noResultText: String,
    items: {
      type: Array,
      default: () => [],
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    itemText: {
      type: String,
      default: 'text',
    },
    filter: {
      type: Function,
      default: (_: any, queryText: string, itemText: string) => {
        return itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) > -1
      },
    },
  }
}

/**
 * @param {boolean} [returnArray=true] Return Array or Object emits.
 */
export const useFilterEmits = (returnArray: boolean = true) => {
  return returnArray ? [EVENT] : {
    [EVENT]: () => true,
  }
}

export interface FilterProps {
  search: string | null | undefined
  items: any[]
  itemText: string
  itemValue: string
  noFilter?: boolean
  filter: Function
}
/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {string} props.search The search input.
 * @param {Array} props.items The items.
 * @param {string} [props.itemText] The item text key.
 * @param {string} [props.itemValue] The item value key.
 * @param {boolean} [props.noFilter] Prevent filter.
 * @param {Function} [props.filter] Filter function.
 * @param {Object} context The context of use-case.
 * @param {Function} context.emit The emit function.
 */
export const useFilter = (props: FilterProps | SetupProps, { emit }: SetupContext) => {
  const search = ref(props.search)

  const searchIsDirty = computed(() => {
    return search.value != null && search.value !== ''
  })

  const computedItems = computed(() => {
    return props.items || []
  })

  const filteredItems = computed(() => {
    if (!searchIsDirty.value || props.noFilter) return computedItems.value
    return computedItems.value.filter((item: any) => {
      const value = getPropertyFromItem(item, props.itemText)
      const text = value != null ? String(value) : ''
      const queryText = String(search.value)

      return props.filter(item, queryText, text)
    })
  })

  watch(() => props.search, (val) => {
    search.value = val
  })

  watch(search, (val) => {
    emit(EVENT, val)
  })

  const getText = (item: any) => {
    return getPropertyFromItem(item, props.itemText, item)
  }

  const getValue = (item: any) => {
    return getPropertyFromItem(item, props.itemValue, getText(item))
  }

  const clearSearch = () => {
    search.value = null
  }

  return {
    search,
    searchIsDirty,
    filteredItems,
    getText,
    getValue,
    clearSearch,
  }
}
