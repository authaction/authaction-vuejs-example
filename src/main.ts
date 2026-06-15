import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createAuthAction } from '@authaction/web-sdk/vue'

const app = createApp(App)

app.use(router)
app.use(createAuthAction({
  domain: import.meta.env.VITE_AUTHACTION_TENANT_DOMAIN,
  clientId: import.meta.env.VITE_AUTHACTION_CLIENT_ID,
  redirectUri: import.meta.env.VITE_AUTHACTION_REDIRECT_URI,
  postLogoutRedirectUri: import.meta.env.VITE_AUTHACTION_LOGOUT_REDIRECT_URI,
  cacheLocation: 'localstorage',
}))

app.mount('#app')
