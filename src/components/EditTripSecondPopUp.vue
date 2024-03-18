<template>
    <TransitionRoot appear :show="isOpen"  as="template" v-if="isOpen">
        <Dialog as="div" class="relative z-10">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>
          <div class="fixed inset-0 flex items-center justify-center overflow-y-auto">
            <div class="p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="h-auto max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl"
                >
                  <DialogTitle
                    as="h3"
                    class="mb-5 text-center text-lg font-medium leading-6 text-[#3F3D3D] font-semibold text-[26px]"
                  >
                    Edit Trip
                  </DialogTitle>
                  <button class="absolute top-4 right-4" @click="closeModal">
                    <img src="../assets/Multiply.svg" alt="Close Icon" class="w-4 h-4">
                  </button>
                  <div class="mt-2">
                <form>
                    <div class="mb-10">
                    <div class="flex relative">
                        <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <img src= "../assets/Align Left.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                </path>
                        </span>
                        <textarea type="text" id="summary" class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-[455px] h-[200px] py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="email" placeholder="Write a short summary"></textarea>
                        </div>
                    </div>
    
                    <!-- Trip Tags Dropdown -->
                    <div class="mb-20">
                        <div class="flex relative">
                            <span class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                                <img src="../assets/Add Tag.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                            </span>
                            <input type="text" id="add-tags" class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="location" placeholder="Add Tags" />
                        </div>
                    </div>
                </form>
                </div>
    
    
                  <div class="mt-4 text-center">
                    <button
                      type="button"
                      class="inline-flex justify-center rounded-lg border border-[#C1C1C1] border-2 shadow-lg px-3 py-1 text-sm font-regular text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2"
                      @click="closeModal"
                    >
                      Save Trip
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
      </template>
      
      <script setup>
      import { ref } from 'vue'
      import {
        TransitionRoot,
        TransitionChild,
        Dialog,
        DialogPanel,
        DialogTitle,
      } from '@headlessui/vue'
      
      const isOpen = ref(true)
      
      function closeModal() {
        isOpen.value = false
      }
      </script>
      