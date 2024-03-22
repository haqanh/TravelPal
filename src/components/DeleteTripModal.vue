<template>
    <div class="fixed inset-0 flex items-center justify-center bg-white shadow-lg rounded-2xl dark:bg-gray-800">
      <div class="w-1/2 h-auto text-center border-2 rounded-[4rem] shadow-lg p-10 flex flex-col justify-between">
        <div class="flex flex-row items-center justify-start mr-8 h-full">
          <img src="../assets/Delete Warning.svg" class="w-25 h-25">
          <p class="mt-4 ml-4 justify-center text-[40px] font-bold text-gray-800 dark:text-gray-200">
            Confirm Deletion
          </p>
        </div>
        <div class="flex flex-col items-center justify-center w-full h-full gap-4 mt-8">
          <p class="text-[22px] text-[#3F3D3D] text-left dark:text-gray-400 font-medium ">
            Are you sure you would like to delete <strong>Alpine Ascents</strong>? This action cannot be undone.
          </p>
        </div>
        <div class="flex justify-end gap-4 mt-10">
            <button type="button" @click="handleCancel" class="px-2 py-2 rounded-xl text-[#3F3D3D] border border-[#3F3D3D] undefined hover:bg-gray-300 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                Cancel
            </button>
            <button type="button" @click="handleDelete" class="px-2 py-2 rounded-xl text-[#D80027] border border-[#D80027] undefined hover:bg-red-200 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                Delete
            </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isOpen = ref(true)
  
  function handleDelete() {
    // Connect to Firebase for Delete functionality here
    console.log('Delete Trip')
  }
  
  function handleCancel() {
    // Close the modal
    isOpen.value = false
    console.log('Cancel Deletion')
  }
  </script>
  