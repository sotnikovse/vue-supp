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
const { onMouseDown, onMouseUp } = usePreventBlur(inputRef)
const { isFocused, onFocus, onBlur, focus, blur } = useFocus(inputRef)

const inputId = computed(() => props.id || getUid())
const checkboxLabelId = computed(() => props.labelId || getUid())

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
      :value="props.value"
      :id="inputId"
      :autofocus="props.autofocus"
      :disabled="props.disabled"
      :name="props.name"
      :readonly="props.readonly"
      :required="props.required"
      :aria-labelledby="checkboxLabelId"
      :class="[
        'relative appearance-none bg-clip-content align-middle rounded-full flex-shrink-0 w-4 h-4 p-[3px] my-1',
        'focus:outline-none focus:ring focus:ring-primary-300',
        'transition-colors duration-100 ease-in-out',
        'text-white checked:bg-primary-500 hover:checked:bg-primary-400 active:checked:bg-primary-600',
        'border border-gray-400 checked:border-primary-500 disabled:border-gray-300 disabled:checked:border-gray-400',
        'disabled:cursor-not-allowed disabled:checked:bg-gray-400',
        'hover:border-gray-500 hover:checked:border-primary-400 active:checked:border-primary-600',
        'disabled:hover:border-gray-300 disabled:hover:checked:border-gray-400 disabled:active:checked:border-gray-400',
        props.inputClass,
      ]"
      :type="'radio'"
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
