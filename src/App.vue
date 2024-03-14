<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRouter } from 'vue-router'
import LandingPage from './views/LandingPage.vue'

import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const router = useRouter()

const isLoggedIn = ref(false);

let auth;

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
<!--button @click="handleSignOut">Sign Out</button-->
<router-view></router-view>
</template>

<style scoped>

</style>