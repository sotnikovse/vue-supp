<template>
  <Modal v-model="internal">
    <template v-slot:activator="{ attrs, listeners }">
      <slot name="activator" :attrs="attrs" :listeners="listeners" />
    </template>
    <slot />
  </Modal>
</template>

<script>
import { watch, ref, toRefs, onMounted } from 'vue'
import Modal from '/~/components/Modal'
export default {
  components: { Modal },

  props: {
    modelValue: {
      type: [String, Boolean],
      default: false,
    },
  },

  emits: ['update:modelValue'],

  setup (props, { emit }) {
    const activator = ref(null)
    const { modelValue } = toRefs(props)
    const internal = ref(modelValue.value)
    watch(modelValue, val => {
      internal.value = val
    })
    watch(internal, val => {
      emit('update:modelValue', val)
    })

    return {
      internal,
      activator,
    }
  },
}
</script>
