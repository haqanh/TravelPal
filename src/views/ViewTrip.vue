<template>
  <div class="absolute inset-x-0 top-0 h-2/5">
    <!-- This div now only takes up half the height -->
    <img
      src="@/assets/sf1.jpeg"
      class="object-cover w-full h-full rounded-b-3xl"
      alt="San Francisco"
    />
    <div class="absolute inset-0 bg-gray-700 bg-opacity-50 rounded-b-3xl"></div>
    <!-- Dark overlay -->
    <div class="absolute bottom-0 left-0 w-full p-4">
      <!-- New container for bottom-aligned text -->
      <p class="text-md text-white">Last Edit: February 2024</p>
    </div>
  </div>
  <NavBar />
  <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 class="text-6xl font-bold text-white">San Francisco</h1>
    <p class="text-xl text-white mt-4">In California, USA</p>
  </div>
  <div class="mt-[40vh] bg-white text-left mx-auto max-w-7xl">
    <!-- Added text-left class -->
    <div class="p-6">
      <div class="tags-dates-cost mb-8">
        <div class="tags text-xl mb-4">
          <span class="tag mr-2">Tag1</span>
          <span class="tag">Tag2</span>
        </div>
        <div class="dates mb-4">
          <span class="date text-xl">Date: March 11, 2024</span>
        </div>
        <div class="cost mb-4">
          <span class="cost-text text-xl">Total Cost: $2000</span>
        </div>
      </div>

      <div class="flex items-center mb-4">
        <img src="@/assets/summary.svg" alt="Summary icon" class="inline-block mr-2 w-6 h-6" />
        <h2 class="text-2xl font-bold">Summary</h2>
      </div>
      <p class="text-gray-600 text-xl mb-8">
        As I reminisce about my time in San Francisco, it feels like a tapestry of memorable
        vignettes. I crossed the iconic Golden Gate Bridge feeling the ocean breeze, its
        International Orange towers standing defiant against the fog. In the hilly streets, I
        ventured through the diverse neighborhoods—each with its own character. I wandered through
        the Ferry Building Marketplace, sampling artisanal cheeses and chocolates. The historic
        cable cars offered a nostalgic ride, clinking up the steep inclines with a charm that felt
        timeless. As I reminisce about my time in San Francisco, it feels like a tapestry of
        memorable vignettes. I crossed the iconic Golden Gate Bridge feeling the ocean breeze, its
        International Orange towers standing defiant against the fog. In the hilly streets, I
        ventured through the diverse neighborhoods—each with its own character. I wandered through
        the Ferry Building Marketplace, sampling artisanal cheeses and chocolates. The historic
        cable cars offered a nostalgic ride, clinking up the steep inclines with a charm that felt
        timeless. In the evenings, the city's energy was palpable. I found myself immersed in live
        jazz music in the Fillmore District, and on other nights, I was captivated by the latest
        theatrical performances downtown. San Francisco's spirit is infectious, creative, and
        forward-thinking, yet it holds onto a rich past that is proudly on display at every turn.
      </p>
    </div>

    <section class="p-6">
      <div class="flex items-center mb-4">
        <img
          src="@/assets/camera-photo.svg"
          alt="Photos icon"
          class="photos-icon inline-block mr-2 w-8 h-8"
        />
        <!-- Adjusted width and height -->
        <h2 class="text-2xl font-bold">Photos</h2>
      </div>
      <div class="grid grid-cols-3 gap-10">
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('trees.jpeg')"
        />
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('trees.jpeg')"
        />
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('@trees.jpeg')"
        />
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('trees.jpeg')"
        />
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('trees.jpeg')"
        />
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('/trees.jpeg')"
        />
        <img
          src="@/assets/trees.jpeg"
          alt="San Francisco"
          class="photo-card"
          @click="openModal('/trees.jpeg')"
        />
      </div>
      <!-- Modal section -->
      <div v-if="isModalOpen" class="modal" @click.self="closeModal">
        <div class="modal-content" :class="{ 'no-image': imageError }">
          <span class="close" @click="closeModal">&times;</span>
          <img
            v-if="!imageError"
            :src="currentPhoto"
            alt="Enlarged photo"
            class="enlarged-photo"
            @error="imageError = true"
          />
          <span v-else class="placeholder-text">Enlarged Photo</span>
        </div>
      </div>


      <div class="mt-10 text-center font-[]">
        <button
          type="button"
          class="text-xl inline-flex justify-center rounded-lg border border-[#C1C1C1] border-2 shadow-lg px-3 py-1 text-sm font-regular text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2"
        >
          View All
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
// import { db } from "../firebase.js";
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      isModalOpen: false,
      currentPhoto: '',
      imageError: false, // Track loading errors for images.
      showAllImages: false, // New data property to control the display of images.
    }
  },
  methods: {
    openModal(photoName) {
      this.currentPhoto = new URL(`../assets/${photoName}`, import.meta.url).href;
      this.isModalOpen = true;
      this.imageError = false;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    toggleImagesDisplay() {
      this.showAllImages = true; // Update this to show all images.
    }
  }
}
</script>

<style scoped>
.rounded-b-3xl {
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
}

/* NavBar style adjustments as needed */

/* Additional styles for text */
.tags-dates-cost {
  display: flex;
  flex-direction: column;
}

.tag {
  display: inline-block;
  background-color: #efefef;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
}
.photo-card {
  border-radius: 30px; /* Adjust as needed for rounded corners */
  width: 100%; /* Full width of the column */
  height: 40vh; /* Example responsive height, adjust as needed */
  object-fit: cover; /* This will cover the area without stretching the image */
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23); /* Add shadows for 3D effect */
  transition: transform 0.3s ease-in-out; /* Smooth transform on hover */
}

.photo-card:hover {
  transform: scale(1.05); /* Slightly larger on hover for a popping effect */
}
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  /* Keep your existing styles and adjust the padding, width, or max-width if necessary */
  padding: 20px; /* Adjust padding to create more space inside the modal */
  max-width: 95vw; /* Use a percentage of the viewport width */
  max-height: 95vh; /* Use a percentage of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: white;
  position: relative;
}

.enlarged-photo {
  max-width: 90vw; /* Use less than 100% to account for padding and borders */
  max-height: 80vh; /* Adjust the max-height to fit within the modal */
  width: auto; /* Maintain the aspect ratio */
  height: auto; /* Maintain the aspect ratio */
  object-fit: contain; /* Ensure the image is contained within the element's box */
}

.placeholder-text, .enlarged-photo-title {
  text-align: center; /* Center the placeholder text */
  font-size: 1.5rem;
}

.close {
  position: absolute;
  top: 0px; /* Position the close button a little from the top */
  right: 5px; /* Position the close button a little from the right */
  font-size: 24px; /* Reduce the font size of the close button */
  cursor: pointer;
}
/* You can add additional styles for .dates and .cost as needed */
</style>
