import { ref, computed, watch } from 'vue'

import { SetupProps } from '../types'

export const useLazyContentProps = () => {
  return {
    eager: Boolean,
    disabled: Boolean,
  }
}

export interface LazyProps {
  isActive: boolean
  disabled?: boolean
  eager?: boolean
}
/**
 * @param {Object} props The props of use-case, readonly/reactive proxy.
 * @param {boolean} props.isActive The active state.
 * @param {boolean} props.disabled The disabled state.
 * @param {boolean} [props.eager] Will force component content render on mounted.
 */
export const useLazyContent = (props: LazyProps | SetupProps) => {
  const isBooted = ref<boolean>(false)

  const hasContent = computed(() => {
    return isBooted.value || props.isActive || props.eager
  })

  watch(() => props.isActive, () => {
    if (props.disabled) return
    isBooted.value = true
  })

  const showLazyContent = (content: Function | null | undefined) => {
    return (hasContent.value && content) ? content() : undefined
  }

  return {
    isBooted,
    hasContent,
    showLazyContent,
  }
}
