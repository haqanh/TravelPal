<template>
  <aside class="bg-gray-100 w-72 px-6 py-8 sticky top-0 h-full">
    <ul class="space-y-10">
      <li>
        <h5 class="text-xl font-semibold mb-4 text-left">Bucket List 🌍</h5>
        <!-- Dynamically generate this list using v-for in your real app -->
        <ul class="grid grid-cols-2 gap-2">
          <!-- Repeat for each country -->
        </ul>
      </li>
      <li>
        <div class="flex justify-between items-center mb-4">
          <h5 class="text-l font-semibold text-left">Distance Travelled</h5>
          <span class="text-gray-600">0 km</span>
        </div>
        <div class="w-full bg-gray-300 h-1.5 rounded-full">
          <div class="bg-primary h-1.5 rounded-full" style="width: 0%"></div>
        </div>
      </li>
      <div class="grid grid-cols-2 gap-4">
        <div class="info-card">
          <h3 class="text-l font-semibold mb-2">You've been to</h3>
          <div class="stats-container text-white">
            <span class="text-lg font-semibold">0</span> Countries
          </div>
        </div>
        <div class="info-card2">
          <h3 class="text-l font-semibold mb-2">You've walked</h3>
          <div class="stats-container text-white">
            <span class="text-lg font-semibold">0</span> Steps
          </div>
        </div>
      </div>
    </ul>
  </aside>
</template>

<script lang="ts">
export default {
  name: 'EmptySideBar',
}
</script>

<style scoped>
.info-card .stats-container {
  background-image: url('@/assets/trees.jpeg'); /* Replace with the path to your image, for example trees.jpeg in assets will be /assets/trees.jpeg */
  background-size: cover; /* This will ensure that your image covers the entire div */
  background-position: center; /* This will center your image in the div */
  border-radius: 0.5rem; /* This keeps the rounded corners */
  padding: 1rem; /* Adjust padding to ensure the content is spaced nicely */
  text-align: center; /* Center the text horizontally */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow for depth */
}

.info-card2 .stats-container {
  background-image: url('@/assets/images.jpeg'); /* Replace with the path to your image, for example trees.jpeg in assets will be /assets/trees.jpeg */
  background-size: cover; /* This will ensure that your image covers the entire div */
  background-position: center; /* This will center your image in the div */
  border-radius: 0.5rem; /* This keeps the rounded corners */
  padding: 1rem; /* Adjust padding to ensure the content is spaced nicely */
  text-align: center; /* Center the text horizontally */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow for depth */
}

.fi {
  /* Example to set width and height */
  width: 32px;
  height: 24px; /* Maintain the aspect ratio of 4:3 */
}
</style>

<!-- United States - US
Canada - CA
United Kingdom - GB
Germany - DE
France - FR
Italy - IT
Spain - ES
Australia - AU
Japan - JP
China - CN
India - IN
Brazil - BR
Russia - RU
South Africa - ZA
Mexico - MX
Argentina - AR
Saudi Arabia - SA
United Arab Emirates - AE
South Korea - KR
Turkey - TR 
Norway: NO
Sweden: SE
Canada: CA 
F8F8F8 - gray-100
-->
