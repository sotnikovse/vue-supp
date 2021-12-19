<template>
  <header class="h-12 container flex items-center mb-6">
    <Btn to="/" class="text-lg font-medium"> Playground </Btn>
  </header>
  <main class="flex-grow container">
    <RouterView v-slot="{ Component, route }">
      <template v-if="Component">
        <Suspense>
          <component :is="Component" :key="route.path" />
        </Suspense>
      </template>
    </RouterView>
  </main>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import Btn from '@/components/Btn/Btn.vue'
</script>
