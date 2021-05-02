import { createPopper, VariationPlacement } from '@popperjs/core'
import {
  h,
  ref,
  toRefs,
  computed,
  onUnmounted,
  Teleport,
  Transition,
  withDirectives,
  vShow,
  reactive,
  VNode,
  PropType,
} from 'vue'

import { useAttachProps, useAttach, AttachProps } from './attach'
import { dimensions, DimensionProps } from './dimensions'

const { useDimensionsProps, useDimensions } = dimensions()

export interface PopperProps extends AttachProps, DimensionProps {
  placement?: VariationPlacement
  left?: boolean
  top?: boolean
  right?: boolean
  bottom?: boolean
  fixed?: boolean
  disabled?: boolean
  allowOverflow: boolean
  arrow: boolean
  skidding: string | number
  distance: string | number
  transition?: string | Record<string, string>
  origin?: string
  zIndex?: string | number
  boxClass?: string
}

export const usePopperProps = () => {
  return {
    ...useAttachProps(),
    ...useDimensionsProps(),
    placement: {
      type: String as PropType<VariationPlacement | undefined>,
      validator: (value: string) => {
        return [
          'auto',
          'auto-start',
          'auto-end',
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'right',
          'right-start',
          'right-end',
          'left',
          'left-start',
          'left-end',
        ].includes(value)
      },
    },
    left: Boolean,
    top: Boolean,
    right: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    disabled: Boolean,
    allowOverflow: {
      type: Boolean,
      default: false,
    },
    arrow: {
      type: Boolean,
      default: true,
    },
    skidding: {
      type: [String, Number] as PropType<string | number>,
      default: 0,
    },
    distance: {
      type: [String, Number] as PropType<string | number>,
      default: 0,
    },
    transition: {
      type: [String, Object] as PropType<string | Record<string, string>>,
      default: {
        enterActiveClass: 'transition-opacity ease-quart duration-200',
        enterFromClass: 'opacity-0',
        leaveActiveClass: 'transition-opacity ease-quart duration-150',
        leaveToClass: 'opacity-0',
      },
    },
    origin: String,
    zIndex: {
      type: [Number, String] as PropType<number | string>,
      default: 10,
    },
    boxClass: {
      type: String,
      default: '',
    },
  }
}

export const usePopper = (props: PopperProps) => {
  const instance = ref<any>(null)
  const isVisible = ref<boolean>(false) // visibility for root element, for lazy content
  const isContentVisible = ref<boolean>(false) // visibility of content, for toggling animation
  const wrapperElement = ref<HTMLElement>()
  const boxOffsetElement = ref<HTMLElement>()

  const {
    attach,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
  } = toRefs(props)

  const attachProps = reactive({
    attach,
  })
  const { target } = useAttach(attachProps)
  const measureProps = reactive({
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
  })
  const { dimensionsStyles } = useDimensions(measureProps)

  const placement = computed(() => {
    return props.placement
      ? props.placement
      : props.left
      ? 'left'
      : props.right
      ? 'right'
      : props.bottom
      ? 'bottom'
      : 'top'
  })

  const strategy = computed(() => (props.fixed ? 'fixed' : 'absolute'))

  const offset = computed(() => {
    const skidding = parseInt(props.skidding) || 0
    let distance = parseInt(props.distance) || 0
    if (props.arrow && !distance) {
      distance = 8
    }
    return [skidding, distance]
  })

  onUnmounted(() => {
    destroy()
  })

  const create = (
    reference: HTMLElement | undefined,
    popper: HTMLElement | undefined
  ) => {
    destroy()
    if (!reference || !popper) return
    const options = {
      arrow: props.arrow,
      allowOverflow: props.allowOverflow,
      offset: offset.value,
    }
    const modifiers = genModifiers(options)
    const _instance = createPopper(reference, popper, {
      modifiers,
      placement: placement.value,
      strategy: strategy.value,
    })
    instance.value = _instance
    return _instance
  }

  const destroy = () => {
    if (instance.value) {
      instance.value.destroy()
      instance.value = null
    }
  }

  const genArrow = () => {
    return props.arrow
      ? h('div', {
          class: 'popper__arrow',
          'data-popper-arrow': '',
        })
      : null
  }

  // Need to keep visible on cursor move
  // TODO: replace with mouse move
  const genBoxOffset = () => {
    const offsetValue = offset.value[1]
    if (offsetValue) {
      const referenceElement =
        instance.value && instance.value.state.elements.reference
      if (!referenceElement) return undefined
      const statePlacement =
        (instance.value && instance.value.state.placement) || placement.value
      const basePlacement = statePlacement.split('-')[0]
      const styleProp =
        basePlacement === 'top'
          ? 'bottom'
          : basePlacement === 'bottom'
          ? 'top'
          : basePlacement === 'left'
          ? 'right'
          : basePlacement === 'right'
          ? 'top'
          : undefined
      const styles: any = {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }
      if (styleProp) {
        styles[styleProp] = `-${offsetValue}px`
      }
      return h('div', {
        ref: boxOffsetElement,
        'data-popper-box-offset': '',
        style: styles,
        onMouseleave: (e: MouseEvent) => {
          if (!referenceElement.value) return
          if (
            !referenceElement.value.contains(e?.relatedTarget) &&
            !wrapperElement.value?.contains(e.relatedTarget as HTMLElement)
          ) {
            isContentVisible.value = false
          }
        },
      })
    }
    return undefined
  }

  const genBox = (data: any = {}, children: (VNode | undefined)[] = []) => {
    const dataClasses =
      data.class && Array.isArray(data.class)
        ? data.class
        : data.class
        ? [data.class]
        : []
    const dataStyles = data.style ? data.style : {}
    const boxData = {
      ...data,
      class: [
        'popper__box',
        ...dataClasses,
        props.boxClass ? props.boxClass.trim() : undefined,
      ],
      style: {
        ...dimensionsStyles.value,
        ...dataStyles,
      },
    }

    const transition =
      typeof props.transition === 'string'
        ? { name: props.transition }
        : props.transition
        ? { ...props.transition }
        : {}

    return h(
      Transition,
      {
        onBeforeEnter(el: any) {
          if (props.origin) {
            el.style.transformOrigin = props.origin
            el.style.webkitTransformOrigin = props.origin
          }
        },
        onAfterLeave() {
          // hide popper container after transition end
          isVisible.value = false
          destroy()
        },
        ...transition,
      },
      {
        default: () => {
          return withDirectives(h('div', boxData, [...children, genArrow()]), [
            [vShow, isContentVisible.value],
          ])
        },
      }
    )
  }

  const genWrapper = (
    data: any = {},
    children: any,
    directives: any[] = []
  ) => {
    return h(
      Teleport,
      {
        to: target.value,
        disabled: !target.value,
      },
      withDirectives(
        h(
          'div',
          {
            ...data,
            ref: wrapperElement,
            style: {
              zIndex: props.zIndex,
            },
            'data-popper-root': '',
          },
          children
        ),
        [...directives, [vShow, isVisible.value]]
      )
    )
  }

  return {
    instance,
    placement,
    strategy,
    offset,
    isVisible,
    isContentVisible,
    wrapperElement,
    boxOffsetElement,
    create,
    destroy,
    genArrow,
    genBox,
    genBoxOffset,
    genWrapper,
  }
}

// Custom modifier for arrow hide
const applyArrowHide = {
  name: 'applyArrowHide',
  enabled: true,
  phase: 'write',
  fn(data: any) {
    const state = data.state as any
    const { arrow, reference, popper } = state.elements

    const basePlacement = state.placement.split('-')[0]

    if (arrow) {
      let isCenterY = true
      if (basePlacement === 'left' || basePlacement === 'right') {
        const interactiveBorder = 2
        const offsetData = state.modifiersData.offset
        const popperRect = popper.getBoundingClientRect()
        const referenceRect = reference.getBoundingClientRect()
        const leftDistance = basePlacement === 'right' ? offsetData.left.x : 0
        const rightDistance = basePlacement === 'left' ? offsetData.right.x : 0
        const exceedsLeft = popperRect.left + leftDistance - interactiveBorder
        const exceedsRight =
          popperRect.right + rightDistance + interactiveBorder
        const arrowXPosition =
          basePlacement === 'left'
            ? referenceRect.left
            : basePlacement === 'right'
            ? referenceRect.right
            : 0
        const popperXPosition =
          basePlacement === 'left'
            ? exceedsRight
            : basePlacement === 'right'
            ? exceedsLeft
            : 0
        isCenterY =
          popperXPosition - 8 < arrowXPosition &&
          popperXPosition + 8 > arrowXPosition
      }
      if (state.modifiersData.arrow.centerOffset !== 0 || !isCenterY) {
        arrow.setAttribute('data-hide', '')
      } else {
        arrow.removeAttribute('data-hide')
      }
    }
  },
}

const genModifiers = (options: any) => {
  const modifiers: any = [
    {
      name: 'preventOverflow',
      options: {
        altAxis: !options.allowOverflow,
        rootBoundary: 'document',
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5,
        },
      },
    },
    {
      name: 'offset',
      options: {
        offset: options.offset,
      },
    },
    {
      name: 'flip',
      enabled: !options.allowOverflow,
      options: {
        padding: 5,
      },
    },
  ]
  if (options.arrow) {
    modifiers.push(
      {
        name: 'arrow',
        options: {
          padding: 8,
        },
      },
      applyArrowHide
    )
  }
  return modifiers
}
