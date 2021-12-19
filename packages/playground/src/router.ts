import { createRouter, createWebHistory } from 'vue-router'

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob('./pages/**/*.vue')

export const routes = Object.keys(pages).map((path) => {
  const pagePath = path.match(/\.\/pages(.*)\.vue$/)![1].toLowerCase()
  return {
    path: pagePath.replace(/\bindex$/, ''),
    component: pages[path], // () => import('./pages/*.vue')
  }
})

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
