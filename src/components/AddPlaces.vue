<template> 
<div class="background">
    <div class="flex">  
        <div class="flex flex-col m-2"> 

            <div class="flex relative">
                <span class="bar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
    
                </span>
                <label class="text-neutral-700" for="location">
                    <input type="text" id="email-with-icon" class="input" name="guideTitle" placeholder="Location"/>
                </label>
            </div>
            <br>
    
            <div class="flex relative ">
                <span class="bar">
          
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
    
                </span>
                <label class="text-neutral-700" for="tag">
                <input type="text" id="email-with-icon" class="input" name="guideTitle" placeholder="Add Tags"/>
                </label>
            </div>
            <br>
    
            <div class="flex relative ">
                <span class="bar">
          
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                    </svg>
    
                </span>
                <label class="text-neutral-700" for="tag">
                    <input type="text" id="email-with-icon" class="input" name="guideTitle" placeholder="Add Cost"/>
                </label>
            </div>

        </div>
        <br>
        
        <div class="flex flex-col m-2">
            <!-- <input type="file" id="rounded-email" class="photoInput_style"/> -->
            <div class="mb-4 text-center relative">
                <!-- Hidden file input to trigger file selection -->
                <input type="file" id="photo-input" accept=".jpg, .jpeg, .png" class="hidden" @change="handleFileChange">
                
                <!-- Label for the file input, shows the camera icon if no photo selected -->
                <label
                  for="photo-input"
                  class="relative ml-40 mr-40 mt-5 h-20 w-15 flex items-center justify-center cursor-pointer overflow-hidden"
                  :class="{ 'border border-dashed border-gray-500 rounded-lg': !selectedPhoto }"
                >
                  <div class="absolute inset-0 flex items-center justify-center">
                    <img v-if="selectedPhoto" :src="selectedPhoto" alt="Selected Photo" class="h-auto w-auto object-cover cursor-pointer" @click="openFileInput">
                    <div v-else class="flex flex-col items-center justify-center">
                      <img src="../assets/Camera.png" alt="Add Photo" class="h-7 w-7 mb-1 mx-auto">
                      <p class="text-sm text-[#3F3D3D] font-semibold">Add Photos</p>
                    </div>
                  </div>
                </label>
              </div>
        </div>
    </div>

    <div class="flex flex-row m-2">
        <input type="text" class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Write a short summary" name="comment" rows="5" cols="40"/>
    </div>
    <br>

    <div class="flex flex-row justify-end">
        <div className="w-7 h-7  bg-neutral-700 rounded-[7px]">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-7 h-7">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </div>
    </div>
</div>

</template>

<style>
.background {
    @apply flex-col w-full flex bg-gray-500 p-2 bg-opacity-10 rounded-[20px] shadow
}

.bar {
    @apply rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm
}

.input {
    @apply rounded-r-lg flex-1 appearance-none w-full py-2 px-4 text-gray-700 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-neutral-700 bg-neutral-700 
}


</style>

<script setup>
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
    const reader = new FileReader();
    reader.onload = (e) => {
      selectedPhoto.value = e.target.result;
    };
    reader.readAsDataURL(file);
  } else {
    // Reset selectedPhoto or show error message
    selectedPhoto.value = null;
    alert('Please select a JPEG or JPG or PNG file.');
  }
}

</script>