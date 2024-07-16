import { createApp } from 'vue'
import App from './App.vue'

const createMyApp = () => createApp(App)

document.querySelectorAll('[data-calc]').forEach((app) => {
  createMyApp().mount(app)
})
