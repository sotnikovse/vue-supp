<script lang="ts" setup>
import { computed } from 'vue'
import { routes } from '../router'

const items = computed(() =>
  routes
    .map((r) => {
      const [root, group, name] = r.path.slice(1).split('/')
      return {
        path: r.path,
        root,
        group,
        name,
      }
    })
    .reduce((acc, r) => {
      if (r.path === '/') return acc

      const $item = { [r.name]: r.path }
      if (acc[r.root]) {
        if (acc[r.root][r.group]) {
          Object.assign(acc[r.root][r.group], $item)
        } else {
          acc[r.root][r.group] = $item
        }
      } else {
        acc[r.root] = {
          [r.group]: $item,
        }
      }
      return acc
    }, {} as Record<string, Record<string, Record<string, string>>>)
)
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div v-for="(groups, root) in items" :key="root">
      <h4 class="font-semibold capitalize mb-2">{{ root }}</h4>
      <div v-for="(items, group) in groups" :key="group">
        <h5 class="text-gray-600 capitalize">{{ group }}</h5>
        <ul>
          <li v-for="(path, name) in items" :key="path">
            <router-link :to="path">
              {{ name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
