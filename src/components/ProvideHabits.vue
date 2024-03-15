<template>
  <div class="flex flex-col justify-between h-[600px] max-w-[600px] shadow-2xl rounded-3xl">
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
          <select class="block px-3 py-2 w-[200px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="travelFrequency">
            <option value="">
              Prefer not to say
            </option>
            <option value="lessThanOnce">
              Less than once a year
            </option>
            <option value="oneToTwo">
              1-2 times a year
            </option>
            <option value="threeToFive">
              3-5 times a year
            </option>
            <option value="moreThanFive">
              More than 5 times a year
            </option>
          </select>
        </div>
        <div class="w-8/12 m-auto mt-5 mb-10 flex justify-between">
          <div class="text-lg mt-0.5">Travel companions</div>
          <select class="block px-3 py-2 w-[200px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="travelCompanions">
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

    <div class="flex justify-between mt-auto w-11/12 mx-auto mb-4">
      <div class="flex cursor-pointer">
        <svg class="w-7 h-7 mt-0.5 text-customBlue dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
        </svg>
        <p class="ml-2 text-xl text-customBlue">Back</p>
      </div>
      <div class="flex justify-between w-36 pt-1">
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-blue-500 w-5 h-5"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
      </div>
      <div class="flex cursor-pointer">
        <div class="mr-2 text-xl text-customBlue">Next</div>
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