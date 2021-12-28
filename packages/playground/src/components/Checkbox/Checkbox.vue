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
        'relative appearance-none align-middle rounded-sm flex-shrink-0 w-4 h-4 my-1',
        'focus:outline-none focus:ring focus:ring-primary-300',
        'transition-colors duration-100 ease-in-out',
        'text-white checked:bg-primary-500 hover:checked:bg-primary-400 active:checked:bg-primary-600',
        'border border-gray-400 checked:border-primary-500 disabled:border-gray-300 disabled:checked:border-gray-400',
        'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:checked:bg-gray-400',
        'hover:border-gray-500 hover:checked:border-primary-400 active:checked:border-primary-600',
        'disabled:hover:border-gray-300 disabled:hover:checked:border-gray-400 disabled:active:checked:border-gray-400',
        'indeterminate:border-gray-500 indeterminate:bg-gray-500 disabled:indeterminate:border-gray-400 disabled:indeterminate:bg-gray-400',
        'checked:before:absolute checked:before:border-b-[3px] checked:before:border-l-[3px] checked:before:w-[11px] checked:before:h-[6px] checked:before:top-[3px] checked:before:left-[2px] checked:before:transform checked:before:-rotate-45 checked:before:border-b-current checked:before:border-l-current',
        'indeterminate:before:absolute indeterminate:before:border-b-[3px] indeterminate:before:border-l-0 indeterminate:before:w-[10px] indeterminate:before:h-0 indeterminate:before:top-[5px] indeterminate:before:left-[2px] indeterminate:before:transform indeterminate:before:rotate-0 indeterminate:before:border-b-current indeterminate:before:border-l-transparent',
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
