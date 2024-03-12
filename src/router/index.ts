import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ViewTrip from '../views/ViewTrip.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/viewtrip',
      name: 'viewtrip',
      component: ViewTrip
    }
  ]
})

export default router
