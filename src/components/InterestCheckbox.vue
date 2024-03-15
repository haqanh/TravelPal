<template>
  <div class="flex has-[:checked]:bg-blue-100">
    <input type="checkbox" :id="'checkbox' + interest" class="self-start mt-[5px]" />
    <label :for="'checkbox' + interest" class="ml-2 text-left w-full">{{ interest }}</label>
  </div>
</template>

<script>
export default {
  props: {
    interest: String
  }
}
</script>