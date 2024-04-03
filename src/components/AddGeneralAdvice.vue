<template>

  <transition enter-active-class="transition duration-300 ease-out" enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
    <div v-if="isVisible" class="background m-b-1">
      <div class="flex">
        <span
          class="rounded-l-md inline-flex items-center pl-3 pr-2 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
          </svg>
        </span>
        <div class="w-full">
          <label for="advice">
            <input type="text" id="advice" class="input_style" name="advice" placeholder="Write an Advice"
              v-model="inputContent" @keyup.enter="updateContent" @input="updateContent($event.target.value, advice)" />
          </label>
        </div>
      </div>
      <br />
    </div>
  </transition>

</template>

<script>
export default {
  data() {
    return {
      inputContent: '',

      isVisible: false
    }
  },
  methods: {
    updateContent() {
      this.$emit('content-updated', this.inputContent)
    }
  },
  mounted() {
    this.isVisible = true
  }
}

</script>

<style>
.background {
  @apply flex bg-gray-500 p-4 bg-opacity-10 rounded-[10px] shadow;
}

.input_style {
  @apply mr-8 rounded-r-lg border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent;
}
</style>
