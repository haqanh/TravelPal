<template>
  <div class="grid grid-cols-3 mt-auto w-11/12 mx-auto mb-4">
    <div v-if="page != 1" @click="goPrevPage(), pageChange()" class="flex cursor-pointer">
      <svg class="w-7 h-7 text-[#4285F4]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
      </svg>
      <p class="ml-2 text-xl text-[#4285F4] select-none">Back</p>
    </div>
    <div v-else></div>
    <div class="flex justify-between w-36 pt-1 justify-self-center">
      <div v-if="page == 1" class="rounded-full bg-blue-500 w-5 h-5"></div>
      <div v-else-if="page > 1" class="rounded-full bg-blue-500 my-1 w-3 h-3"></div>
      <div v-else class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>

      <div v-if="page == 2" class="rounded-full bg-blue-500 w-5 h-5"></div>
      <div v-else-if="page > 2" class="rounded-full bg-blue-500 my-1 w-3 h-3"></div>
      <div v-else class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>

      <div v-if="page == 3" class="rounded-full bg-blue-500 w-5 h-5"></div>
      <div v-else-if="page > 3" class="rounded-full bg-blue-500 my-1 w-3 h-3"></div>
      <div v-else class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>

      <div v-if="page == 4" class="rounded-full bg-blue-500 w-5 h-5"></div>
      <div v-else-if="page > 4" class="rounded-full bg-blue-500 my-1 w-3 h-3"></div>
      <div v-else class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
      
      <div v-if="page == 5" class="rounded-full bg-blue-500 w-5 h-5"></div>
      <div v-else-if="page > 5" class="rounded-full bg-blue-500 my-1 w-3 h-3"></div>
      <div v-else class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
    </div>
    <div @click="goNextPage(), pageChange()" class="flex cursor-pointer justify-self-end">
      <div v-if="page == 5" class="mr-2 text-xl text-[#4285F4] select-none">Finish</div>
      <div v-else class="mr-2 text-xl text-[#4285F4] select-none">Next</div>
      <svg class="w-7 h-7 text-[#4285F4]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    }
  },
  emits:["page-change"],
  methods:{
    pageChange() {
      this.$emit('page-change', this.page)
    },
    goPrevPage() {
      this.page -= 1
    },
    goNextPage() {
      this.page += 1
    }
  }
}
</script>