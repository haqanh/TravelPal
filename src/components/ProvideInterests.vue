<template>
  <div class="text-center">
    <div class="pt-8 pb-6 border-b-[1px] border-black">
      <p class="font-bold text-3xl w-9/12 mx-auto">Share your interests!</p>
    </div>
    <div class="py-5">
      <p class="w-9/12 m-auto text-xl mb-2">We will use this information to provide you with more personalized recommendations</p>
    </div>
    <div class="m-auto h-[63%] mb-6 flex justify-center">
      <SearchInterests :selectedInterests="selectedInterests" @toggle-interest="toggleInterest" />
    </div>
  </div>
</template>

<script>
import SearchInterests from './SearchInterests.vue';
export default {
  data() {
    return {
    }
  },
  props: {
    selectedInterests: Array,
  },
  emits:['toggle-interest'],
  components: {
    SearchInterests
  },
  methods: {
    toggleInterest(interest) {
      this.$emit('toggle-interest', interest)
    }
  }
}

</script>