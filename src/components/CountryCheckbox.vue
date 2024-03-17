<template>
  <div v-show="country.toLowerCase().includes(search.toLowerCase())" class="flex has-[:checked]:bg-blue-100">
    <input @change="$emit('toggle-country', $event.target.value)" :checked="selectedCountries.includes(country)" type="checkbox" :id="'checkbox' + country" :value="country" class="self-start mt-[5px]" />
    <label :for="'checkbox' + country" class="ml-2 text-left w-full">{{ country }}</label>
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