import { ref } from 'vue'
import { getCurrentInstance } from '../utils'

import type { Ref } from 'vue'

export function usePreventBlur(inputRef: Ref<HTMLInputElement | undefined>) {
  const vm = getCurrentInstance('usePreventBlur')

  const hasMouseDown = ref(false)

  function onMouseDown(e: MouseEvent) {
    // Prevent input from being blurred
    if (e.target !== inputRef.value) {
      e.preventDefault()
      e.stopPropagation()
    }
    hasMouseDown.value = true

    vm?.emit('mousedown', e)
  }

  function onMouseUp(e: MouseEvent) {
    if (hasMouseDown.value) inputRef.value?.focus()

    hasMouseDown.value = false

    vm?.emit('mouseup', e)
  }

  return {
    onMouseDown,
    onMouseUp,
  }
}
