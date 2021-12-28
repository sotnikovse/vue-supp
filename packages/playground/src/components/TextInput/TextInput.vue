<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import { useModel, useFocus, usePreventBlur, getUid } from 'vue-supp'

import type { PropType, HTMLAttributes } from 'vue'

const props = defineProps({
  id: String,
  autocomplete: String,
  autofocus: Boolean,
  disabled: Boolean,
  name: String,
  placeholder: String,
  readonly: Boolean,
  required: Boolean,
  type: String,
  inputmode: String as PropType<HTMLAttributes['inputmode']>,
  inputClass: [String, Object, Array],
  labelId: String,
  error: Boolean,
  modelValue: [String, Number],
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
      'relative rounded flex items-center h-9': true,
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
    <input
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
      :type="props.type"
      :inputmode="props.inputmode"
      :aria-labelledby="props.labelId"
      :class="[
        'align-middle rounded w-full bg-transparent px-2 py-1.5',
        'placeholder-gray-400 disabled:placeholder-gray-400/50',
        'focus:outline-none disabled:cursor-not-allowed',
        props.inputClass,
      ]"
      @focus="onFocus"
      @blur="onBlur"
    />
    <slot name="append" :disabled="props.disabled" />
  </div>
</template>
