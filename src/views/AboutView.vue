<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useRouter } from 'vue-router'

import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import MapInput from '../components/MapInput.vue'
import MapDisplay from '../components/MapDisplay.vue'
import GuideComponent from '../components/GuideComponent.vue'

const router = useRouter()

const isLoggedIn = ref(false);

let auth : any;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/');
  });
};


</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="m-5" @click="handleSignOut">Sign Out</button>
    <router-view></router-view>
    <MapInput />

    <div className ="justify-center align-middle m-10 "> 

  </div>
  
  </div>

  <div className="m-10">
    <GuideComponent /> 
  </div>

  
  
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

