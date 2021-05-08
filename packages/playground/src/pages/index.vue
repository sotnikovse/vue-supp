<template>
  <div>Home</div>
  <div style="max-width: 200px; max-height: 200px" class="overflow-auto">
    <div style="width: 500px; height: 500px" class="text-center0 bg-gray-100">
      <Btn
        ref="trigger"
        @focus="setIsOpen(true)"
        @mouseenter="setIsOpen(true)"
        @mouseleave="setIsOpen(false)"
        >Activator</Btn
      >
      <teleport to="body">
        <div v-if="isBooted" ref="container" class="popper__wrapper">
          <transition
            enter-active-class="transition-opacity ease-quart duration-500"
            enter-from-class="opacity-0"
            leave-active-class="transition-opacity ease-quart duration-500"
            leave-to-class="opacity-0"
            @after-leave="destroyPopper"
          >
            <div v-show="isVisible" class="popper__box bg-red-500 px-16">
              <div class="popper__content">
                <div>Test</div>
                <div>
                  <Btn @click="setIsOpen(false)">Close</Btn>
                </div>
              </div>
              <div class="popper__arrow" data-popper-arrow></div>
            </div>
          </transition>
        </div>
      </teleport>
    </div>
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
      if (val) {
        requestAnimationFrame(() => {
          isVisible.value = val
          createPopper()
        })
      } else {
        isVisible.value = val
      }
    })

    const options = {
      placement: 'top-start' as const,
      strategy: 'fixed' as const,
      modifiers: [
        { name: 'offset', options: { offset: [0, 4] } },
        {
          name: 'preventOverflow',
          options: {
            altAxis: true,
            rootBoundary: 'document',
            padding: {
              top: 2,
              bottom: 2,
              left: 5,
              right: 5,
            },
          },
        },
        {
          name: 'flip',
          enabled: true,
          options: {
            padding: 0,
          },
        },
        {
          name: 'arrow',
          options: {
            padding: 8,
          },
        },
      ],
    }
    const {
      reference: trigger,
      popper: container,
      create: createPopper,
      destroy: destroyPopper,
    } = usePopper(options)

    return {
      destroyPopper,
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
