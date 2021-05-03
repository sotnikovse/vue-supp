import { computed, PropType } from 'vue'

import getPropertyFromItem from '../utils/getPropertyFromItem'

import { useModel } from './model'

export interface FilterProps {
  search: string | null | undefined
  items: any[]
  itemText: string
  itemValue: string
  noDataText?: string
  noResultText?: string
  noFilter?: boolean
  filter: (item: any, queryText: string, itemText: string) => boolean
}

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
      type: Array as PropType<any[]>,
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
      type: Function as PropType<
        (item: any, queryText: string, itemText: string) => boolean
      >,
      default: (item: any, queryText: string, itemText: string) => {
        return (
          itemText.toLocaleLowerCase().indexOf(queryText.toLocaleLowerCase()) >
          -1
        )
      },
    },
  }
}

export const useFilterEmits = (): string[] => {
  return [EVENT]
}

export const useFilter = (props: FilterProps) => {
  const search = useModel(props, 'search')

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
