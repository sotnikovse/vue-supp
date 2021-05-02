import { mount, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, readonly, toRefs } from 'vue'
import { toggle } from '../toggle'

describe('Toggle', () => {
  describe('useToggleProps & useToggleEmits', () => {
    it('shoud set correct props', () => {
      expect(toggle().useToggleProps().modelValue).toBeDefined()
      expect(toggle('value').useToggleProps().value).toBeDefined()

      const arrayEmits: string[] = toggle().useToggleEmits()
      expect(arrayEmits.length).toBe(1)
      expect(arrayEmits[0]).toBe('update:modelValue')
    })
  })

  describe('useToggle & toggle', () => {
    let mountFunction: (options?: Record<string, unknown>) => VueWrapper<any>

    beforeEach(() => {
      mountFunction = ({ prop, props, emits, useCase }: any, options = {}) => {
        const component = defineComponent({
          props,
          emits,
          setup(props, { emit }) {
            const propsRefs = toRefs(props)
            const useCaseProps = readonly({
              modelValue: propsRefs[prop],
            })
            const { isActive } = useCase(useCaseProps, { emit })

            return {
              isActive,
            }
          },
          render: () => h('div'),
        })

        return mount(component, {
          ...options,
        })
      }
    })

    it('should be reactive', async () => {
      const PROP = 'modelValue'
      const EVENT = 'update:modelValue'
      const { useToggleProps, useToggleEmits, useToggle } = toggle()

      const wrapper = mountFunction({
        prop: PROP,
        props: useToggleProps(),
        emits: useToggleEmits(),
        useCase: useToggle,
      })

      await wrapper.setProps({ [PROP]: true })
      expect(wrapper.vm.isActive).toBe(true)

      await wrapper.setProps({ [PROP]: false })
      expect(wrapper.vm.isActive).toBe(false)

      expect(wrapper.emitted()[EVENT].length).toBe(2)
    })

    it('should be used with custom prop and event', async () => {
      const PROP = 'value'
      const EVENT = 'update:value'

      const {
        useToggleProps: useCustomToggleProps,
        useToggleEmits: useCustomToggleEmits,
        useToggle: useCustomToggle,
      } = toggle(PROP, EVENT)

      const wrapper = mountFunction({
        prop: PROP,
        props: useCustomToggleProps(),
        emits: useCustomToggleEmits(),
        useCase: useCustomToggle,
      })

      await wrapper.setProps({ [PROP]: true })
      expect(wrapper.vm.isActive).toBe(true)

      await wrapper.setProps({ [PROP]: false })
      expect(wrapper.vm.isActive).toBe(false)

      expect(wrapper.emitted()[EVENT].length).toBe(2)
    })
  })
})
