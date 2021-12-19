<script lang="ts" setup>
import { defineProps, defineEmits, defineExpose } from 'vue'
import { makeFormProps, createForm } from 'vue-supp'

const props = defineProps(makeFormProps())

defineEmits({
  'update:modelValue': () => true,
  resetValidation: () => true,
  reset: () => true,
  submit: () => true,
})

const form = createForm(props)

defineExpose(form)
</script>

<template>
  <form class="form" novalidate @reset="form.reset" @submit="form.submit">
    <slot v-bind="form" />
  </form>
</template>
