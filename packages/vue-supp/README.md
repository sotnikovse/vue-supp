**Vue 3 use-case, utility library for creating custom base components.**

## Installation

```bash
# With npm
npm i vue-supp

# With Yarn
yarn add vue-supp
```

## Usage

### Toggle use with default
```js
import { toggle } from 'vue-supp'

const { useToggleProps, useToggleEmits, useToggle } = toggle()

export default {
  name: 'MyComponent',

  props: useToggleProps(), // modelValue

  emits: useToggleEmits(), // 'update:modelValue'

  setup (props, { emit }) {
    const { isActive } = useToggle(props, { emit })

    return {
      isActive
    }
  }
}
```

### Toggle use with custom
```js
import { toggle } from 'vue-supp'

const { useToggleProps, useToggleEmits, useToggle } = toggle('value', 'update:value')

export default {
  name: 'MyComponent',

  props: useToggleProps(), // value

  emits: useToggleEmits(), // 'update:value'

  setup (props, { emit }) {
    const { isActive } = useToggle(props, { emit })

    return {
      isActive
    }
  }
}
```

### Toggle props
```js
import { reactive, computed, toRefs } from 'vue'
import { toggle } from 'vue-supp'

const { useToggleProps, useToggleEmits, useToggle } = toggle()

export default {
  name: 'MyComponent',

  props: {
    ...useToggleProps(),
    value: {
      requred: false
    },
  },

  emits: [...useToggleEmits(), 'change'],

  setup (props, { emit }) {
    const { modelValue } = toRefs(props)
    const toggleProps = reactive({
      modelValue // Ref
      // can be computed
      // modelValue: computed(() => props.modelValue)
    })
    const { isActive } = useToggle(toggleProps, { emit })

    return {
      isActive
    }
  }
}
```

## Documentation

WIP
