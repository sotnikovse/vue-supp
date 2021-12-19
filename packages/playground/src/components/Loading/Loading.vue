<script lang="ts">
import { defineComponent, h } from 'vue'

import type { PropType } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'spinner' | 'circular'>,
      default: 'spinner',
    },
  },
  setup(props) {
    return () =>
      h(
        'div',
        {
          class: 'loading',
        },
        h(
          'span',
          {
            class: [
              'loading__spinner',
              props.type === 'spinner'
                ? 'loading__spinner_spinner'
                : 'loading__spinner_circular',
            ],
          },
          props.type === 'spinner'
            ? Array(12)
                .fill(null)
                .map((_, index) =>
                  h('i', {
                    key: index,
                    class: 'loading__line',
                    style: {
                      transform: `rotate(${index * 30}deg)`,
                      opacity: 1 - (0.75 / 12) * (index - 1),
                    },
                  })
                )
            : h(
                'svg',
                {
                  class: 'loading__circular',
                  viewBox: '25 25 50 50',
                },
                h('circle', {
                  cx: '50',
                  cy: '50',
                  r: '20',
                  fill: 'none',
                  class: 'animate-circular',
                  stroke: 'currentColor',
                  'stroke-width': 3,
                  'stroke-linecap': 'round',
                })
              )
        )
      )
  },
})
</script>
