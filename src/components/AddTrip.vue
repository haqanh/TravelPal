<template>
  <TransitionRoot appear :show="isfirstDialog" as="template">
    <HeadlessDialog as="div" class="relative">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 flex items-center justify-center overflow-y-auto" v-if="isfirstDialog">
        <div class="p-[6vh] text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="h-[85vh] w-[50vw] overflow-y-auto transform rounded-[3vh] bg-white p-[3.2vh] text-left align-middle shadow-xl transition-all scrollbar"
            >
              <DialogTitle
                as="h3"

                class="text-center text-lg leading-6 text-[#3F3D3D] font-semibold text-[26px]"

              >
                Add Trip
              </DialogTitle>
              <button class="absolute top-[3.2vh] right-[3.2vh]" @click="closeDialogOnly">
                <img src="../assets/Multiply.svg" alt="Close Icon" class="w-[3vh] h-[3vh]">
              </button>
              <div class="mt-[0.53vh]">
            <form>
              <div class="mb-[2.1vh] text-center relative">
                <!-- Hidden file input to trigger file selection -->
                <input type="file" id="photo-input" accept=".jpg, .jpeg, .png" class="hidden" multiple @change="handleFileChange">
                
                <!-- Label for the file input, shows the camera icon if no photo selected -->
                <label
                    for="photo-input"
                    class="relative block mx-[9vw] mt-[2.6vh] h-[30vh] w-[60vh] flex items-center justify-center cursor-pointer rounded-lg"
                  >
                  <div v-if="selectedPhoto.length === 0" class=" h-[20vh] w-[25vh] items-center justify-center"
                  :class="{ 'border border-dashed border-gray-500 rounded-lg dark:hover:bg-bray-800 dark:bg-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600': selectedPhoto }">
                    <img src="../assets/Camera.svg" alt="Add Photo" class="h-[8vh] w-[8vh] mb-[0.9vh] mx-auto mt-[5vh]">
                    <p class="text-[1.8vh] text-[#3F3D3D] font-semibold">Add Photos</p>
                  </div>
                  <div class="flex flex items-center justify-center mx-[0vw] ">
                    <div v-for="(photo, index) in selectedPhoto" :key="index" class="m-[0.5vw]">
                      <img :src="photo" alt="Selected Photo" class="h-[15vh] w-[20vh] object-fit-cover cursor-pointer rounded-lg" @click="openFileInput">
                    </div>
                      <div v-if="selectedPhoto.length === 0" class="flex flex-col items-center justify-center">
                    </div>
                  </div>
                </label>
              </div>

                <!-- Trip Name Input -->
                <div class="mb-[2.1vh]">
                <div class="flex relative ">
                    <span class="rounded-l-md inline-flex  items-center px-[1.6vh] border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-[1.8vh]">
                        <img src= "../assets/Trip Tag.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                    </span>
                    <input v-model="tripName" type="text" id="trip-name-with-icon" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-[1.05vh] px-[2.1vh] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="email" placeholder="Trip Name"/>
                    </div>
                </div>

                <!-- Trip Location Dropdown -->
                <div class="mb-[2.1vh]">
                    <div class="flex relative">
                        <span class="rounded-l-md inline-flex items-center px-[1.6vh] border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-[1.8vh]">
                            <img src="../assets/Airplane Take Off.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                        </span>
                        <input ref="location_input" v-model="tripLocation" type="text" id="trip-location-with-icon" class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-[1.05vh] px-[2.1vh] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="location" placeholder="Where?" />
                    </div>
                </div>


                <!-- Select Dates Inputs -->

                <div class="mb-4">
                  <div class="flex items-center mb-2">
                      <div class="text-[#3F3D3D] text-lg font-semibold mr-2">Dates</div>
                      <div class="mr-2">
                          <img src="../assets/Calendar.svg" alt="Calendar Icon" class="w-6 h-6">

                      </div>
                  </div>

                  <div date-rangepicker class="flex items-center justify-between">
                    <div class="relative">
                      <Datepicker v-model="selectedStartDate" :show="showStartDatepicker" @update:show="val => showStartDatepicker = val" class="w-[20vw] h-[7vh] border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[1.4vh] pointer-events-none">
                          <svg class="w-[2.1vh] h-[2.1vh] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-[1.4vh] cursor-pointer" @click="clearStartDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-[2.1vh] h-[2.1vh]">
                        </div>
                      </div>
                      <span class="mx-[2.1vh] text-gray-500">-</span>
                      <div class="relative">
                        <Datepicker v-model="selectedEndDate" :show="showEndDatepicker" @update:show="val => showEndDatepicker = val" class="w-[20vw] h-[7vh] border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="End Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[1.6vh] pointer-events-none">
                          <svg class="w-[2.1vh] h-[2.1vh] text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-[1.6vh] cursor-pointer" @click="clearEndDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-[2.1vh] h-[2.1vh]">
                        </div>
                      </div>
                  </div>
              </div>
                
              <!-- Cost Input -->

                <div class="mb-4">
                <label for="cost" class="text-[#3F3D3D] text-lg font-semibold mr-2">

                    Cost
                </label>
                <div class="mb-[2.1vh]">
                <div class="flex relative">
                    <span class="rounded-l-md inline-flex items-center px-[1.6vh] border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-[1.8vh]">
                        <img src= "../assets/Stack Of Coins.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">

                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                    </span>
                    <input type="number" v-model="tripCost" id="cost-input" class=" appearance-none rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-[1.05vh] px-[2.05vh] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="cost" placeholder="Cost (In SGD)"/>
                    </div>
                </div>
                </div>
            </form>
            </div>


              <div class="mt-[5vh] text-center">
                <button
                  type="button"

                  class="inline-flex justify-center rounded-lg border-[#C1C1C1] border-2 shadow-lg px-3 py-1 text-sm font-regular text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2"

                  @click="navigateToNextStep"
                >
                  Next
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
  <AddTripSecondPopUp v-if="isSecondDialog" @closetrip="closeDialog" @closetriponly="closeDialogOnly" :tripName="this.tripName" />
</template>

<script>
import {
  TransitionRoot,
  TransitionChild,
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import AddTripSecondPopUp from './AddTripSecondPopUp.vue'
import Datepicker from 'vue3-datepicker';
import { firebaseApp, db } from '@/firebase'
import { doc, setDoc, collection, getDoc, updateDoc, increment } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default {
  data() {
    return {
      isfirstDialog: true,
      isSecondDialog: false,
      selectedPhoto: [],
      selectedStartDate: null,
      selectedEndDate: null,
      showStartDatepicker: false,
      showEndDatepicker: false,
      tripLocation: '',
      selectedTempPlace: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.$refs.location_input, {
      fields: ["geometry.location", "place_id", "name", "formatted_address"],
      types: ["geocode"],
      });

      google.maps.event.addListener(autocomplete, "place_changed", () => {
        const place = autocomplete.getPlace();
        this.selectedTempPlace = place;
        console.log(this.selectedTempPlace.formatted_address)
      });
    });
  },
  methods: {
    clearStartDate() {
      this.selectedStartDate = null;
    },
    clearEndDate() {
      this.selectedEndDate = null;
    },
    navigateToNextStep() {
      this.isfirstDialog = false;
      this.isSecondDialog = true;
      this.saveTrip();
    },
    closeDialog() {
      this.$emit('closetrip')
    },
    closeDialogOnly() {
      this.$emit('closetriponly')
    },
    handleFileChange(event) {
      const files = event.target.files;
      this.selectedPhoto = []; // clear the array before adding new photos
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedPhoto.push(e.target.result); // push the result into the array
          };
          reader.readAsDataURL(file);
        } else {
          // Show error message
          alert('Please select a JPEG or PNG file.');
        }
      }
    },
    calculateDistance(lat1, lon1, lat2, lon2) {
      const R = 6371; // Radius of the earth in km
      const dLat = this.deg2rad(lat2-lat1);
      const dLon = this.deg2rad(lon2-lon1); 
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      const distance = R * c; // Distance in km
      return parseFloat(distance.toFixed(2));
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    },
    num_of_steps(days) {
      let steps = 0;
      for (let i = 0; i < days; i++) {
        steps += Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000;
      }
      return steps;
    },
    async saveTrip() {
      const auth = getAuth();
      const user = auth.currentUser;
      const userRef = doc(db, 'users', user.email);
      const currentTimestamp = new Date();
      this.tripLocation = this.selectedTempPlace.formatted_address;
      const distance = this.calculateDistance(this.selectedTempPlace.geometry.location.lat(), this.selectedTempPlace.geometry.location.lng(), 
      1.352083, 103.819836); //Latitude and Longitude of Singapore
      const numDays = Math.round((this.selectedEndDate - this.selectedStartDate) / (1000 * 60 * 60 * 24));

      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          Distance_Travelled: 0,
          Num_Visited: 0,
          Steps: 0,
        });
      }

      await updateDoc(userRef, {
          Distance_Travelled: increment(distance),
          Num_Visited: increment(1),
          Steps: increment(this.num_of_steps(numDays)),
      });

      const tripRef = doc(collection(userRef, 'trips'), this.tripName);
      await setDoc(tripRef, {
        Name: this.tripName,
        Location: this.tripLocation,
        Start_Date : this.selectedStartDate,
        End_Date: this.selectedEndDate,
        Cost: this.tripCost,
        Last_Edit: currentTimestamp,
      });

      for(let i = 0; i < this.selectedPhoto.length; i++) {
        this.uploadImage(this.selectedPhoto[i], user.email, this.tripName, tripRef, i)
      }
      console.log('Trip saved successfully');
    },
    dataURLtoFile(dataURL, filename) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    async uploadImage(file_url, user_email, trip_name, trip_ref, image_num) {
      const storage = getStorage(firebaseApp);
      const file = this.dataURLtoFile(file_url, `image_${image_num}.jpg`);
      const fileRef = ref(storage, `users/${user_email}/trips/${trip_name}/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      await uploadTask;

      const fileUrl = await getDownloadURL(fileRef);

      const tripData = await getDoc(trip_ref);

      if (tripData.exists()) {
        const Photos = tripData.data().Photos || [];
        Photos.push(fileUrl);
        await updateDoc(trip_ref, { Photos });
      }
    },
  },
  components: {
    TransitionRoot,
    TransitionChild,
    HeadlessDialog,
    DialogPanel,
    DialogTitle,
    AddTripSecondPopUp,
    Datepicker,
  }
}
</script>

<style>
  .scrollbar::-webkit-scrollbar {
    width: 10px; 
    height: 10px; 
  }

  .scrollbar::-webkit-scrollbar-track {
    background: transparent; 
  }

  .scrollbar::-webkit-scrollbar-thumb {
    background: #888; 
    border-radius: 8px;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555; 
  }

  .scrollbar::-webkit-scrollbar-button {
    display: none; 
  }

  input[type=number]::-webkit-inner-spin-button,

  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>


