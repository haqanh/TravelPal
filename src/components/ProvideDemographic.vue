<template>
  <div class="text-center">
    <div class="pt-8 pb-6">
      <p class="font-bold text-3xl">Help us learn more about you!</p>
    </div>
    <div class="py-5">
      <p class="w-8/12 m-auto text-xl mb-2">We will use the information to personalise your TravelPal experience</p>
    </div>
    <div>
      <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Name</div>
        <div>
          <input @input="$emit('update-name', $event.target.value)" :value="name" type="text" id="simple-email" class="rounded flex-1 appearance-none border border-gray-300 py-2 px-4 w-[230px] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Name (optional)"/>
        </div>
      </div>
      <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Age range</div>
        <select @change="$emit('update-age-range', $event.target.value)" class="block px-3 py-2 w-[230px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          <option value="">
            Prefer not to say
          </option>
          <option value="below25">
            Below 25
          </option>
          <option value="25to39">
            25 to 39
          </option>
          <option value="40to60">
            40 to 60
          </option>
          <option value="above60">
            Above 60
          </option>
        </select>
      </div>
      <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Gender</div>
        <select @change="$emit('update-gender', $event.target.value)" class="block px-3 py-2 w-[230px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          <option value="">
            Prefer not to say
          </option>
          <option value="male">
            Male
          </option>
          <option value="female">
            Female
          </option>
          <option value="others">
            Others
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
    name: String,
  },
  emits:['update-name', 'update-age-range', 'update-gender'],
  methods: {
  }
}
</script>