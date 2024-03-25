<template>
  <nav
    class="top-0 sticky z-0 bg-white bg-opacity-0 backdrop-filter backdrop-blur-lg border-gray-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex space-x-4">
          <div class="hidden md:block">
            <div class="flex items-center space-x-4">
              <a
                href="/viewtrip"
                class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md font-bold"
                >TravelPal</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
                >Home</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
                >Explore</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
                >Favourites</a
              >
              <a
                href="#"
                class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
                >Help</a
              >
            </div>
          </div>
        </div>
        <div class="relative" @click="toggleDropdown">
          <button
            class="dropdown-toggle py-2 px-3 hover:bg-gray-700 hover:bg-opacity-10 flex items-center gap-2 rounded"
          >
            <span class="text-gray-300">User Profile</span>
            <svg
              class="w-3 h-3 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>chevron-down</title>
              <g fill="none">
                <path
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
          </button>
          <div
            v-show="dropdownOpen"
            class="dropdown-menu absolute bg-white text-gray-700 rounded-lg shadow-lg w-48 mt-2"
          >
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded-lg">Your Profile</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded-lg">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
      console.log(this.dropdownOpen)
    }
  }
}
</script>

<style>
.dropdown-toggle {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-menu a {
  display: block;
  padding: 10px 20px;
  transition: background-color 0.3s ease;
}

.dropdown-menu a:hover {
  background-color: #f0f0f0;
}
</style>
