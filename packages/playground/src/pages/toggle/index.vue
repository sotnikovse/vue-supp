<template>
  <div>
    Toggle
    <div>
      <Btn @click="toggle = !toggle">
        Btn
      </Btn>
      <div class="py-4">
        {{ isActive }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, SetupContext } from 'vue'
import { toggle } from 'uipart'

import Btn from '/~/components/Btn'

const { useToggle } = toggle()

export default {
  name: 'Toggle',
  components: { Btn },
  setup (props, { emit }) {
    const toggle = ref(false)
    const toggleProps = reactive({
      modelValue: toggle,
    })
    const { isActive } = useToggle(toggleProps, { emit } as SetupContext)
    return {
      toggle,
      isActive,
    }
  },
}
</script>
