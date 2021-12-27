import { ref } from 'vue'
import { getCurrentInstance } from '../utils'

import type { Ref } from 'vue'

export function useFocus(inputRef: Ref<HTMLInputElement | undefined>) {
  const vm = getCurrentInstance('useFocus')

  const isFocused = ref(false)

  function onFocus(e: Event) {
    isFocused.value = true
    vm?.emit('focus', e)
  }

  function onBlur(e: Event) {
    isFocused.value = false
    vm?.emit('blur', e)
  }

  function focus() {
    inputRef.value?.focus()
  }

  function blur() {
    inputRef.value?.blur()
  }

  return {
    isFocused,
    onFocus,
    onBlur,
    focus,
    blur,
  }
}
