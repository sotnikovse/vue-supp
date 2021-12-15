import { mount, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, reactive, toRef } from 'vue'
import { makeLazyProps, useLazy } from '../lazy'

describe('lazyContent.ts', () => {
  describe('makeLazyProps', () => {
    it('should set correct props', () => {
      expect(makeLazyProps().eager).toBeDefined()
    })
  })

  describe('useLazy', () => {
    let mountFunction: (options?: Record<string, unknown>) => VueWrapper<any>

    const component = defineComponent({
      props: {
        ...makeLazyProps(),
        isActive: Boolean,
      },
      setup(props) {
        const isActive = toRef(props, 'isActive')

        const { isBooted, hasContent, onAfterLeave } = useLazy(props, isActive)

        return {
          isBooted,
          hasContent,
          onAfterLeave,
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

    it('should activate isBooted and content', async () => {
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
  })
})
