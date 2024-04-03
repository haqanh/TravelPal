import './index.css'
import 'flag-icons/css/flag-icons.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
