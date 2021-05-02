import { mount, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, reactive } from 'vue'
import { useLazyContentProps, useLazyContent } from '../lazyContent'

describe('Lazy content', () => {
  describe('useLazyContentProps', () => {
    it('shoud set correct props', () => {
      expect(useLazyContentProps().eager).toBeDefined()
      expect(useLazyContentProps().disabled).toBeDefined()
    })
  })

  describe('useLazyContent', () => {
    let mountFunction: (options?: Record<string, unknown>) => VueWrapper<any>

    const component = defineComponent({
      props: {
        ...useLazyContentProps(),
        isActive: Boolean,
      },
      setup(props) {
        const { isBooted, hasContent, showLazyContent } = useLazyContent(props)

        return {
          isBooted,
          hasContent,
          showLazyContent,
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

    it('should watch isActive prop and activate isBooted and content', async () => {
      const props = reactive({
        isActive: false,
      })

      const wrapper = mountFunction({ props })

      await wrapper.setProps({ isActive: true })

      expect(wrapper.vm.isBooted).toBe(true)
      expect(wrapper.vm.hasContent).toBe(true)

      await wrapper.setProps({ isActive: false })

      expect(wrapper.vm.hasContent).toBe(true)
    })

    it('should watch eager prop and activate content', async () => {
      const props = reactive({
        eager: false,
      })

      const wrapper = mountFunction({ props })

      await wrapper.setProps({ eager: true })

      expect(wrapper.vm.isBooted).toBe(false)
      expect(wrapper.vm.hasContent).toBe(true)
    })

    it('should not boot on disabled prop', async () => {
      const props = reactive({
        isActive: false,
        disabled: true,
      })

      const wrapper = mountFunction({ props })
      expect(wrapper.vm.isBooted).toBe(false)

      await wrapper.setProps({ isActive: true, disabled: true })

      expect(wrapper.vm.isBooted).toBe(false)
    })
  })
})
