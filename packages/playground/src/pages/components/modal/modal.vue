<script lang="ts" setup>
import { ref } from 'vue'
import Btn from '@/components/Btn/Btn.vue'
import Modal from '@/components/Modal/Modal.vue'
import xSvg from '@/assets/icons/x.svg'

const model = ref(false)
const fullscreen = ref(false)
</script>

<template>
  <div class="text-gray-700 space-x-4">
    <input id="fullscreen" type="checkbox" v-model="fullscreen" />
    <label for="fullscreen">Fullscreen</label>
  </div>

  <Modal v-model="model" :fullscreen="fullscreen" class="bg-white p-6">
    <template #activator="{ attrs }">
      <Btn v-bind="attrs"> Activator </Btn>
    </template>
    <div>Content</div>
    <div class="absolute top-0 right-0">
      <Btn @click="model = false">
        <xSvg class="w-5 h-5" />
      </Btn>
    </div>
  </Modal>
</template>
