<template>
  <div class="container mx-auto p-8" v-if="place">
    <div class="flex">
      <!-- Text container -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center mb-1 space-x-4"> 
          <img src="@/assets/map-marker.svg" alt="Map Pin" class="w-10 h-10">
          <h2 class="text-2xl font-bold truncate">{{ place.Name }}</h2>
          <span class="text-xl font-bold">{{ priceSymbol }}</span>
        </div>
        <div class="flex flex-wrap mb-4">
          <span class="tags px-2 py-1 mt-2 mr-2 mb-2" 
                v-for="tag in place.Tags" 
                :key="tag">
            <GlobalTag
              :tagCategory="tag"
            ></GlobalTag>    
          </span>
        </div>
        <p class="text-gray-600 text-base">{{ place.Description }}</p>
      </div>

      <!-- Photo container -->
      <div class="flex-none w-1/4 h-72 px-4">
        <img :src="place.imageUrl" :alt="place.Name" class="w-full h-full object-cover rounded-xl">
      </div>

      <!-- Map container -->
      <div class="flex-none w-1/4">
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
      // This will display a "$" symbol for each unit of cost.
      return '$'.repeat(this.place.Cost || 0);
    }
  },
  components: {
    MapDisplay,
    GlobalTag
  }
};
</script>
