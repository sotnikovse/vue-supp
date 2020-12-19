import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// no typescript module
import { routes } from 'vue-auto-routes'
import App from './App.vue'
import './index.css'

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

createApp(App)
  .use(router)
  .mount('#app')
