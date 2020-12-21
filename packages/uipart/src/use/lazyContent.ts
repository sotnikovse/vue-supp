import { ref, computed, watch, Ref, PropType, VNode } from 'vue'

import { SetupProps } from '../../types'

export interface LazyContentProps {
  eager?: PropType<boolean>
  disabled?: PropType<boolean>
}
export interface LazyContentSetupProps extends LazyContentProps {
  isActive: PropType<boolean>
}
export interface LazyContent {
  isBooted: Ref<boolean>
  hasContent: Ref<boolean>
  showLazyContent: () => VNode[] | undefined
}

export const useLazyContentProps = (): Record<string, PropType<boolean>> => {
  return {
    eager: Boolean,
    disabled: Boolean,
  }
}

export const useLazyContent = (props: LazyContentSetupProps | SetupProps): LazyContent => {
  const isBooted = ref<boolean>(false)

  const hasContent = computed(() => {
    return isBooted.value || props.isActive || props.eager
  })

  watch(() => props.isActive, () => {
    if (props.disabled) return
    isBooted.value = true
  })

  const showLazyContent = (content?: () => VNode[]): VNode[] | undefined => {
    return (hasContent.value && content) ? content() : undefined
  }

  return {
    isBooted,
    hasContent,
    showLazyContent,
  }
}
