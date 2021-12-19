<script lang="ts" setup>
import { ref } from 'vue'
import Btn from '@/components/Btn/Btn.vue'

const primary = ref(false)
const outlined = ref(false)
const link = ref(false)
const disabled = ref(false)
</script>

<template>
  <div class="text-gray-700 space-x-4">
    <input id="primary" type="checkbox" v-model="primary" />
    <label for="primary">primary</label>
  </div>
  <div class="text-gray-700 space-x-4">
    <input id="outlined" type="checkbox" v-model="outlined" />
    <label for="outlined">outlined</label>
  </div>
  <div class="text-gray-700 space-x-4">
    <input id="link" type="checkbox" v-model="link" />
    <label for="link">link</label>
  </div>
  <div class="text-gray-700 space-x-4">
    <input id="disabled" type="checkbox" v-model="disabled" />
    <label for="disabled">disabled</label>
  </div>

  <div class="mt-4">
    <Btn
      :primary="primary"
      :outlined="outlined"
      :link="link"
      :disabled="disabled"
    >
      Button
    </Btn>
  </div>
</template>
