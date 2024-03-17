<template>
  <div v-show="interest.toLowerCase().includes(search.toLowerCase())" class="flex has-[:checked]:bg-blue-100">
    <input @change="$emit('toggle-interest', $event.target.value)" :checked="selectedInterests.includes(interest)" type="checkbox" :id="'checkbox' + interest" :value="interest" class="self-start mt-[5px]" />
    <label :for="'checkbox' + interest" class="ml-2 text-left w-full">{{ interest }}</label>
  </div>
</template>

<script>
export default {
  props: {
    interest: String,
    selectedInterests: Array,
    search: String,
  },
  emits: ['toggle-interest']
}
</script>