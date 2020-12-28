import {
  h,
  defineComponent,
  SetupContext,
  computed,
} from 'vue'

export default defineComponent({
  props: {
    small: Boolean,
  },

  setup (props: Record<string, any>, { slots }: SetupContext) {
    const classes = computed(() => {
      return [
        'inline-flex items-center justify-center',
        'bg-blue-500 hover:bg-blue-600 focus:ring',
        'focus:outline-none',
        props.small ? 'h-8 text-sm px-2' : 'h-10 px-4',
      ]
    })

    const genSlot = () => {
      return slots.default ? slots.default() : undefined
    }

    return {
      classes,
      genSlot,
    }
  },

  render () {
    return h('button', {
      class: this.classes,
    }, this.genSlot())
  }
})
