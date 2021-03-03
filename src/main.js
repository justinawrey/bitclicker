import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import "./main.css";

const app = createApp(App)
app.use(store)
app.mount('#app')

if (import.meta.env.DEV) {
  window.$store = store
}