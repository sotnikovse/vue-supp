<template>
  <div>Home</div>
  <div class="p-8">
    <Btn ref="trigger" @click="toggle">Activator</Btn>
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity ease-quart duration-200"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity ease-quart duration-150"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 bg-black bg-opacity-50"
          @click="setIsOpen(false)"
        ></div>
      </transition>
      <div v-if="isBooted" ref="container" class="popper-wrapper">
        <div class="popper-box">
          <transition
            enter-active-class="transition-opacity ease-quart duration-500"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity ease-quart duration-500"
            leave-to-class="opacity-0"
          >
            <div v-show="isVisible" class="relative">
              <div class="bg-red-500 p-5">
                <div>Test</div>
                <div>
                  <Btn @click="setIsOpen(false)">Close</Btn>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script lang="ts">
import { ref, watch, defineComponent } from 'vue'
import { usePopper } from 'vue-supp'
import Btn from '../components/Btn'

export default defineComponent({
  name: 'Home',

  components: {
    Btn,
  },

  setup() {
    const isOpen = ref(false)
    const isBooted = ref(false)
    const isVisible = ref(false)

    watch(isOpen, () => {
      isBooted.value = true
    })

    watch(isOpen, (val) => {
      requestAnimationFrame(() => {
        isVisible.value = val
      })
    })

    const options = {
      placement: 'top-start' as const,
      strategy: 'fixed' as const,
      modifiers: [{ name: 'offset', options: { offset: [0, 10] } }],
    }
    const { reference: trigger, popper: container } = usePopper(options)

    return {
      toggle: () => {
        isOpen.value = !isOpen.value
      },
      setIsOpen: (val: boolean) => {
        isOpen.value = val
      },
      isOpen,
      isBooted,
      isVisible,
      trigger,
      container,
    }
  },
})
</script>
