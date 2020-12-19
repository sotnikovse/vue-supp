<template>
  <button
    :class="[
      'inline-flex items-center justify-center px-3',
      'bg-blue-500 hover:bg-blue-600 focus:bg-blue-600',
      'focus:outline-none',
      small ? 'h-8 text-sm px-2' : 'h-10 px-4'
    ]"
    @click="count++"
  >
    <slot>
      <span>{{ text }}</span>
    </slot>
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    small: Boolean,
    text: String,
  },
}
</script>
