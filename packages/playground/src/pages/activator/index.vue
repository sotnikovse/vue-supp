<template>
  <h1>Activator</h1>
  <div class="py-6">
    <Modal>
      <template v-slot:activator>
        <Btn class="bg-transparent ring-1"> Activator </Btn>
      </template>
      <div class="bg-green-300 mt-4 p-8">Content</div>
    </Modal>
  </div>
  <div class="py-6">
    <Dialog v-model="dialog">
      <template v-slot:activator="{ attrs, listeners }">
        <Btn v-bind="attrs" v-on="listeners"> Activator dialog el </Btn>
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

    return {
      dialog,
    }
  },
}
</script>
