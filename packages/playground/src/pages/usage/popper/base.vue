<script lang="ts" setup>
import { ref, watch } from 'vue'
import { usePopper } from 'vue-supp'
import Btn from '@/components/Btn/Btn.vue'

const isActive = ref(false)
const isBooted = ref(false)
const isVisible = ref(false)

watch(isActive, () => {
  isBooted.value = true
})

watch(isActive, (val) => {
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

function setActive(val: boolean) {
  isActive.value = val
}
</script>

<template>
  <div class="max-w-[16rem] max-h-[16rem] overflow-auto">
    <div class="max-w-[32rem] max-h-[32rem] text-center0">
      <Btn
        ref="trigger"
        @focus="setActive(true)"
        @mouseenter="setActive(true)"
        @mouseleave="setActive(false)"
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
                  <Btn @click="setActive(false)">Close</Btn>
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
