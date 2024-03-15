<template>
  <div class="text-center">
    <div class="border-b-2 border-gray-400 pt-8 pb-6">
      <p class="font-bold text-3xl w-9/12 mx-auto">Share the top countries you want to visit!</p>
    </div>
    <div class="py-5">
      <p class="w-8/12 m-auto text-xl mb-2">We will help you create a bucket list of the top countries you want to visit.</p>
    </div>
    <div class="w-10/12 m-auto h-[290px] mb-6 flex justify-between">
      <SearchCountries />
    </div>
  </div>
</template>

<script setup>
import SearchCountries from './SearchCountries.vue';
</script>