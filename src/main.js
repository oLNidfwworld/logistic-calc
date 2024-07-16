import { createApp } from 'vue'
import App from './App.vue'

const createMyApp = () => createApp(App)

document.querySelectorAll('#app').forEach((app) => {
  createMyApp().mount(app)
})
