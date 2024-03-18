import './index.css'
import 'flag-icons/css/flag-icons.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import firebase from "firebase/compat/app";

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCEXLBj3MqQi4DmEtt_kvdVNhBBp6E88kQ",
    authDomain: "travelpal-bt3103.firebaseapp.com",
    projectId: "travelpal-bt3103",
    storageBucket: "travelpal-bt3103.appspot.com",
    messagingSenderId: "356625691288",
    appId: "1:356625691288:web:0547868dfe171ffa8dd6ed"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastPlugin)

app.mount('#app')
