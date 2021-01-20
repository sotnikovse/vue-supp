import { mount, VueWrapper } from '@vue/test-utils'
import { h, defineComponent, readonly, toRefs, PropType } from 'vue'
import { useClientRect } from '../clientRect'

describe('Dimensions', () => {
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
    setup (props) {
      const { element, hasResizeListener, shouldRound } = toRefs(props)

      const useCaseProps = readonly({
        element,
        hasResizeListener,
        shouldRound,
      })

      const { clientRect, updateClientRect } = useClientRect(useCaseProps)

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
