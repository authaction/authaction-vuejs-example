import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { authService } from './services/AuthService'

const app = createApp(App)

// Optionally expose authService globally, if needed
app.config.globalProperties.$authService = authService

app.use(router)

app.mount('#app')
