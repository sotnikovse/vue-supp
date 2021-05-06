<template>
  <h1>Examples</h1>
  <div class="py-6">
    <Modal>
      <template v-slot:activator>
        <Btn class="bg-transparent ring-1">Activator</Btn>
      </template>
      <div class="bg-green-300 mt-4 p-8">Content</div>
    </Modal>
  </div>
  <div class="py-6">
    <Btn id="activator-1" class="bg-transparent ring-1">Activator prop</Btn>
    <input
      v-model="openOnHover"
      id="openOnHover"
      type="checkbox"
      class="mx-2"
    /><label for="openOnHover">Open on hover</label>
    <Modal activator="#activator-1" :open-on-hover="openOnHover" hide-overlay>
      <div class="bg-green-300 mt-4 p-8">Content</div>
    </Modal>
  </div>
  <div class="py-6">
    <Dialog v-model="dialog">
      <template v-slot:activator="{ attrs, listeners }">
        <Btn v-bind="attrs" v-on="listeners"> Activator dialog el </Btn>
        <div>Not activator</div>
      </template>
      <div class="bg-green-300 mt-4 p-8">
        Content
        <Btn @click="dialog = !dialog"> Close </Btn>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref } from 'vue'
import Btn from '../../components/Btn'
import Modal from '../../components/Modal'
import Dialog from '../../components/Dialog.vue'

export default {
  components: {
    Btn,
    Modal,
    Dialog,
  },
  setup() {
    const dialog = ref(false)
    const openOnHover = ref(false)

    return {
      dialog,
      openOnHover,
    }
  },
}
</script>
