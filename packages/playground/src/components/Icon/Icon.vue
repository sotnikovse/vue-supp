<script lang="ts" setup>
import { defineProps, defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'img',
  },
  ariaHidden: {
    type: Boolean,
    default: true,
  },
  fillCurrent: {
    type: Boolean,
    default: true,
  },
  strokeCurrent: Boolean,
})

const iconComponent = defineAsyncComponent(
  () =>
    import(
      /* webpackChunkName: "icons" */
      /* webpackMode: "lazy-once" */
      `../assets/icons/${props.name}.svg?inline`
    )
)
</script>

<template>
  <component
    :is="iconComponent"
    :role="props.role"
    :aria-hidden="props.ariaHidden"
    :class="{
      'fill-current': fillCurrent,
      'stroke-current': strokeCurrent,
    }"
  />
</template>
