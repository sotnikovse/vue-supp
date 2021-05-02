import { defineComponent, h, computed } from 'vue'

export default defineComponent({
  name: 'Btn',

  props: {
    small: Boolean,
  },

  setup(props, { slots }) {
    const classes = computed(() => {
      return [
        'inline-flex items-center justify-center',
        'bg-blue-500 hover:bg-blue-600 focus:ring',
        'focus:outline-none',
        props.small ? 'h-8 text-sm px-2' : 'h-10 px-4',
      ]
    })

    return () =>
      h(
        'button',
        { class: classes.value },
        slots.default ? slots.default() : undefined
      )
  },
})
