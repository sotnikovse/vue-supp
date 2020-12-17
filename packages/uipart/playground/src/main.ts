import { createApp, defineComponent, h } from 'vue'
import './index.css'

const App = defineComponent({
  name: 'App',
  render: () => {
    return h('div', { class: 'antialiased' }, [
      h('h1', 'Playground'),
    ])
  }
})

createApp(App).mount('#app')
