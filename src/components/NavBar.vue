<template>

  <nav class="top-0 z-50 bg-white bg-opacity-0 backdrop-filter backdrop-blur-lg border-gray-200">

    <div class="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3">
      <div class="flex justify-between h-16 items-center">
        <div class="flex space-x-4">
          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
          <!-- End Mobile Menu Button -->
          <div class="hidden md:flex items-center space-x-4">
            <a
              href="/dashboard"
              class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md font-bold"
              >TravelPal</a
            >
            <a
              href="/dashboard"
              class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
              >Home</a
            >
            <a
              href="/explore"
              class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
              >Explore</a
            >
            <a
              href="/favourites"
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
          <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
            v-on:enter-cancelled="enterCancelled"
            v-on:before-leave="beforeLeave"
            v-on:leave="leave"
            v-on:after-leave="afterLeave"
            v-on:level-cancelled="leaveCancelled"
            v-bind:css="false"
          >
            <div
              v-show="dropdownOpen"
              class="dropdown-menu absolute bg-white text-gray-700 rounded-lg shadow-lg w-48 mt-2"
            >
              <a href="#" class="block px-4 py-2 hover:bg-gray-100 rounded-lg">Your Profile</a>
              <a href="/" class="block px-4 py-2 hover:bg-gray-100 rounded-lg">Logout</a>
            </div>
          </transition>
        </div>
      </div>
      <!-- Mobile Menu -->
      <div v-show="mobileMenuOpen" class="md:hidden">
        <a
          href="/viewtrip"
          class="block text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md font-bold"
          >TravelPal</a
        >
        <a
          href="/"
          class="block text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
          >Home</a
        >
        <a
          href="#"
          class="block text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
          >Explore</a
        >
        <a
          href="#"
          class="block text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
          >Favourites</a
        >
        <a
          href="#"
          class="block text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white px-3 py-2 rounded-md"
          >Help</a
        >
      </div>
      <!-- End Mobile Menu -->
    </div>
  </nav>
</template>

<script lang="ts">
export default {
  data() {
    return {
      dropdownOpen: false,
      mobileMenuOpen: false // Added for mobile menu toggle
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    toggleMobileMenu() {
      // Method to toggle mobile menu
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeDropdown() {
      this.dropdownOpen = false
    },

    beforeEnter(el) {
      el.style.height = 0;
      el.style.overflow = "hidden";
    },
    enter(el, done) {
      const increaseHeight = () => {
        if (el.clientHeight < el.scrollHeight) {
          const height = `${parseInt(el.style.height) + 5}px`;
          el.style.height = height;
        } else {
          clearInterval(this.enterInterval);
          done();
        }
      };
      this.enterInterval = setInterval(increaseHeight, 10);
    },
    afterEnter(el) {},
    enterCancelled(el) {
      clearInterval(this.enterInterval);
    },
    beforeLeave(el) {},
    leave(el, done) {
      const decreaseHeight = () => {
        if (el.clientHeight > 0) {
          const height = `${parseInt(el.style.height) - 5}px`;
          el.style.height = height;
        } else {
          clearInterval(this.leaveInterval);
          done();
        }
      };
      this.leaveInterval = setInterval(decreaseHeight, 10);
    },
    afterLeave(el) {},
    leaveCancelled(el) {
      clearInterval(this.leaveInterval);
    },
  }
}
</script>

<style>
.dropdown-toggle {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  max-height: 100vh; /* Set to a large value */
  overflow: hidden;
  transition: max-height 0.3s ease; /* Increased duration to 0.6s */
}

.dropdown-menu.slide-enter-active,
.dropdown-menu.slide-leave-active {
  transition: max-height 0.3s ease; /* Increased duration to 0.6s */
}

.dropdown-menu.slide-enter,
.dropdown-menu.slide-leave-to {
  max-height: 0;
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
