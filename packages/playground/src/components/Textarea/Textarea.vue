<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useModel, useFocus, usePreventBlur, getUid } from 'vue-supp'

const props = defineProps({
  id: String,
  autocomplete: String,
  autofocus: Boolean,
  disabled: Boolean,
  name: String,
  placeholder: String,
  readonly: Boolean,
  required: Boolean,
  inputClass: [String, Object, Array],
  labelId: String,
  error: Boolean,
  modelValue: [String, Number],
  rows: {
    type: [String, Number],
    default: 2,
    validator: (v: any) => !isNaN(parseFloat(v)),
  },
  noResize: Boolean,
})

defineEmits([
  // useModel
  'update:modelValue',
  // usePreventBlur
  'mousedown',
  'mouseup',
  // useFocus
  'focus',
  'blur',
])

const inputRef = ref<HTMLInputElement>()
const internal = useModel(props, 'modelValue')
const { onMouseDown, onMouseUp } = usePreventBlur(inputRef)
const { isFocused, onFocus, onBlur, focus, blur } = useFocus(inputRef)

const inputId = computed(() => props.id || getUid())

onMounted(() => {
  props.autofocus && focus()
})

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
      'relative rounded flex': true,
      'bg-gray-100 focus-within:bg-transparent': true,
      'focus-within:ring focus-within:ring-primary-300': true,
      'transition-colors duration-100 ease-in-out': true,
      'bg-red-100 focus-within:ring-red-400': props.error,
      'bg-gray-300 text-gray-500 cursor-not-allowed': props.disabled,
    }"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <slot name="prepend" :disabled="props.disabled" />
    <textarea
      ref="inputRef"
      v-model="internal"
      :id="inputId"
      :autocomplete="props.autocomplete"
      :autofocus="props.autofocus"
      :disabled="props.disabled"
      :name="props.name"
      :placeholder="props.placeholder"
      :readonly="props.readonly"
      :required="props.required"
      :aria-labelledby="props.labelId"
      :rows="props.rows"
      :class="[
        'align-middle rounded w-full bg-transparent px-2 py-1.5',
        'placeholder-gray-400 disabled:placeholder-gray-400/50',
        'focus:outline-none disabled:cursor-not-allowed',
        {
          'resize-none': props.noResize,
        },
        props.inputClass,
      ]"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="append" :disabled="props.disabled" />
  </div>
</template>
