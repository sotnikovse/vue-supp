import { mount, VueWrapper } from '@vue/test-utils'
import { h, reactive, defineComponent } from 'vue'
import { useFilterProps, useFilterEmits, useFilter } from '../filter'

describe('Filter', () => {
  let mountFunction: (options?: Record<string, unknown>) => VueWrapper<any>
  const mockItems = [
    {
      text: 'Great Britain',
      value: 'GB',
    },
    {
      text: 'France',
      value: 'FR',
    },
    {
      text: 'People Republic of China',
      value: 'CN',
    },
    {
      text: 'Russian Federation',
      value: 'RU',
    },
    {
      text: 'Ukraine',
      value: 'UA',
    },
    {
      text: 'Peru',
      value: 'PE',
    },
  ]
  const component = defineComponent({
    props: useFilterProps(),
    emits: useFilterEmits(),
    setup (props, { emit }) {
      const {
        search,
        searchIsDirty,
        filteredItems,
        getText,
        getValue,
        clearSearch,
      } = useFilter(reactive(props), { emit })

      return {
        search,
        searchIsDirty,
        filteredItems,
        getText,
        getValue,
        clearSearch,
      }
    },
    render: () => h('div'),
  })

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(component, {
        ...options,
      })
    }
  })

  it('should emit update:search and clear search', async () => {
    const wrapper = mountFunction({
      props: {
        search: undefined,
      },
    })

    await wrapper.setProps({
      search: 'RU',
    })

    expect(wrapper.emitted()['update:search'][0]).toEqual(['RU'])
  })

  it('should filter array items', async () => {
    const items = mockItems.map(item => item.text)
    const props = reactive<Record<string, any>>({
      search: undefined,
      items,
    })
    const wrapper = mountFunction({
      props,
    })

    expect(wrapper.vm.filteredItems.length).toBe(6)

    props.search = 'RU'
    await wrapper.setProps(props)

    expect(wrapper.vm.filteredItems.length).toBe(2)
  })

  it('should filter array of objects items', async () => {
    const props = reactive<Record<string, any>>({
      search: undefined,
      items: mockItems,
    })
    const wrapper = mountFunction({
      props,
    })

    expect(wrapper.vm.filteredItems.length).toBe(6)

    props.search = 'RU'
    await wrapper.setProps(props)

    expect(wrapper.vm.filteredItems.length).toBe(2)
  })

  it('should no filter', async () => {
    const props = reactive<Record<string, any>>({
      search: undefined,
      items: mockItems,
      noFilter: true,
    })
    const wrapper = mountFunction({
      props,
    })

    expect(wrapper.vm.filteredItems.length).toBe(6)

    props.search = 'RU'
    await wrapper.setProps(props)

    expect(wrapper.vm.filteredItems.length).toBe(6)
  })

  it('should filter array of objects with custom text and value', async () => {
    const props = reactive<Record<string, any>>({
      search: undefined,
      items: mockItems.map(item => {
        return {
          name: item.text,
          code: item.value,
        }
      }),
      itemText: 'name',
      itemValue: 'code',
    })
    const wrapper = mountFunction({
      props,
    })

    expect(wrapper.vm.filteredItems.length).toBe(6)

    props.search = 'RU'
    await wrapper.setProps(props)

    expect(wrapper.vm.filteredItems.length).toBe(2)
  })

  it('should use custom filter', async () => {
    const props = reactive<Record<string, any>>({
      search: undefined,
      items: mockItems,
      filter: (item: any, queryText: string) => {
        return item.value === queryText
      },
    })
    const wrapper = mountFunction({
      props,
    })

    expect(wrapper.vm.filteredItems.length).toBe(6)

    props.search = 'RU'
    await wrapper.setProps(props)

    expect(wrapper.vm.filteredItems.length).toBe(1)
  })

  it('should get text and value of item', async () => {
    const props = reactive<Record<string, any>>({
      search: undefined,
      items: mockItems,
    })
    const wrapper = mountFunction({
      props,
    })

    const item = wrapper.vm.filteredItems[0]

    expect(wrapper.vm.getText(item)).toBe('Great Britain')
    expect(wrapper.vm.getValue(item)).toBe('GB')
  })
})
