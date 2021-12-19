<script lang="ts" setup>
import { ref } from 'vue'
import Btn from '@/components/Btn/Btn.vue'
import Dialog from '@/components/Modal/Dialog.vue'

const isActive = ref(false)
</script>

<template>
  <Dialog v-model="isActive" title="Dialog Title">
    <template #activator="{ attrs }">
      <Btn v-bind="attrs">Open</Btn>
    </template>
    <div>Dialog content</div>
  </Dialog>
</template>
