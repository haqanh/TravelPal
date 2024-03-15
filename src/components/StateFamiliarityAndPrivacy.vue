<template>
  <div class="flex flex-col justify-between h-[600px] max-w-[600px] shadow-2xl rounded-3xl">
    <div class="text-center">
      <div class="border-b-2 border-gray-400 pt-8 pb-6">
        <p class="font-bold text-3xl">We're almost there!</p>
      </div>
      <div class="py-5">
        <p class="w-9/12 m-auto text-xl mb-2">You can update your privacy settings anytime you wish</p>
      </div>
      <div class="grid grid-cols-3 grid-rows-3 w-10/12 mx-auto gap-y-3">
        <p class="text-left text-lg self-center">Have you used TravelPal before?</p>
        <div class="flex items-center ml-16">
          <input type="radio" name="radio1" value="yes" id="radio1yes" />
          <label for="radio1yes" class="h-fit text-lg ml-2 mb-0.5">Yes</label>
        </div>
        <div class="flex items-center ml-16">
          <input type="radio" name="radio1" value="no" id="radio1no" checked />
          <label for="radio1no" class="h-fit text-lg ml-2 mb-0.5">No</label>
        </div>

        <p class="text-left text-lg self-center">Have you used other similar apps before?</p>
        <div class="flex items-center ml-16">
          <input type="radio" name="radio2" value="yes" id="radio2yes" />
          <label for="radio2yes" class="h-fit text-lg ml-2 mb-0.5">Yes</label>
        </div>
        <div class="flex items-center ml-16">
          <input type="radio" name="radio2" value="no" id="radio2no" checked />
          <label for="radio2no" class="h-fit text-lg ml-2 mb-0.5">No</label>
        </div>

        <p class="text-left text-lg self-center">Do you want to make your activity private or public?</p>
        <div class="flex items-center ml-16">
          <input type="radio" name="radio3" value="public" id="public" />
          <label for="public" class="h-fit text-lg ml-2 mb-0.5">Public</label>
        </div>
        <div class="flex items-center ml-16">
          <input type="radio" name="radio3" value="private" id="private" checked />
          <label for="private" class="h-fit text-lg ml-2 mb-0.5">Private</label>
        </div>
      </div>
    </div>

    <div class="flex justify-between mt-auto w-11/12 mx-auto mb-4">
      <div class="flex cursor-pointer">
        <svg class="w-7 h-7 mt-0.5 text-customBlue dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        <p class="ml-2 text-xl text-customBlue">Back</p>
      </div>
      <div class="flex justify-between w-36 pt-1">
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-blue-500 w-5 h-5"></div>
      </div>
      <div class="flex cursor-pointer">
        <div class="mr-2 text-xl text-customBlue">Finish</div>
        <svg class="w-7 h-7 mt-0.5 text-customBlue dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>