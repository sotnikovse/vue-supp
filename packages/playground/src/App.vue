<template>
  <div class="container flex items-center space-x-4 border-b h-12">
    <router-link
      v-for="item in items"
      :key="item.text"
      :to="item.to"
      v-slot="{ isActive, isExactActive }"
    >
      <span
        :class="[
          'hover:text-gray-600',
          isActive || isExactActive ? 'text-gray-600' : 'text-gray-400',
        ]"
      >
        {{ item.text }}
      </span>
    </router-link>
  </div>
  <div class="container py-8">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
  data () {
    return {
      items: [
        { text: 'Home', to: '/' },
        { text: 'Toggle', to: '/toggle' },
        { text: 'Measure', to: '/measure' },
        { text: 'Activator', to: '/activator' },
      ],
    }
  },
}
</script>
