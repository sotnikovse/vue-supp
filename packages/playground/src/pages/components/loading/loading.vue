<script lang="ts" setup>
import Loading from '@/components/Loading/Loading.vue'
</script>

<template>
  <div class="mb-4">
    <Loading class="text-gray-600" />
  </div>
  <div class="mb-4">
    <Loading type="circular" />
  </div>
  <div>
    <Loading type="circular" class="text-blue-500 w-8 h-8" />
  </div>
</template>
