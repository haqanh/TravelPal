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
    <div class="fixed inset-0 flex items-center justify-center shadow-lg rounded-2xl">
      <div class="lg:w-100 xl:h-100 lg:h-80 text-center border-2 rounded-[4rem] shadow-lg p-8 flex flex-col justify-between bg-white">
        <div class="flex items-center justify-start xl:h-20">
          <img src="../assets/Delete Warning.svg" class="mt-2 w-auto h-auto">
          <p class="mt-[1vw] ml-[1vw] justify-center xl:text-4xl font-bold text-gray-800">
            Confirm Deletion
          </p>
        </div>
        <div class="flex flex-col items-center justify-center w-[30vw] h-[5vh] gap-[2vw] mt-[3.5vw]">
          <p class="xl:text-xl text-[#3F3D3D] text-left ml-[1vw] font-medium ">
            Are you sure you would like to delete <strong>{{name}}</strong>? This action cannot be undone.
          </p>
        </div>
        <div class="flex justify-end gap-4 mt-[1.7vw]">
            <button type="button" @click="handleCancel" class="px-1 py-1 rounded-xl text-[#3F3D3D] border border-[#3F3D3D] undefined hover:bg-gray-300 focus:ring-gray-500 focus:ring-offset-gray-200 transition ease-in duration-200 text-center text-l font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
                Cancel
            </button>
            <button type="button" @click="handleDelete" class="px-1 py-1 rounded-xl text-[#D80027] border border-[#D80027] undefined hover:bg-red-200 focus:ring-red-500 focus:ring-offset-red-200 transition ease-in duration-200 text-center text-l font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2">
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
    type: {
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
      if (this.type == "trip") {
        console.log('Delete Trip');
        this.$emit('delTrip');
        this.isOpen = false;
      } else if (this.type  == "guide") {
        console.log('Delete Guide');
        this.$emit('delGuide');
        this.isOpen = false;
      }
    },
    handleCancel() {
      if (this.type == "trip") {
        console.log('Close Delete');
        this.isOpen = false;
        this.$emit('closeDelTrip');
      } else if (this.type  == "guide") {
        console.log('Close Delete');
        this.isOpen = false;
        this.$emit('closeDelGuide');
      }
    },
  },
};
  </script>
  