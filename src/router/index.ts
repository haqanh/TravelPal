import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from '@/views/LandingPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true,
      }
      
    }
  ]
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), 
    (user) => {
      removeListener();
      resolve(user);
    }, reject);
  });
  
};

router.beforeEach(async(to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    if (await getCurrentUser()) {
      next();
    } else {
      next("/"); // if not logged in, redirect to landing page
    }
  } else {
    next(); // if logged in, redirect to about page
  }   
});

export default router
