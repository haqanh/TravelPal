<template>
  <div class="text-center">
    <div class="border-b-2 border-gray-400 pt-8 pb-6">
      <p class="font-bold text-3xl">Tell us about your travel habits!</p>
    </div>
    <div class="py-5">
      <p class="w-8/12 m-auto text-xl mb-2">We will use the information to personalise your TravelPal experience</p>
    </div>
    <div>
      <div class="w-8/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Travel frequency</div>
        <select @change="$emit('update-travel-freq', $event.target.value)" class="block px-3 py-2 w-[200px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          <option value="">
            Prefer not to say
          </option>
          <option value="lessThanOnce">
            < 1 time a year
          </option>
          <option value="oneToTwo">
            1-2 times a year
          </option>
          <option value="threeToFive">
            3-5 times a year
          </option>
          <option value="moreThanFive">
            > 5 times a year
          </option>
        </select>
      </div>
      <div class="w-8/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Travel companions</div>
        <select @change="$emit('update-travel-companions', $event.target.value)" class="block px-3 py-2 w-[200px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          <option value="">
            Prefer not to say
          </option>
          <option value="solo">
            Solo
          </option>
          <option value="family">
            Family
          </option>
          <option value="friends">
            Friends
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
  },
  emits:['update-travel-freq', 'update-travel-companions'],
  methods: {
  }
}
</script>