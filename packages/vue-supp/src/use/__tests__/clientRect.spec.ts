import { mount, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, PropType } from 'vue'
import { useClientRect } from '../clientRect'

describe('useClientRect', () => {
  let mountFunction: (options?: Record<string, unknown>) => VueWrapper<any>

  const component = defineComponent({
    props: {
      element: {
        type: Object as PropType<Element | HTMLElement>,
        default: () => ({} as HTMLElement),
      },
      hasResizeListener: Boolean,
      shouldRound: Boolean,
    },
    setup(props) {
      const { clientRect, updateClientRect } = useClientRect(props)

      return {
        clientRect,
        updateClientRect,
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

  it('should update clientRect', async () => {
    const props = {
      element: {
        getBoundingClientRect: () => {
          return {
            width: 100,
            height: 50,
            top: 50,
            left: 0,
            right: 100,
            bottom: 100,
            x: 0,
            y: 0,
          }
        },
      },
    }

    const wrapper = mountFunction({ props })

    const clientRect = {
      width: 1000,
      height: 500,
      top: 500,
      left: 0,
      right: 1000,
      bottom: 1000,
      x: 0,
      y: 0,
    }

    await wrapper.setProps({
      element: {
        getBoundingClientRect: () => {
          return clientRect
        },
      },
    })

    wrapper.vm.updateClientRect()
    expect(wrapper.vm.clientRect).toEqual(clientRect)
  })

  it('should round clientRect', async () => {
    const props = {
      element: {
        getBoundingClientRect: () => {
          return {
            width: 100.1,
            height: 50.5,
            top: 50.123,
            left: 0.987,
            right: 100.45,
            bottom: 100.5,
            x: 0.1,
            y: 0.6,
          }
        },
      },
      shouldRound: true,
    }

    const wrapper = mountFunction({ props })

    expect(wrapper.vm.clientRect).toEqual({
      width: 100,
      height: 51,
      top: 50,
      left: 1,
      right: 100,
      bottom: 101,
      x: 0,
      y: 1,
    })
  })

  it('should add/remove resize event listener', async () => {
    const props = {
      element: {
        getBoundingClientRect: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
      },
      hasResizeListener: true,
    }

    const addEventListener = jest.spyOn(window, 'addEventListener')
    const removeEventListener = jest.spyOn(window, 'removeEventListener')

    const wrapper = mountFunction({ props })

    expect(addEventListener).toHaveBeenCalledTimes(1)

    wrapper.unmount()
    expect(removeEventListener).toHaveBeenCalledTimes(1)
  })
})
