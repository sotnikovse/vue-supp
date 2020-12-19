<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/toggle">Toggle</router-link> |
    <router-link to="/measure">Measure</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>
