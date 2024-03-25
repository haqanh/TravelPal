<template>
  <TransitionRoot appear :show="isfirstDialog" as="template">
    <HeadlessDialog as="div" class="relative">
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

      <div class="fixed inset-0 flex items-center justify-center overflow-y-auto" v-if="isfirstDialog">
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
              class="h-auto max-w-3xl overflow-y-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all scrollbar"
            >
              <DialogTitle
                as="h3"
                class="text-center text-lg font-medium leading-6 text-[#3F3D3D] font-semibold text-[26px]"
              >
                Add Trip
              </DialogTitle>
              <button class="absolute top-4 right-4" @click="closeDialog">
                <img src="../assets/Multiply.svg" alt="Close Icon" class="w-4 h-4">
              </button>
              <div class="mt-2">
            <form>
              <div class="mb-4 text-center relative">
                <!-- Hidden file input to trigger file selection -->
                <input type="file" id="photo-input" accept=".jpg, .jpeg, .png" class="hidden" @change="handleFileChange">
                
                <!-- Label for the file input, shows the camera icon if no photo selected -->
                <label
                  for="photo-input"
                  class="relative ml-40 mr-40 mt-5 h-20 w-15 flex items-center justify-center cursor-pointer overflow-hidden rounded-lg"
                  :class="{ 'border border-dashed border-gray-500 rounded-lg dark:hover:bg-bray-800 dark:bg-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600': !selectedPhoto }"
                >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <img v-if="selectedPhoto" :src="selectedPhoto" alt="Selected Photo" class="h-auto w-auto object-cover cursor-pointer" @click="openFileInput">
                    <div v-else class="flex flex-col items-center justify-center">
                      <img src="../assets/Camera.svg" alt="Add Photo" class="h-7 w-7 mb-1 mx-auto">
                      <p class="text-sm text-[#3F3D3D] font-semibold">Add Photos</p>
                    </div>
                  </div>
                </label>
              </div>

                <!-- Trip Name Input -->
                <div class="mb-4">
                <div class="flex relative ">
                    <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <img src= "../assets/Trip Tag.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                    </span>
                    <input type="text" id="trip-name-with-icon" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="email" placeholder="Trip Name"/>
                    </div>
                </div>

                <!-- Trip Location Dropdown -->
                <div class="mb-4">
                    <div class="flex relative">
                        <span class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                            <img src="../assets/Airplane Take Off.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                        </span>
                        <input type="text" id="trip-location-with-icon" class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="location" placeholder="Where?" />
                    </div>
                </div>


                <!-- Select Dates Inputs -->
                <div class="mb-4">
                  <div class="flex items-center mb-2">
                      <div class="text-[#3F3D3D] text-lg font-semibold mr-2 font-[20px]">Dates</div>
                      <div class="mr-2">
                          <img src="../assets/Calendar.svg" alt="Calendar Icon" class="w-6 h-6">
                      </div>
                  </div>

                  <div date-rangepicker class="flex items-center">
                    <div class="relative">
                      <Datepicker v-model="selectedStartDate" :show="showStartDatepicker" @update:show="val => showStartDatepicker = val" class="border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="clearStartDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-4 h-4">
                        </div>
                      </div>
                      <span class="mx-4 text-gray-500">-</span>
                      <div class="relative">
                        <Datepicker v-model="selectedEndDate" :show="showEndDatepicker" @update:show="val => showEndDatepicker = val" class="border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" @click="clearEndDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-4 h-4">
                        </div>
                      </div>
                  </div>
              </div>
                
              <!-- Cost Input -->
                <div class="mb-4">
                <label for="cost" class="text-[#3F3D3D] text-lg font-semibold mr-2 font-[20px]">
                    Cost
                </label>
                <div class="mb-4">
                <div class="flex relative">
                    <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <img src= "../assets/Stack Of Coins.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                    </span>
                    <input type="text" id="cost-input" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="cost" placeholder="Cost (In SGD)"/>
                    </div>
                </div>
                </div>
            </form>
            </div>


              <div class="mt-4 text-center font-[]">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-lg border border-[#C1C1C1] border-2 shadow-lg px-3 py-1 text-sm font-regular text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2"
                  @click="navigateToNextStep"
                >
                  Next
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
  <AddTripSecondPopUp v-if="isSecondDialog" @closetrip="closeDialog" />
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import AddTripSecondPopUp from './AddTripSecondPopUp.vue'
import Datepicker from 'vue3-datepicker';

export default {
  data() {
    return {
      isfirstDialog: true,
      isSecondDialog: false,
      selectedPhoto: null,
      selectedStartDate: null,
      selectedEndDate: null,
      showStartDatepicker: false,
      showEndDatepicker: false,
    }
  },
  methods: {
    clearStartDate() {
      this.selectedStartDate = null;
    },
    clearEndDate() {
      this.selectedEndDate = null;
    },
    navigateToNextStep() {
      this.isfirstDialog = false;
      this.isSecondDialog = true;
    },
    closeDialog() {
      this.$emit('closetrip')
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        // Reset selectedPhoto or show error message
        this.selectedPhoto = null;
        alert('Please select a JPEG or JPG or PNG file.');
      }
    }
  },
  components: {
    TransitionRoot,
    TransitionChild,
    HeadlessDialog,
    DialogPanel,
    DialogTitle,
    AddTripSecondPopUp,
    Datepicker,
  }
}
</script>

<style>
  .scrollbar::-webkit-scrollbar {
    width: 10px; 
    height: 10px; 
  }

  .scrollbar::-webkit-scrollbar-track {
    background: transparent; 
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 8px;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  .scrollbar::-webkit-scrollbar-button {
    display: none; 
  }
</style>


