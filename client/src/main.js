//import markrow
import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// bikin  instance pinia
const app = createApp(App)
const pinia = createPinia()
// bikin dan pasang plugin pinia untuk menyuntikkan router ke pinia store

pinia.use(({ store }) => {
  store.$router = markRaw(router)
})
app.use(pinia)
app.use(router)

app.mount('#app')
