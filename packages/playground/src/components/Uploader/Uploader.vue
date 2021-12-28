<script lang="ts" setup>
import { ref, computed, watchEffect } from 'vue'
import Loading from '@/components/Loading/Loading.vue'
import photoSvg from '@/assets/icons/photo.svg'
import xSvg from '@/assets/icons/x.svg'

import type { PropType } from 'vue'

const props = defineProps({
  src: String,
  rounded: Boolean,
  accept: {
    type: String,
    default: 'image/*',
  },
  disabled: Boolean,
  action: {
    type: String,
    required: true,
  },
  method: {
    type: String as PropType<'POST' | 'PUT' | 'PATCH'>,
    default: 'PUT',
  },
})

const emit = defineEmits(['uploading', 'update:src', 'done', 'error'])

const inputRef = ref<HTMLInputElement>()
const uploadFile = ref<FileList[0]>()
const preview = ref()
const uploading = ref(false)
let controller: AbortController | undefined = undefined

const isRounded = computed(() => props.rounded)

watchEffect(() => {
  emit('uploading', uploading.value)
})

async function upload(file: File) {
  try {
    uploading.value = true

    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(props.action, {
      method: props.method,
      body: formData,
      signal: controller?.signal,
    })
    const result = await response.json()
    emit('done', result)

    if (inputRef.value) {
      inputRef.value.value = ''
    }
  } catch (error) {
    emit('error', error)
  } finally {
    uploading.value = false
  }
}

function onFileInputChange(e: Event) {
  const target = e.target as HTMLInputElement
  if (target.files?.length) {
    const file = target.files[0]

    uploadFile.value = file

    preview.value = URL.createObjectURL(file)

    controller = new AbortController()

    upload(file)
  }
}

function clickFileInput() {
  if (inputRef.value) {
    inputRef.value.click()
  }
}

function cancelUpload() {
  if (controller) {
    controller.abort()

    if (inputRef.value) {
      inputRef.value.value = ''
    }
    uploadFile.value = undefined
    preview.value = undefined
  }
}

function clear() {
  emit('update:src', '')

  cancelUpload()
}
</script>

<template>
  <div
    :class="[
      'relative bg-gray-200 text-gray-500',
      { 'rounded-full': isRounded },
    ]"
  >
    <input
      ref="inputRef"
      type="file"
      :accept="props.accept"
      class="hidden"
      @change="onFileInputChange"
    />
    <div class="w-full h-full cursor-pointer group" @click="clickFileInput">
      <slot name="preview" :preview="preview" :uploading="uploading">
        <img
          v-if="preview"
          :src="preview"
          :class="[
            'absolute inset-0 w-full h-full object-cover pointer-events-none',
            { 'rounded-full': isRounded },
          ]"
        />
        <img
          v-else-if="props.src"
          :src="props.src"
          :class="[
            'absolute inset-0 w-full h-full object-cover pointer-events-none',
            { 'rounded-full': isRounded },
          ]"
        />
        <div v-else class="absolute inset-0 flex items-center justify-center">
          <photoSvg class="w-8 h-8" />
        </div>

        <button
          v-if="props.src && !uploading"
          tabindex="-1"
          :class="[
            'invisible group-hover:visible focus:outline-none absolute bg-gray-500 text-white rounded-full border border-white',
            isRounded ? '-top-1 -right-1' : 'top-1 right-1',
          ]"
          @click.stop="clear"
        >
          <xSvg class="w-4 h-4" />
        </button>
      </slot>
    </div>
    <transition
      enter-active-class="transition duration-300 ease-in"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-out"
      leave-to-class="opacity-0"
    >
      <div
        v-if="uploading"
        :class="[
          'absolute inset-0 flex items-center justify-center bg-black/5',
          { 'rounded-full': isRounded },
        ]"
      >
        <Loading class="text-white" />
        <button
          tabindex="-1"
          class="absolute focus:outline-none text-white/50 hover:text-white transition-colors"
          @click="cancelUpload"
        >
          <xSvg class="w-5 h-5" />
        </button>
      </div>
    </transition>
  </div>
</template>
