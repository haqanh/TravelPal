import { createRouter, createWebHistory } from 'vue-router'
import AddGuide2 from '../components/AddGuide2.vue'
import GuideView from '../views/GuideView.vue'
import AddTrip from '../components/AddTrip.vue'
import EditTrip from '../components/EditTripFirstPopUp.vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LandingPage from '@/views/LandingPage.vue'
import ViewTrip from '../views/ViewTrip.vue'
import Explore from '../views/ExploreView.vue';
import UserProfilingView from '../views/UserProfilingView.vue'
import Dashboard from '../views/DashboardView.vue'
import UserProfile from '../views/UserProfile.vue'
import FavouritesView from '../views/FavouritesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/add-trip',
      name: 'AddTrip',
      component: AddTrip,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/add-guide/second',
      name: 'AddGuide2',
      component: AddGuide2,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/guide/:docRef',
      name: 'GuideView',
      component: GuideView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/userprofiling',
      name: 'userprofiling',
      component: UserProfilingView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/viewtrip/:id', 
      name: 'viewtrip',
      component: ViewTrip,
      props: true
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavouritesView,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/explore',
      name: 'explore',
      component: Explore,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/edit-trip',
      name: 'edit-trip',
      component: EditTrip,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: UserProfile,
      meta: {
        requiresAuth: true,
      }
    }
  ]
})

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
