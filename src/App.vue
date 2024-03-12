<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
<div className="LandingPage">
  <img className="object-cover block bg-center w-screen h-screen opacity-100" src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
  <div className="Rectangle w-full h-full left-0 top-0 absolute bg-black bg-opacity-25" />
  <div className="container ml-20 pl-16 block">  
    <img className="Logo w-32 h-32 left-[73px] top-[376px] absolute shadow" src='./assets/logo.svg'/>
    <div className="TravelPal w-96 h-48 left-[227px] top-[376px] absolute text-white text-9xl font-semibold font-['Poppins']">TravelPal</div>
    <div className="Slogan h-20 left-[73px] top-[525px] absolute">
      <span className="text-white text-5xl font-semibold font-['Poppins']">Journey Together, </span><span className="text-yellow-600 text-5xl font-semibold font-['Poppins']">Share Forever </span>
    </div>
    <button className="Rectangle1 w-60 h-16 left-[73px] top-[612px] absolute bg-yellow-600 hover:bg-yellow-700 rounded-full shadow text-white hover:text-gray-100 text-2xl text-center font-semibold font-['Poppins']"> Start Traveling </button> 
    
  </div>
  
</div>
</template>

<style scoped>

</style>