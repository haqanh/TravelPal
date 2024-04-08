<template>
  <TransitionRoot appear as="template" :show="isOpen">
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
    <div class="fixed inset-0 flex items-center justify-center shadow-lg rounded-2xl dark:bg-gray-800">
      <div class="w-[40vw] h-[40vh] text-center border-2 rounded-[4rem] shadow-lg p-8 flex flex-col justify-between bg-white">
        <div class="flex items-center justify-start h-[10vh]">
          <img src="../assets/Delete Warning.svg" class="mt-[1.5vh] w-[8vw] h-[8vw]">
          <p class="mt-[1vw] ml-[1vw] justify-center text-[2.5vw] font-bold text-gray-800 dark:text-gray-200">
            Confirm Deletion
          </p>
        </div>
        <div class="flex flex-col items-center justify-center w-[30vw] h-[5vh] gap-[2vw] mt-[3.5vw]">
          <p class="text-[1.3vw] text-[#3F3D3D] text-left ml-[1vw] dark:text-gray-400 font-medium ">
            Are you sure you would like to delete <strong>{{name}}</strong>? This action cannot be undone.
          </p>
        </div>
        <div class="flex justify-end gap-4 mt-[1.7vw]">
            <button type="button" @click="handleCancel" class="px-1 py-1 rounded-xl text-[#3F3D3D] border border-[#3F3D3D] undefined hover:bg-gray-300 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 text-center text-[1vw] font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                Cancel
            </button>
            <button type="button" @click="handleDelete" class="px-1 py-1 rounded-xl text-[#D80027] border border-[#D80027] undefined hover:bg-red-200 focus:ring-indigo-500 focus:ring-offset-indigo-200 transition ease-in duration-200 text-center text-[1vw] font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                Delete
            </button>
        </div>
      </div>
    </div>
  </TransitionRoot>
  </template>
  
<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    handleDelete() {
      console.log('Delete Trip');
      this.$emit('del');
      this.isOpen = false;
    },
    handleCancel() {
      // Close the modal
      this.isOpen = false;
      console.log('Cancel Deletion');
      this.$emit('closeDel');
    },
  },
};
  </script>
  