<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<script lang="ts" setup>
import { ref, watch, computed, nextTick } from 'vue'
import {
  makeDimensionProps,
  useDimension,
  makeLazyProps,
  useLazy,
  useModel,
  useLockscreen,
  useStack,
  getUid,
} from 'vue-supp'

const props = defineProps({
  ...makeLazyProps(),
  ...makeDimensionProps(),
  modelValue: Boolean,
  fullscreen: Boolean,
  teleportTarget: {
    type: String,
    default: 'body',
  },
  overlayClass: [String, Object, Array],
  overlay: {
    type: [String, Boolean],
    default: 'auto',
  },
  transition: Object,
  disableKeys: Boolean,
  focusFirst: Boolean,
  retainFocus: Boolean,
  labelId: String,
})

const emit = defineEmits([
  // useModel
  'update:modelValue',
  'afterLeave',
])

const id = getUid()
const contentRef = ref()

const isActive = useModel(props, 'modelValue')
const { hasContent, onAfterLeave } = useLazy(props, isActive)
const { dimensionStyles } = useDimension(props)
const { isTop } = useStack(isActive)

useLockscreen(isActive)

const activatorAttrs = computed(() => ({
  role: 'button',
  'aria-haspopup': true,
  'aria-expanded': isActive.value ? true : undefined,
  'aria-controls': isActive.value ? id : undefined,
  onClick: () => {
    isActive.value = !isActive.value
  },
}))

const overlayTransition = computed(() => ({
  appear: true,
  enterActiveClass: 'transition duration-300 ease-in',
  enterFromClass: 'opacity-0',
  leaveActiveClass: 'transition duration-200 ease-out',
  leaveToClass: 'opacity-0',
}))

const modalTransition = computed(() =>
  props.transition
    ? props.transition
    : props.fullscreen
    ? {
        enterActiveClass:
          'transition duration-500 ease-in-out pointer-events-none',
        enterFromClass: 'transform translate-y-full',
        enterToClass: 'transform translate-y-0',
        leaveActiveClass:
          'transition duration-500 ease-in-out pointer-events-none',
        leaveFromClass: 'transform translate-y-0',
        leaveToClass: 'transform translate-y-full',
      }
    : {
        enterActiveClass: 'transition duration-300 ease-in-out',
        enterFromClass: 'opacity-0 scale-95',
        enterToClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition duration-200 ease-in-out',
        leaveFromClass: 'opacity-100 scale-100',
        leaveToClass: 'opacity-0 scale-95',
      }
)

watch(
  isActive,
  (val) => {
    if (val) {
      window.addEventListener('keydown', onKeydown)

      props.focusFirst && focusFirstDescendant()
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
  { immediate: true }
)

watch(
  () => isActive.value && props.retainFocus,
  (val) => {
    val
      ? document.addEventListener('focusin', onFocusin)
      : document.removeEventListener('focusin', onFocusin)
  },
  { immediate: true }
)

function afterLeave() {
  onAfterLeave()
  emit('afterLeave')
}

function open() {
  isActive.value = true
}

function close() {
  isActive.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (props.disableKeys) return

  if ((e.key === 'Esc' || e.key === 'Escape') && isTop.value) {
    isActive.value = false
  }
}

async function focusFirstDescendant() {
  await nextTick()
  if (contentRef.value) {
    const [first] = contentRef.value.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (first && first.focus) {
      first.focus({ preventScroll: true })
    }
  }
}

function onFocusin(e: FocusEvent) {
  const before = e.relatedTarget
  const after = e.target

  if (
    isTop.value &&
    before !== after &&
    contentRef.value &&
    ![document, contentRef.value].includes(after) &&
    !contentRef.value.contains(after)
  ) {
    const focusable = [
      ...contentRef.value.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ),
    ].filter((el) => !el.hasAttribute('disabled'))

    if (!focusable.length) return

    const firstElement = focusable[0]
    const lastElement = focusable[focusable.length - 1]

    if (before === firstElement) {
      lastElement.focus()
    } else {
      firstElement.focus()
    }
  }
}

defineExpose({
  open,
  close,
})
</script>

<template>
  <teleport :to="props.teleportTarget" :disabled="!props.teleportTarget">
    <div
      v-if="hasContent"
      :class="{
        'fixed inset-0 z-40': true,
        'overflow-y-auto': !props.fullscreen,
      }"
    >
      <div
        role="dialog"
        aria-modal="true"
        :aria-labelledby="props.labelId"
        :class="[
          props.fullscreen ? 'h-full' : 'min-h-screen text-center px-4 sm:px-6',
        ]"
      >
        <transition
          v-if="
            (props.overlay === 'auto' && !props.fullscreen) ||
            props.overlay === true
          "
          v-bind="overlayTransition"
        >
          <div
            v-if="isActive"
            :class="['fixed inset-0 bg-black/50', props.overlayClass]"
            aria-hidden="true"
            @click="isTop ? close() : undefined"
          />
        </transition>
        <span
          v-if="!props.fullscreen"
          class="inline-block h-screen align-middle"
          aria-hidden="true"
        >
          &ZeroWidthSpace;
        </span>
        <transition v-bind="modalTransition" appear @after-leave="afterLeave">
          <div
            v-if="isActive"
            ref="contentRef"
            :style="dimensionStyles"
            :class="[
              'relative text-left',
              props.fullscreen
                ? 'overflow-y-auto w-full h-full'
                : 'overflow-hidden origin-center inline-block align-middle my-4 sm:my-6',
            ]"
            v-bind="$attrs"
          >
            <slot />
          </div>
        </transition>
      </div>
    </div>
  </teleport>
  <slot name="activator" :attrs="activatorAttrs" />
</template>
