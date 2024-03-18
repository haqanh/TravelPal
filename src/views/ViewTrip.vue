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

      <h2 class="text-2xl font-bold mb-4">Summary</h2>
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
      <h2 class="text-2xl font-bold mb-4">Photos</h2>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <img src="@/assets/trees.jpeg" alt="San Francisco" class="rounded" />
        <img src="@/assets/trees.jpeg" alt="San Francisco" class="rounded" />
        <img src="@/assets/trees.jpeg" alt="San Francisco" class="rounded" />
      </div>
      <button
        class="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-colors"
      >
        View All
      </button>
    </section>
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue'

export default {
  components: {
    NavBar
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

/* You can add additional styles for .dates and .cost as needed */
</style>
