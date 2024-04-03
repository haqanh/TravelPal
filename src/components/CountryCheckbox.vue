<template>
  <div v-if="selectedCountries.length >= 11 && !selectedCountries.includes(country)" class="flex has-[:checked]:bg-blue-100 cursor-not-allowed">
    <input disabled @click.prevent @click="$emit('toggle-country', $event.target.value)" :checked="selectedCountries.includes(country)" type="checkbox" :id="'checkbox' + country" :value="country" class="self-start mt-[5px] cursor-not-allowed" />
    <label :for="'checkbox' + country" class="ml-2 text-left w-full select-none cursor-not-allowed">{{ country }}</label>
  </div>
  <div v-else class="flex has-[:checked]:bg-blue-100 cursor-pointer">
    <input @change="$emit('toggle-country', $event.target.value)" :checked="selectedCountries.includes(country)" type="checkbox" :id="'checkbox' + country" :value="country" class="self-start mt-[5px] cursor-pointer" />
    <label :for="'checkbox' + country" class="ml-2 text-left w-full select-none cursor-pointer">{{ country }}</label>
  </div>
</template>

<script>
export default {
  props: {
    country: String,
    selectedCountries: Array,
  },
  emits: ['toggle-country']
}
</script>