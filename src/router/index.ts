import { createRouter, createWebHistory } from 'vue-router'
import AddTrip from '../components/AddTrip.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

  { 
      path: '/add-trip-popup-1',
      name: 'AddTrip',
      component: AddTrip
  },

  ]
})
export default router
