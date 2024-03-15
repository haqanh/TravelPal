<template>
  <div class="flex flex-col justify-between h-[600px] max-w-[600px] shadow-2xl rounded-3xl">
    <div class="text-center">
      <div class="border-b-2 border-gray-400 pt-8 pb-6">
        <p class="font-bold text-3xl">Help us learn more about you!</p>
      </div>
      <div class="py-5">
        <p class="w-8/12 m-auto text-xl mb-2">We will use the information to personalise your TravelPal experience</p>
      </div>
      <div>
        <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
          <div class="text-lg mt-0.5">Name</div>
          <div>
            <input type="text" id="simple-email" class="rounded flex-1 appearance-none border border-gray-300 py-2 px-4 w-[230px] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Name (optional)"/>
          </div>
        </div>
        <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
          <div class="text-lg mt-0.5">Age range</div>
          <select class="block px-3 py-2 w-[230px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="ageRange">
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
          <select class="block px-3 py-2 w-[230px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="gender">
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

    <div class="flex justify-between mt-auto w-11/12 mx-auto mb-4">
      <div class="flex justify-between w-36 pt-1 ml-[35%]">
        <div class="rounded-full bg-blue-500 w-5 h-5"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
        <div class="rounded-full bg-gray-300 my-1 w-3 h-3"></div>
      </div>
      <div class="flex cursor-pointer">
        <p class="mr-2 text-xl text-customBlue">Next</p>
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