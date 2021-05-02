import {
  h,
  ref,
  reactive,
  toRefs,
  defineComponent,
  Transition,
  Teleport,
  withDirectives,
  vShow,
  nextTick,
  SetupContext,
} from 'vue'
import {
  useActivator,
  useActivatorProps,
  useLazyContent,
  useLazyContentProps,
  useAttach,
  useAttachProps,
  dimensions,
  ClickOutside,
} from 'vue-supp'

const { useDimensionsProps, useDimensions } = dimensions('width', 'maxWidth')

export default defineComponent({
  props: {
    ...useActivatorProps(),
    ...useLazyContentProps(),
    ...useAttachProps(),
    ...useDimensionsProps(),
    openOnHover: {
      type: Boolean,
      default: false,
    },
    openOnFocus: {
      type: Boolean,
      default: false,
    },
    hideOverlay: Boolean,
    fullscreen: Boolean,
  },

  setup(props, { emit, slots }) {
    const contentElement = ref<HTMLElement | null>(null)
    const overlayElement = ref<HTMLElement | null>(null)
    const contentWrapperElement = ref<HTMLElement | null>(null)

    const { disabled, attach, width, maxWidth } = toRefs(props)

    const { isActive, genActivator, getActivator } = useActivator(props, {
      emit,
      slots,
    } as SetupContext)

    const lazyContentProps = reactive({
      isActive: isActive,
      disabled,
    })
    const { showLazyContent } = useLazyContent(lazyContentProps)

    const attachProps = reactive({
      attach,
    })
    const { target } = useAttach(attachProps)

    const dimensionsProps = reactive({
      width,
      maxWidth,
    })
    const { dimensionsStyles } = useDimensions(dimensionsProps)

    const genContent = () => {
      const content = genInnerContent()

      return h(
        Transition,
        {
          appear: true,
          enterActiveClass: 'transition ease-out-quart duration-300',
          enterFromClass:
            'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
          enterToClass: 'opacity-100 translate-y-0 sm:scale-100',
          leaveActiveClass: 'transition ease-out-quart duration-200',
          leaveFromClass: 'opacity-100 translate-y-0 sm:scale-100',
          leaveToClass: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        },
        {
          default: () => content,
        }
      )
    }

    const genInnerContent = () => {
      const data = {
        ref: contentElement,
        class: {
          'text-left bg-white': true,
          'transform transition-transform': true,
          'inline-block overflow-auto pointer-events-auto max-h-full': true,
          'focus:outline-none shadow-xl': true,
          'w-full h-full': props.fullscreen,
          'rounded-lg m-4 sm:m-8': !props.fullscreen,
        },
        role: 'dialog',
        ariaModal: true,
        tabIndex: isActive.value ? 0 : undefined,
        style: {},
        onKeydown: () => {
          isActive.value = false
          const activator = getActivator()
          nextTick(() => activator && activator.focus())
        },
      }

      if (!props.fullscreen) {
        data.style = dimensionsStyles.value
      }

      return withDirectives(
        h('div', data, slots.default ? slots.default() : undefined),
        [
          [
            ClickOutside,
            {
              handler: () => {
                isActive.value = false
              },
              closeConditional: (e: Event) => {
                const target = e.target as HTMLElement
                return !(
                  !isActive.value ||
                  contentElement.value?.contains(target) ||
                  (overlayElement.value &&
                    target &&
                    !overlayElement.value.contains(target))
                )
              },
              include: () => [contentElement.value],
            },
          ],
          [vShow, isActive.value],
        ]
      )
    }

    const genOverlay = () => {
      if (props.hideOverlay || props.fullscreen) return undefined

      const overlay = h(
        'div',
        {
          ref: overlayElement,
          class: 'fixed inset-0 transition-opacity pointer-events-auto',
          ariaHidden: true,
        },
        h('div', { class: 'absolute inset-0 bg-gray-500 opacity-75' })
      )

      return h(
        Transition,
        {
          enterActiveClass: 'transition ease-out-quart duration-300',
          enterFromClass: 'opacity-0',
          enterToClass: 'opacity-100',
          leaveActiveClass: 'transition ease-out-quart duration-200',
          leaveFromClass: 'opacity-100',
          leaveToClass: 'opacity-0',
        },
        {
          default: () => withDirectives(overlay, [[vShow, isActive.value]]),
        }
      )
    }

    const genModal = () => {
      const modal = h(
        'div',
        {
          class: 'fixed z-10 inset-0 pointer-events-none',
        },
        h(
          'div',
          {
            ref: contentWrapperElement,
            class:
              'flex items-center justify-center min-h-screen h-full w-full',
          },
          [genOverlay(), genContent()]
        )
      )

      // TODO
      return showLazyContent(() => {
        return h(
          Teleport,
          {
            to: target.value,
            disabled: !target.value,
          },
          modal
        )
      })
    }

    return {
      genActivator,
      genModal,
    }
  },

  render() {
    return h('div', {}, [this.genActivator(), this.genModal()])
  },
})
