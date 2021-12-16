import { watch, onBeforeUnmount, nextTick } from 'vue'

import type { Ref } from 'vue'

let totalLockCount = 0

function hasScrollbar(el?: HTMLElement) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return (
    ['auto', 'scroll'].includes(style.overflowY!) &&
    el.scrollHeight > el.clientHeight
  )
}

export function useLockscreen(isActive: Ref<boolean>) {
  let scrollbarWidth = 0
  let rootHasScrollbar = false

  function hideScroll() {
    if (!totalLockCount) {
      rootHasScrollbar = hasScrollbar(document.documentElement)
      scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth
      if (scrollbarWidth > 0 && rootHasScrollbar) {
        document.documentElement.style.paddingInlineEnd = `${scrollbarWidth}px`
      }
      document.documentElement.classList.add('overflow-hidden')
    }

    totalLockCount++
  }

  function showScroll() {
    if (totalLockCount) {
      totalLockCount--

      if (!totalLockCount) {
        document.documentElement.classList.remove('overflow-hidden')
        if (scrollbarWidth > 0 && rootHasScrollbar) {
          document.documentElement.style.paddingInlineEnd = '0'
        }
      }
    }
  }

  onBeforeUnmount(() => {
    showScroll()
  })

  watch(isActive, (val) => {
    nextTick(() => {
      val ? hideScroll() : showScroll()
    })
  })

  return {
    hideScroll,
    showScroll,
  }
}
