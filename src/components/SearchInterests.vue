<template>
  <div class="border-2 border-gray-400 rounded overflow-auto w-[500px]">
    <input v-model="search" type="search" :placeholder="'Search Interests...                    (' +  selectedInterests.length + ' selected)'" class="sticky w-11/12 mx-auto top-0 text-xl pt-3 pb-2 pl-3 border-b-2 border-gray-400 outline-none" />
    <div class="grid grid-cols-3 gap-y-2 gap-x-5 w-11/12 py-4 mx-auto">
      <InterestCheckbox v-for="interest in filterInterests(search)" @toggle-interest="toggleInterest" :interest="interest" :selectedInterests="selectedInterests" :key="interest" />
    </div>
  </div>
</template>

<script>
import InterestCheckbox from './InterestCheckbox.vue';

export default {
  data() {
    return {
      interests: [
        'Adventure sports', 'Beach activities', 'Camping', 'Cities', 'Cultural sites', 'Cycling', 'Educational trips', 'Fishing', 'Food', 'Hiking', 'Historical sites',
        'Nature', 'Photography', 'Relaxation', 'Road trips', 'Shopping', 'Sightseeing', 'Skiing', 'Train journeys', 'Volunteering', 'Wildlife', 'Winter resorts', 'Wine tours',
      ],
      search: "",
    }
  },
  components: {
    InterestCheckbox
  },
  props: {
    selectedInterests: Array,
  },
  methods: {
    toggleInterest(interest) {
      this.$emit('toggle-interest', interest)
    },
    filterInterests(search) {
      return this.interests.filter((interest) => interest.toLowerCase().includes(search.toLowerCase()))
    }
  }
}
</script>