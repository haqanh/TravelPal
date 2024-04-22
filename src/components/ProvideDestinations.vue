<template>
  <div class="text-center">
    <div class="pt-8 pb-6 border-b-[1px] border-black">
      <p class="font-bold text-3xl w-10/12 mx-auto">Share your favourite countries!</p>
    </div>
    <div class="py-5">
      <p class="w-9/12 m-auto text-xl mb-2">We will help you create a bucket list of the top (max 10) countries you want to visit</p>
    </div>
    <div class="m-auto h-[63%] mb-6 flex justify-center">
      <SearchCountries :selectedCountries="selectedCountries" @toggle-country="toggleCountry"/>
    </div>
  </div>
</template>

<script>
import SearchCountries from './SearchCountries.vue';
export default {
  data() {
    return {
    }
  },
  props: {
    selectedCountries: Array,
  },
  emits:['toggle-country'],
  components: {
    SearchCountries
  },
  methods: {
    toggleCountry(country) {
      this.$emit('toggle-country', country)
    }
  }
}

</script>