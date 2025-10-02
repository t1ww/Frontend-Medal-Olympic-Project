import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

/* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import '@/services/AxiosInterceptorSetup.ts'
import { inject } from '@vercel/analytics'

const app = createApp(App)

inject()
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
