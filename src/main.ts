import './index.css'
import 'flag-icons/css/flag-icons.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'



import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';


const script = document.createElement('script');
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

if (typeof googleMapsApiKey === 'string') {
    script.src = googleMapsApiKey;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
} else {
    console.error('Google Maps API key is not defined');
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
