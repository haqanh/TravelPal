<template>
  <div class="NavBarImage pointer-events-none">
    <NavBar />
  </div>
  <div class="flex pointer-events-none">
    <SideBar />
    <div class="w-full p-10 my-10 mx-10">
      <div class="DashboardContents flex flex-col lg:flex-row justify-between lg:items-center -mx-10">
          <h1 class="text-[60px] font-semibold text-[#3F3D3D] mx-10">Home</h1>
          <div class="relative flex items-center w-full h-full lg:w-96 group mt-4 lg:mt-0">
              <svg class="absolute left-0 z-20 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
              </svg>
              <input type="text" class="block w-full py-3 pl-10 pr-4 leading-normal rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-[#3F3D3D] aa-input" placeholder="Search"/>
          </div>
      </div>
      <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
          <h1 class="text-[2vw] font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">My Travels</h1>
          <div class="border-b border-[#D9D9D9] w-3/5 mx-5 ml-20 flex-shrink-0"></div>
          <button class="flex-shrink-0">
              <img src="../assets/Add Button.svg" alt="Add Trip" />
          </button>
      </div>
      <div class="TripCardWrapper grid grid-cols-4 min-w-full gap-8">
          <!-- <TripCard />
          <TripCard />
          <TripCard />
          <TripCard /> -->
      </div>
      <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
          <h1 class="text-[2vw] font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">My Guides</h1>
          <div class="border-b border-[#D9D9D9] w-3/5 mx-5 ml-20 flex-shrink-0"></div>
          <button class="flex-shrink-0" @click="toggleAddGuide">
              <img src="../assets/Add Button.svg" alt="Add Guide" />
          </button>
      </div>
      <AddGuide v-if="showAddGuide" @close="resetAddGuide"/>
      <div class="GuideCardWrapper grid grid-cols-4 min-w-full gap-8">
          <!-- <GuideCard /> -->
      </div>
  </div>
  </div> 
</template>

<script lang="ts">
import NavBar from './NavBar.vue'
import SideBar from './SideBar.vue'
import AddGuide from './AddGuideBtn.vue'

export default {
  components: {
    NavBar,
    SideBar,
    AddGuide,
  },
  data() {
    return {
      showAddGuide: false
    }
  },
  methods: {
    toggleAddGuide() {
      this.showAddGuide = !this.showAddGuide
    },
      resetAddGuide() {
          this.showAddGuide = false
      },
  },
}
</script>

<style scoped>
.NavBarImage {
  background-image: url('@/assets/forest.jpg');
  background-size: cover;
  background-position: center;
}
</style>
