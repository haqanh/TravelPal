import { createRouter, createWebHistory } from 'vue-router'
import AddGuide1 from '../components/AddGuide1.vue'
import AddGuide2 from '../components/AddGuide2.vue'
import GuideView from '../views/GuideView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/add-guide',
      name: 'AddGuide1',
      component: AddGuide1,
    },
    {
      path: '/add-guide/second',
      name: 'AddGuide2',
      component: AddGuide2,
    },
    {
      path: '/guide-view',
      name: 'GuideView',
      component: GuideView,
    },
  ]
})

export default router
