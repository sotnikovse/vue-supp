import { ref, onUnmounted } from 'vue'
import { createPopper } from '@popperjs/core'

import type { ComponentPublicInstance } from 'vue'
import type { VirtualElement, Instance, Options } from '@popperjs/core'

export type PopperOptions = Options

export function usePopper(options?: Partial<PopperOptions>, isVirtual = false) {
  const instance = ref<Instance>()
  const reference = ref<Element | VirtualElement | ComponentPublicInstance>()
  const popper = ref<HTMLElement | ComponentPublicInstance>()

  const create = () => {
    destroy()

    if (!popper.value) return
    if (!reference.value) return

    const popperEl =
      (popper.value as ComponentPublicInstance)?.$el || popper.value
    const referenceEl =
      (reference.value as ComponentPublicInstance)?.$el || reference.value

    if (!(popperEl instanceof HTMLElement)) return
    if (!(!isVirtual && referenceEl instanceof Element)) return

    instance.value = createPopper(referenceEl, popperEl, options)
  }

  const destroy = () => {
    if (instance.value) {
      instance.value.destroy()
      instance.value = undefined
    }
  }

  onUnmounted(destroy)

  return {
    reference,
    popper,
    instance,
    create,
    destroy,
  }
}
