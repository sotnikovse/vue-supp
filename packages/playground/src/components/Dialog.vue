<template>
  <Modal v-model="internal">
    <template v-slot:activator="{ attrs, listeners }">
      <slot name="activator" :attrs="attrs" :listeners="listeners" />
    </template>
    <slot />
  </Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useModel } from 'vue-supp'
import Modal from './Modal'

export default defineComponent({
  name: 'Dialog',

  components: { Modal },

  props: {
    modelValue: {
      type: [String, Boolean],
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup(props) {
    const internal = useModel(props, 'modelValue')

    return {
      internal,
    }
  },
})
</script>
