<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
    >
    <div v-if="isVisible" class="background">
      <div class="flex">
        <div class="flex flex-col m-2 w-1/2">
          <div class="flex relative">
            <span class="bar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">

                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </span>

            <!-- Location Input -->
            <label for="location">
              <input ref="location_input" @keyup.enter="updateLocation" @input="updateLocation($event.target.value, place)" v-model= "location" type="text" id="location" class="input_style" name="location" placeholder="Location" />
            </label>
          </div>
          <br />

          <div class="flex relative">
            <span class="bar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
              </svg>
            </span>
        
          
            <div class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-1/2 p-1 mr-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent">

              <!-- Tag Inputs that are rendered once selected-->
              <div class="flex-wrap flex">
                <div v-for="tag in selectedTags" :key="tag" class="mr-2 mb-2 relative flex items-center hover:text-gray-700 cursor-pointer" @mouseover="hovering = tag" @mouseleave="hovering = null">
                  <GlobalTag :tagCategory="tag"/>
                  <span @click="removeTag(tag)" class="ml-1 text-sm text-gray-400 hover:text-gray-700 cursor-pointer" v-show="hovering === tag">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </span>
                  
                </div>
              </div>
              <!-- Tag Options Dropdown -->
              <div class="relative" @click="dropdownOpen = !dropdownOpen">
                  <button
                    class="py-2 px-3 w-full hover:bg-gray-700 hover:bg-opacity-10 flex items-center gap-2 rounded"
                  >
                    <span class="text-gray-400">Select Tags</span>
                      <img v-if="!dropdownOpen" src="../assets/ChevronDown.svg" alt="chevron" width="30" height="30" fill="currentColor" viewbox="0 0 24 24" class="pointer-events-none absolute right-0 flex items-center pr-3">
                      <img v-if="dropdownOpen" src="../assets/ChevronUp.svg" alt="chevron" width="30" height="30" fill="currentColor" viewbox="0 0 24 24" class="pointer-events-none absolute right-0 flex items-center pr-3">
                    
                  </button>
                  <div v-if="dropdownOpen" class="relative bg-white mt-2 w-64 rounded-md">
                    <ul class="py-1 text-base leading-6 rounded-md shadow-xs overflow-auto max-h-60">
                      <li v-for="tag in tagOptions" :key="tag" @click="selectTag(tag)" class="mb-2 text-gray-700 cursor-pointer select-none relative py-2 pr-9 hover:bg-gray-300 hover:text-white rounded-md">
                        <span class="font-normal ml-2block truncate">
                          <GlobalTag :key='tag' :tagCategory='tag'/>  
                        </span>
                      </li>
                    </ul>
                  </div>
              </div>
              
            </div>
            
          </div>
          <br />


          <div class="flex relative">
            <span class="bar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
            </span>

            <!-- Update Cost -->
            <label class="text-neutral-700" for="cost">
              <input @keyup.enter="updateCost" @input="updateCost($event.target.value, place)" v-model="cost" type="cost" id="cost" class="input_style" name="cost" placeholder="Add Cost" />

            </label>
          </div>
        </div>
        <br />

        <div class="flex flex-col m-2 w-1/2">
          <div class="items-center justify-center w-full">
            <label 
              :for="'dropzone-file-' + id + count" 
              class="flex flex-col items-center justify-center rounded-lg cursor-pointer bg-gray-500 p-2 bg-opacity-0"
              :class="{

                'hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600': !selectedPhoto,

                'border border-gray-300 border-dashed': !selectedPhoto
              }"
              @contextmenu.prevent="confirmRemove"
            >

            <!-- Photo Input -->

            <div class="flex flex-col items-center justify-center w-52 h-40">
                <!-- Show uploaded image or camera icon based on whether an image has been uploaded -->
                <img v-if="selectedPhoto" :src="selectedPhoto" alt="Uploaded Image" class="object-cover rounded-lg w-52 h-40">
                <template v-else>
                  <img class="text-gray-500 dark:text-gray-400" aria-hidden="true" src="../assets/Camera.svg">
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Add Photo</p>
                </template>
            </div>
            <input :id="'dropzone-file-' + id + count" type="file" class="hidden"  @change="handleFileChange" accept=".jpg, .jpeg, .png"/>
            </label>
          </div> 
        </div>
      </div>

      <div class="flex flex-row m-2">
        <div class="flex w-full">
              <span
                  class="rounded-l-md inline-flex items-center pl-3 pr-2 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm;">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                  </svg>
              </span>
              <!-- Summary Input -->
              <div class="w-full">
                  <label for="summary">
                      <textarea @keyup.enter="updateSummary" @input="updateSummary($event.target.value, place)" v-model= "summary" type="text" id="summary"
                          class="input_style"
                          name="summary" placeholder="Write a short summary" />

                  </label>
              </div>
          </div>
      </div>
      <br />
    </div>
    </transition>
</template>

<style>
.background {
  @apply flex-col w-full flex bg-gray-500 p-2 bg-opacity-10 rounded-[20px] shadow;
}

.bar {
  @apply rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm;
}

.input_style {
  @apply mr-8 flex-auto flex items-center rounded-r-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-white shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent
}
</style>

<script>

import GlobalTag from './GlobalTag.vue';
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

export default {
  components: {
    GlobalTag,
  },
  data() {
    return {
        location: '',
        cost: '',
        summary: '',
        selectedPhoto: null,
        isVisible: false,
        count: 1,
        tagOptions: ['City', 'Nature', 'Culture', 'Entertainment', 'Food', 'Landmarks', 'Adventure', 'History', 'Science', 'Technology', 'Sports', 'Health', 'Fashion', 'Education', 'Travel', 'Art'], 
        dropdownOpen: false,
        selectedTags:[],
        hovering: null,
        lat: 0,
        lng: 0,
    };
  },
  methods: {
    updateLocation() {
      this.$emit('location-updated', this.location);
    },
    updateCost() {
      this.$emit('cost-updated', this.cost);
    },
    updateSummary() {
      this.$emit('summary-updated', this.summary);
    },

    handleFileChange(event) {
      const $toast = useToast();
      const file = event.target.files[0];
      this.count++;
      if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedPhoto = e.target.result;
          this.$emit('photo-updated', this.selectedPhoto);

        };
        reader.readAsDataURL(file);
        console.log(this.selectedPhoto);
      } else {
        // Reset selectedPhoto or show error message
        this.selectedPhoto = null;
        $toast.error('Please select a JPEG, JPG, or PNG file.', {
          position: 'top'
        })
      }
    },
    confirmRemove(event) {
      event.preventDefault();
      if (confirm('Are you sure you want to remove the image?')) {
        this.selectedPhoto = null;
      }
    },
    selectTag(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.$emit('update-selectedTags', this.selectedTags);
      }
    },
    removeTag(currTag) {
      this.selectedTags = this.selectedTags.filter(tag => tag !== currTag);
    },
  },      
  mounted() {
    this.isVisible = true;
    this.$nextTick(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.$refs.location_input, {
        fields: ['geometry.location', 'place_id', 'name', 'formatted_address'],
        types: ['geocode']
      })

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace()
        this.location = place.formatted_address;
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
        console.log(this.location);
        console.log("Place:", this.lat, this.lng);
        this.$emit('location-updated', this.location);
        this.$emit('lat-updated', this.lat);
        this.$emit('lng-updated', this.lng);
      })
    })
  },
  props:['id'],
};
</script>