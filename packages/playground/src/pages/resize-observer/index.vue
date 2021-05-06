<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from 'vue-supp'

const el = ref(null)
const text = ref('')

useResizeObserver(el, (entries) => {
  const [entry] = entries
  const { width, height } = entry.contentRect
  text.value = `width: ${width}\nheight: ${height}`
})
</script>

<template>
  <div class="mb-2">Resize the box to see changes</div>
  <textarea ref="el" class="resize p-2" disabled v-text="text" />
</template>
