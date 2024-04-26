<template>
  <div class="container mx-auto p-4 2xl:p-8" v-if="place">
    <div class="flex">
      <!-- Text container -->
      <div class="flex-1 min-w-0 mx-2">
        <div class="flex items-center mb-1 2xl:space-x-4 space-x-1"> 
          <img src="@/assets/map-marker.svg" alt="Map Pin" class="2xl:w-10 2xl:h-10 w-6 h-6">
          <h2 class="text-md 2xl:text-2xl font-bold text-pretty">{{ place.Name }}</h2>
          <span class="text-sm 2xl:text-xl font-semibold">{{ priceSymbol }}</span>
        </div>
        <div class="flex flex-wrap 2xl:mb-4 mb-1">
          <span class="tags 2xl:px-2 2xl:py-1 px-1 py-0.5 2xl:mt-2 2xl:mr-2 2xl:mb-2 mt-1 mr-1 mb-1" 
                v-for="tag in place.Tags" 
                :key="tag">
            <GlobalTag
              :tagCategory="tag"
            ></GlobalTag>    
          </span>
        </div>
        <p class="text-gray-600 text-sm 2xl:text-base text-justify">{{ place.Description }}</p>
      </div>

      <!-- Photo container -->
      <div class="flex-none w-1/3 h-72 px-4 mx-2">
        <img :src="place.imageUrl" :alt="place.Name" class="w-full h-full object-cover rounded-xl">
      </div>

      <!-- Map container -->
      <div class="flex-none mx-2">
        <MapDisplay :latitude="place.Location.latitude" :longitude="place.Location.longitude" :description="place.Name" />
      </div>
    </div>
  </div>
  <p v-else class="text-center font-bold my-10">Loading place...</p>
</template>

<script>
import MapDisplay from '@/components/MapDisplay.vue';
import GlobalTag from './GlobalTag.vue';

export default {
  name: 'GuideComponent',
  props: {
    place: Object,
  },
  computed: {
    priceSymbol() {
      if (this.place.Price > 500) {
        return '$$$$$';
      }
      // This will display a "$" symbol for each unit of cost.
      return '$'.repeat(this.place.Price / 100 + 1 || 0);
    }
  },
  components: {
    MapDisplay,
    GlobalTag
  }
};
</script>
