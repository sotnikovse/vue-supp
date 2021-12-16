// https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/composables/lazy.ts

import { computed, ref, watch } from 'vue'
import { propsFactory } from '../utils'

import type { Ref } from 'vue'

export const makeLazyProps = propsFactory({
  eager: Boolean,
})

export function useLazy(props: { eager: boolean }, active: Ref<boolean>) {
  const isBooted = ref(false)
  const hasContent = computed(
    () => isBooted.value || props.eager || active.value
  )

  watch(active, () => (isBooted.value = true))

  function onAfterLeave() {
    if (!props.eager) isBooted.value = false
  }

  return { isBooted, hasContent, onAfterLeave }
}
