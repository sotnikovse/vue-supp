import {
  ref,
  shallowRef,
  onMounted,
  watchEffect,
  ComponentPublicInstance,
} from 'vue'
import { createPopper, Options, VirtualElement, Instance } from '@popperjs/core'

export type PopperOptions = Options

export function usePopper(options?: Partial<PopperOptions>, isVirtual = false) {
  const instance = shallowRef<Instance>()
  const reference = ref<Element | VirtualElement | ComponentPublicInstance>()
  const popper = ref<HTMLElement | ComponentPublicInstance>()

  onMounted(() => {
    watchEffect(
      (onInvalidate) => {
        if (!popper.value) return
        if (!reference.value) return

        const popperEl =
          (popper.value as ComponentPublicInstance)?.$el || popper.value
        const referenceEl =
          (reference.value as ComponentPublicInstance)?.$el || reference.value

        if (!(popperEl instanceof HTMLElement)) return
        if (!(!isVirtual && referenceEl instanceof Element)) return

        instance.value = createPopper(referenceEl, popperEl, options)

        onInvalidate(instance.value?.destroy)
      },
      // fire after component updates so you can access the updated DOM
      { flush: 'post' }
    )
  })

  return {
    reference,
    popper,
    instance,
  }
}
