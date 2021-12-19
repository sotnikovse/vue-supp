<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps({
  active: Boolean,
  messages: Array,
})
</script>

<template>
  <transition-group
    tag="div"
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-2 opacity-0"
    class="text-gray-600 text-xs relative flex-auto leading-3 min-w-[1px] min-h-[1px]"
  >
    <template v-if="props.active">
      <div v-for="(message, i) in props.messages" :key="i" class="break-words">
        <slot :message="message" :key="i">
          {{ message }}
        </slot>
      </div>
    </template>
  </transition-group>
</template>
