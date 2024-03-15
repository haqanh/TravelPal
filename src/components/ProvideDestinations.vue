<template>
  <div class="flex flex-col justify-between shadow-2xl rounded-3xl max-h-[600px] max-w-[600px]">
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

    <div class="flex justify-between mt-auto w-11/12 mx-auto mb-4">
      <div class="flex cursor-pointer">
        <svg class="w-7 h-7 mt-0.5 text-customBlue dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        <p class="ml-2 text-xl text-customBlue">Back</p>
      </div>
      <div class="flex justify-between w-36 pt-1">
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-blue-500 w-5 h-5"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
      </div>
      <div class="flex cursor-pointer">
        <div class="mr-2 text-xl text-customBlue">Next</div>
        <svg class="w-7 h-7 mt-0.5 text-customBlue dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import SearchCountries from './SearchCountries.vue';
</script>