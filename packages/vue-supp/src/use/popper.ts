import { ref, onMounted, watchEffect, ComponentPublicInstance } from 'vue'
import { createPopper, Options, VirtualElement } from '@popperjs/core'

export function usePopper(
  options?: Partial<Options>,
  isVirtual: boolean = false
) {
  const reference = ref<Element | VirtualElement | ComponentPublicInstance>()
  const popper = ref<HTMLElement | ComponentPublicInstance>()

  onMounted(() => {
    watchEffect(
      (onInvalidate) => {
        if (!popper.value) return
        if (!reference.value) return

        const popperEl =
          (popper.value as ComponentPublicInstance).$el || popper.value
        const referenceEl =
          (reference.value as ComponentPublicInstance).$el || reference.value

        if (!(popperEl instanceof HTMLElement)) return
        if (!(!isVirtual && referenceEl instanceof Element)) return

        const { destroy } = createPopper(referenceEl, popperEl, options)

        onInvalidate(() => {
          destroy && destroy()
        })
      },
      // fire after component updates so you can access the updated DOM
      { flush: 'post' }
    )
  })

  return {
    reference,
    popper,
  }
}
