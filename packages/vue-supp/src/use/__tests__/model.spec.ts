import { mount, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, nextTick } from 'vue'
import { useModel } from '../model'

describe('useModel', () => {
  let mountFunction: (options?: Record<string, unknown>) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = ({ props, emits, prop }: any, options = {}) => {
      const component = defineComponent({
        props,
        emits,
        setup(props) {
          const model = useModel(props, prop)

          return {
            model,
          }
        },
        render: () => h('div'),
      })

      return mount(component, {
        ...options,
      })
    }
  })

  it('should watch prop change', async () => {
    const PROP = 'modelValue'
    const EVENT = 'update:modelValue'

    const wrapper = mountFunction({
      prop: PROP,
      props: {
        [PROP]: {
          type: Boolean,
          default: false,
        },
      },
      emits: [EVENT],
    })

    await wrapper.setProps({ [PROP]: true })
    expect(wrapper.vm.model).toBe(true)
    expect(wrapper.emitted()[EVENT].length).toBe(1)

    await wrapper.setProps({ [PROP]: false })
    expect(wrapper.vm.model).toBe(false)
    expect(wrapper.emitted()[EVENT].length).toBe(2)
  })

  it('should emit changes on proxy update', async () => {
    const PROP = 'foo'
    const EVENT = 'update:foo'

    const wrapper = mountFunction({
      prop: PROP,
      props: {
        [PROP]: String,
      },
      emits: [EVENT],
    })

    wrapper.vm.model = 'internal'
    await nextTick()

    expect(wrapper.emitted()[EVENT][0]).toStrictEqual(['internal'])
  })

  it('should emit value once', async () => {
    const PROP = 'foo'
    const EVENT = 'update:foo'

    const wrapper = mountFunction({
      prop: PROP,
      props: {
        [PROP]: {
          type: String,
          default: 'foo',
        },
      },
      emits: [EVENT],
    })

    await wrapper.setProps({ [PROP]: 'foo' })
    wrapper.vm.model = 'foo'
    await nextTick()
    await wrapper.setProps({ [PROP]: 'bar' })

    expect(wrapper.emitted()[EVENT].length).toBe(1)
  })
})
