<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import ViewTrip from '@/views/ViewTrip.vue'
</script>

<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- <NavBar />
    <SideBar /> -->
    <ViewTrip />
    <RouterView />
  </div>
</template>

<style>
#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  margin: 0 auto;
  display: block;
  background-color: white;
}
</style>
