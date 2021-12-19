<script lang="ts" setup>
import { computed } from 'vue'
import { useLink } from 'vue-router'

import type { PropType } from 'vue'
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router'

const props = defineProps({
  type: {
    type: String as PropType<'submit' | 'reset' | 'button'>,
    default: 'button',
  },
  tag: {
    type: String,
    default: 'button',
  },
  primary: Boolean,
  outlined: Boolean,
  link: Boolean,
  to: [String, Object] as PropType<RouteLocationRaw>,
  replace: Boolean,
  href: String,
  loading: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['click'])

const isDisabled = computed(() => props.disabled || props.loading)

const tag = computed(() => (props.href || props.to ? 'a' : props.tag))
const link = computed(() =>
  props.to ? useLink(props as RouterLinkProps) : undefined
)

function onClick(e: MouseEvent) {
  if (isDisabled.value) return
  link.value?.navigate(e)
  emit('click', e)
}
</script>

<template>
  <component
    :is="tag"
    :class="{
      btn: true,
      btn_primary: props.primary,
      btn_outlined: props.outlined,
      btn_link: props.link,
    }"
    :type="tag === 'a' ? undefined : props.type"
    :disabled="isDisabled || undefined"
    :href="props.to ? link && link.href.value : props.href"
    @click="onClick"
  >
    <slot />
  </component>
</template>
