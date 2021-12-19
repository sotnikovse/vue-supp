<script lang="ts" setup>
import { computed } from 'vue'
import { useModel, getUid } from 'vue-supp'
import Modal from '@/components/Modal/Modal.vue'
import Btn from '@/components/Btn/Btn.vue'
import xSvg from '@/assets/icons/x.svg'

const props = defineProps({
  modelValue: Boolean,
  title: String,
})

defineEmits([
  // useModel
  'update:modelValue',
])

const isActive = useModel(props, 'modelValue')

const labelId = computed(() => (props.title ? getUid() : undefined))
</script>

<template>
  <Modal v-model="isActive" :label-id="labelId" class="rounded-lg">
    <template #activator="activatorProps">
      <slot name="activator" v-bind="activatorProps" />
    </template>
    <div class="flex items-center bg-gray-200 p-4">
      <div class="flex flex-grow items-center space-x-2">
        <slot name="icon" />
        <h4 v-if="props.title" :id="labelId" class="font-medium">
          {{ props.title }}
        </h4>
      </div>
      <Btn
        link
        tabindex="-1"
        class="w-6 h-6 text-blue-500"
        @click="isActive = false"
      >
        <xSvg class="w-5 h-5" />
      </Btn>
    </div>
    <div class="bg-gray-100 p-6">
      <slot />
    </div>
  </Modal>
</template>
