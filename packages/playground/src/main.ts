import { createApp } from 'vue'
import { createRouter } from './router'
import App from './App.vue'
import './index.css'

const router = createRouter()

createApp(App).use(router).mount('#app')
