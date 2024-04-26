<template>
  <nav class="top-0 z-50 bg-white bg-opacity-0 backdrop-filter backdrop-blur-lg border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between h-16 items-center">
        <div class="flex">
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
              class="text-gray-300 hover:bg-gray-700 hover:bg-opacity-10 hover:text-white py-2 rounded-md font-bold"
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
            <!-- <span class="text-gray-300">User Profile</span> -->
            <!-- Check if there is a selected photo -->
            <!-- Check if there is a selected photo -->
            <img
              v-if="selectedPhoto"
              :src="selectedPhoto"
              alt="Profile Picture"
              class="h-8 w-8 rounded-full object-cover"
            />
            <img v-else :src="defaultAvatar" alt="Default Avatar" class="h-8 w-8 rounded-full" />

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
              class="dropdown-menu absolute right-0 bg-white text-gray-700 rounded-lg shadow-lg w-48 mt-2"
            >
              <a href="/profile" class="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                >Your Profile</a
              >
              <a
                href="#"
                class="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                @click.prevent="logout"
                >Logout</a
              >
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
import { firebaseApp } from '@/firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth'; // Corrected type-only import for User
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import defaultAvatar from '@/assets/DefaultAvatar.png';

// If User type from firebase is not nullable, create an extended type
type NullableUser = User | null;

export default {
  data() {
    return {
      dropdownOpen: false,
      mobileMenuOpen: false,
      selectedPhoto: '', // Changed to a string to hold a single photo URL
      user: null as NullableUser, // Now explicitly nullable
      defaultAvatar: defaultAvatar, // Add this line
      enterInterval: 0 as number, // Add this line for enter interval ID
      leaveInterval: 0 as number, // Add this line for leave interval ID
    };
  },
  created() {
    this.setupAuthListener();
  },
  methods: {
    setupAuthListener() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user: NullableUser) => {
        if (user) {
          this.user = user;
          this.fetchAndRenderImage(user);
        } else {
          // User is signed out
          this.selectedPhoto = '';
        }
      });
    },
    async fetchAndRenderImage(user: User) {
      const storage = getStorage(firebaseApp);
      const fileRef = ref(storage, `users/${user.email}/profile_pic/profile_pic.jpg`);

      try {
        const fileUrl = await getDownloadURL(fileRef);
        this.selectedPhoto = fileUrl;
      } catch (err) {
        this.selectedPhoto = this.defaultAvatar; // Use the imported default avatar
      }
    },
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.replace('/'); // Redirect to homepage or login page after logout
        })
        .catch((error) => {
          console.error('Logout Failed', error);
        });
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleMobileMenu() {
      // Method to toggle mobile menu
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeDropdown() {
      this.dropdownOpen = false;
    },
    beforeEnter(el: Element) {
      (el as HTMLElement).style.height = '0';
      (el as HTMLElement).style.overflow = 'hidden';
    },
    enter(el: Element, done?: () => void) {
      const increaseHeight = () => {
        if ((el as HTMLElement).clientHeight < (el as HTMLElement).scrollHeight) {
          const height = `${parseInt((el as HTMLElement).style.height) + 5}px`;
          (el as HTMLElement).style.height = height;
        } else {
          clearInterval(this.enterInterval);
          if (done) done();
        }
      };
      this.enterInterval = window.setInterval(increaseHeight, 10);
    },
    afterEnter(el: Element) {},
    enterCancelled(el: Element) {
        clearInterval(this.enterInterval);
      },
      beforeLeave(el: Element) {},
    leave(el: Element, done?: () => void) {
      const decreaseHeight = () => {
        if ((el as HTMLElement).clientHeight > 0) {
          const height = `${parseInt((el as HTMLElement).style.height) - 5}px`;
          (el as HTMLElement).style.height = height;
        } else {
          clearInterval(this.leaveInterval);
          if (done) done();
        }
      };
      this.leaveInterval = window.setInterval(decreaseHeight, 10);
    },
    afterLeave(el: Element) {},
    leaveCancelled(el: Element) {
      clearInterval(this.leaveInterval);
    }
  }
}
</script>

<style scoped>
nav {
  z-index: 9999999; /* Adjust as needed */
}
.dropdown-toggle {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  max-height: 100vh; /* Set to a large value */
  overflow: hidden;
  transition: max-height 0.3s ease; /* Increased duration to 0.6s */
  z-index: 99999999; /* Set a high z-index value */
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

/* If .max-w-7xl is restricting your width too much, try setting it to 100% or a larger max-width */
.max-w-7xl {
  max-width: 95%;
}

/* Adjust the padding as needed to reduce side margins */
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.px-4 {
  padding-left: 1rem; /* 16px; adjust or set to 0 if needed */
  padding-right: 1rem; /* 16px; adjust or set to 0 if needed */
}
.sm\:px-6 {
  padding-left: 1.5rem; /* 24px; adjust or set to 0 if needed */
  padding-right: 1.5rem; /* 24px; adjust or set to 0 if needed */
}
.lg\:px-8 {
  padding-left: 2rem; /* 32px; adjust or set to 0 if needed */
  padding-right: 2rem; /* 32px; adjust or set to 0 if needed */
}
</style>
