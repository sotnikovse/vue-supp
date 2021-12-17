// https://github.com/youzan/vant/blob/dev/packages/vant-use/src/useClickAway/index.ts

import { computed, onMounted, onUnmounted, watch } from 'vue'
import { inBrowser } from '../utils'

import type { Ref, ComputedRef } from 'vue'

export type UseClickAwayOptions = {
  eventName?: string
}

export function useClickAway(
  target: Ref<Element | undefined>,
  listener: EventListener,
  options: UseClickAwayOptions = {},
  include?: Ref<Element[]> | ComputedRef<Element[]>
) {
  if (!inBrowser) {
    return
  }

  const { eventName = 'click' } = options

  const elements = computed(() => {
    if (include?.value) {
      return [target.value, ...include.value]
    }
    return [target.value]
  })

  watch(target, (val, oldVal) => {
    remove(oldVal)
    add(val)
  })

  onMounted(() => add(target.value))

  onUnmounted(() => remove(target.value))

  function add(element: Element | undefined) {
    if (element) {
      document.addEventListener(eventName, onClick)
    }
  }

  function remove(element: Element | undefined) {
    if (element) {
      document.removeEventListener(eventName, onClick)
    }
  }

  const onClick = (e: Event) => {
    if (!elements.value.some((el) => el?.contains(e.target as Node))) {
      listener(e)
    }
  }
}
