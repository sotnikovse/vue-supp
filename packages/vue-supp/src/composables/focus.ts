// https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/composables/focus.ts

import { ref } from 'vue'

export const useFocus = () => {
  const isFocused = ref(false)

  function focus() {
    isFocused.value = true
  }

  function blur() {
    isFocused.value = false
  }

  return { isFocused, focus, blur }
}
