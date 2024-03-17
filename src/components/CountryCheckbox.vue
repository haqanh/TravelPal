<template>
  <div v-show="country.toLowerCase().includes(search.toLowerCase())" class="flex has-[:checked]:bg-blue-100 cursor-pointer">
    <input v-if="selectedCountries.length < 11" @change="$emit('toggle-country', $event.target.value)" :checked="selectedCountries.includes(country)" type="checkbox" :id="'checkbox' + country" :value="country" class="self-start mt-[5px] cursor-pointer" />
    <input v-else @click.prevent @click="$emit('toggle-country', $event.target.value)" :checked="selectedCountries.includes(country)" type="checkbox" :id="'checkbox' + country" :value="country" class="self-start mt-[5px] cursor-pointer" />
    <label :for="'checkbox' + country" class="ml-2 text-left w-full select-none cursor-pointer">{{ country }}</label>
  </div>
</template>

<script>
export default {
  props: {
    country: String,
    selectedCountries: Array,
    search: String,
  },
  emits: ['toggle-country']
}
</script>