import { createRouter, createWebHistory } from 'vue-router'
import AddGuide2 from '../components/AddGuide2.vue'
import GuideView from '../views/GuideView.vue'
import AddTrip from '../components/AddTrip.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from '@/views/LandingPage.vue'

import Home from '../views/Home.vue'
import ViewTrip from '../views/ViewTrip.vue'
import Sidebar from '../components/SideBar.vue'
import UserProfiling from '../components/UserProfiling.vue'

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
      
    },
    { 
      path: '/add-trip-popup-1',
      name: 'AddTrip',
      component: AddTrip
  }, {
    path: '/add-guide/second',
      name: 'AddGuide2',
      component: AddGuide2,
    },
    {
      path: '/guide-view',
      name: 'GuideView',
      component: GuideView,
    },
    {
      path: '/viewtrip',
      name: 'viewtrip',
      component: ViewTrip
    },
    { path: '/sidebar',
      name: 'sidebar',
      component: Sidebar
  },
  {
    path: '/userprofiling',
    name: 'userprofiling',
    component: UserProfiling
  },
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
