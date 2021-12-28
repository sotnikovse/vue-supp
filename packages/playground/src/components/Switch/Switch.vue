<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useModel, useFocus, usePreventBlur, getUid } from 'vue-supp'

const props = defineProps({
  id: String,
  autofocus: Boolean,
  disabled: Boolean,
  name: String,
  readonly: Boolean,
  required: Boolean,
  inputClass: [String, Object, Array],
  labelId: String,
  modelValue: [String, Number, Boolean, Array],
  value: [String, Number, Boolean],
  indeterminate: Boolean,
  trueValue: {
    type: [String, Number, Boolean],
    default: true,
  },
  falseValue: {
    type: [String, Number, Boolean],
    default: false,
  },
})

defineEmits([
  // useModel
  'update:modelValue',
  'update:indeterminate',
  // usePreventBlur
  'mousedown',
  'mouseup',
  // useFocus
  'focus',
  'blur',
])

const inputRef = ref<HTMLInputElement>()
const internal = useModel(props, 'modelValue')
const indeterminate = useModel(props, 'indeterminate')
const { onMouseDown, onMouseUp } = usePreventBlur(inputRef)
const { isFocused, onFocus, onBlur, focus, blur } = useFocus(inputRef)

const inputId = computed(() => props.id || getUid())
const checkboxLabelId = computed(() => props.labelId || getUid())
const isMultiple = computed(() => Array.isArray(internal.value))

defineExpose({
  inputRef,
  isFocused,
  focus,
  blur,
})
</script>

<template>
  <div
    :class="{
      'relative inline-flex': true,
      'cursor-not-allowed': props.disabled,
    }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <input
      ref="inputRef"
      v-model="internal"
      :indeterminate="indeterminate"
      :value="isMultiple ? props.value : undefined"
      :true-value="props.trueValue"
      :false-value="props.falseValue"
      :id="inputId"
      :autofocus="props.autofocus"
      :disabled="props.disabled"
      :name="props.name"
      :readonly="props.readonly"
      :required="props.required"
      :aria-labelledby="checkboxLabelId"
      :class="[
        'relative appearance-none align-middle rounded-[10px] flex-shrink-0 w-9 h-5 my-0.5',
        'focus:outline-none focus:ring focus:ring-primary-300',
        'transition-colors duration-100 ease-in-out',
        'text-gray-100 checked:text-white bg-gray-300 checked:bg-primary-500 hover:checked:bg-primary-400 active:checked:bg-primary-600',
        'border-2 border-gray-300 checked:border-primary-500 disabled:border-gray-200 disabled:checked:border-gray-400',
        'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:checked:bg-gray-400',
        'hover:text-white hover:checked:border-primary-400 active:checked:border-primary-600',
        'disabled:text-gray-300 disabled:hover:text-gray-300 disabled:hover:checked:border-gray-400 disabled:active:checked:border-gray-400',
        'before:absolute before:left-0 before:top-0 before:bg-current before:rounded-full before:w-4 before:h-4 transition-transform duration-200 ease-in-out checked:before:transform checked:before:translate-x-full',
        props.inputClass,
      ]"
      :type="'checkbox'"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="label" :input-id="inputId" :label-id="checkboxLabelId">
      <label :id="checkboxLabelId" :for="inputId" class="ml-2">
        <slot />
      </label>
    </slot>
  </div>
</template>
