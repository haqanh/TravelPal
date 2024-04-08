<template>
  <div class="text-center">
    <div class="pt-8 pb-6">
      <p class="font-bold text-3xl">Help us learn more about you!</p>
    </div>
    <div class="pt-5 pb-3">
      <p class="w-8/12 m-auto text-xl">We will use the information to personalise your TravelPal experience</p>
    </div>
    <div class="mb-[2.1vh] text-center flex justify-center">
      <!-- Hidden file input to trigger file selection -->
      <input type="file" id="photo-input" accept=".jpg, .jpeg, .png" class="hidden" multiple @change="handleFileChange">
      
      <!-- Label for the file input, shows the camera icon if no photo selected -->
      <label
          for="photo-input"
          class="relative h-[13vh] w-[13vh] flex items-center justify-center cursor-pointer rounded-lg"
        >
        <div v-if="selectedPhoto.length === 0" class=" h-[13vh] w-[13vh] items-center justify-center"
        :class="{ 'border border-dashed border-gray-500 rounded-full dark:hover:bg-bray-800 dark:bg-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600': selectedPhoto }">
          <img src="../assets/Camera.svg" alt="Add Photo" class="h-[6vh] w-[6vh] m-auto mt-[1.3vh] mb-[0.3vh]">
          <p class="text-[1.5vh] text-[#3F3D3D] font-semibold">Add Profile</p>
          <p class="text-[1.5vh] text-[#3F3D3D] font-semibold">Picture</p>
        </div>
        <div class="flex items-center justify-center mx-[0vw] ">
          <div v-for="(photo, index) in selectedPhoto" :key="index">
            <img :src="photo" alt="Selected Photo" class="h-[13vh] w-[13vh] object-fit-cover cursor-pointer rounded-full" @click="openFileInput">
          </div>
            <div v-if="selectedPhoto.length === 0" class="flex flex-col items-center justify-center">
          </div>
        </div>
      </label>
    </div>
    <div>
      <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Name</div>
        <div>
          <input @input="$emit('update-name', $event.target.value)" :value="name" type="text" id="simple-email" class="rounded flex-1 appearance-none border border-gray-300 py-2 px-4 w-[230px] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Name (optional)"/>
        </div>
      </div>
      <div class="w-7/12 m-auto mt-5 mb-10 flex justify-between">
        <div class="text-lg mt-0.5">Age range</div>
        <select @change="$emit('update-age-range', $event.target.value)" class="block px-3 py-2 w-[230px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
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
        <select @change="$emit('update-gender', $event.target.value)" class="block px-3 py-2 w-[230px] text-gray-700 bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
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
</template>

<script>
export default {
  data() {
    return {
      selectedPhoto: [],
    }
  },
  props: {
    name: String,
  },
  emits:['update-name', 'update-age-range', 'update-gender', 'update-image'],
  methods: {
    handleFileChange(event) {
      const files = event.target.files;
      this.selectedPhoto = []; // clear the array before adding new photos
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedPhoto.push(e.target.result); // push the result into the array
            this.$emit('update-image', e.target.result)
          };
          reader.readAsDataURL(file);
        } else {
          // Show error message
          alert('Please select a JPEG or PNG file.');
        }
      }
    },
  }
}
</script>