<script lang="ts" setup>
import { defineProps, defineExpose, computed, ref } from 'vue'
import { getUid } from 'vue-supp'

const props = defineProps({
  id: String,
  for: String,
})

const elementRef = ref()

const id = computed(() => props.id || getUid())

const textContent = computed(
  () => (elementRef.value && elementRef.value.textContent) || undefined
)

defineExpose({
  id,
})
</script>

<template>
  <label
    ref="elementRef"
    :id="id"
    :for="props.for"
    :aria-hidden="!props.for"
    :title="textContent"
    class="inline-flex text-base text-gray-600 leading-6 truncate"
  >
    <slot />
  </label>
</template>
