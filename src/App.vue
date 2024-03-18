<script setup lang="ts">
import { RouterView } from 'vue-router'

import { onMounted, ref } from 'vue'
import { getAuth, onAuthStateChanged } from "firebase/auth";

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



</script>

<template>

<router-view></router-view>
</template>

<style scoped>

</style>
