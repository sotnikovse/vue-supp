import { ref, computed, watch, Ref, ComputedRef, PropType, VNode } from 'vue'

export interface LazyContentProps {
  eager?: boolean
  disabled?: boolean
  isActive: boolean
}
export interface LazyContent {
  isBooted: Ref<boolean>
  hasContent: ComputedRef<boolean | undefined>
  showLazyContent: (
    content?: () => VNode | VNode[]
  ) => VNode | VNode[] | undefined
}

export const useLazyContentProps = () => {
  return {
    eager: Boolean as PropType<boolean | undefined>,
    disabled: Boolean as PropType<boolean | undefined>,
  }
}

export const useLazyContent = (props: LazyContentProps): LazyContent => {
  const isBooted = ref<boolean>(false)

  const hasContent = computed(() => {
    return isBooted.value || props.isActive || props.eager
  })

  watch(
    () => props.isActive,
    () => {
      if (props.disabled) return
      isBooted.value = true
    }
  )

  const showLazyContent = (
    content?: () => VNode | VNode[]
  ): VNode | VNode[] | undefined => {
    return hasContent.value && content ? content() : undefined
  }

  return {
    isBooted,
    hasContent,
    showLazyContent,
  }
}
