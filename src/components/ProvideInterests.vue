<template>
  <div class="text-center">
    <div class="border-b-2 border-gray-400 pt-8 pb-6">
      <p class="font-bold text-3xl w-9/12 mx-auto">Share your interests!</p>
    </div>
    <div class="py-5">
      <p class="w-9/12 m-auto text-xl mb-2">We will use this information to provide you with more personalized recommendations.</p>
    </div>
    <div class="w-full m-auto h-[290px] mb-6 flex justify-center">
      <SearchInterests />
    </div>
  </div>
</template>

<script setup>
import SearchInterests from './SearchInterests.vue';
</script>