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
              <div class="flex mb-[2.1vh] text-center relative">
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
                  <h5>Trip Name</h5>
                <div class="flex relative ">
                    <span class="rounded-l-md inline-flex  items-center px-[2vh] border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-[1.8vh]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
                      </svg>
                    </span>
                    <input v-model="tripName" type="text" id="trip-name-with-icon" class=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-[1.05vh] px-[2.1vh] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="email" placeholder="Trip Name"/>
                    </div>
                </div>

                <!-- Trip Location Dropdown -->
                <div class="mb-[2.1vh] mt-[4.5vh]">
                  <h5>Destination</h5>
                    <div class="flex relative">
                        <span class="rounded-l-md inline-flex items-center px-[2vh] border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-[1.8vh]">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                          </svg>
                        </span>
                        <input ref="location_input" v-model="tripLocation" type="text" id="trip-location-with-icon" class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-[1.05vh] px-[2.1vh] bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="location" placeholder="Where?" />
                    </div>
                </div>


                <!-- Select Dates Inputs -->

                <div class="mb-[2.1vh] mt-[4.5vh]">
                  <div class="flex items-center">
                      <h5>Dates</h5>
                  </div>

                  <div date-rangepicker class="flex items-center justify-between">
                    <div class="relative">
                      <Datepicker v-model="selectedStartDate" :show="showStartDatepicker" @update:show="val => showStartDatepicker = val" class="w-[20vw] h-[7vh] border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Start Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[1.4vh] pointer-events-none text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
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
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[1.6vh] pointer-events-none text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-[1.6vh] cursor-pointer" @click="clearEndDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-[2.1vh] h-[2.1vh]">
                        </div>
                      </div>
                  </div>
              </div>
                
              <!-- Cost Input -->

                <div class="mb-[2.1vh] mt-[4.5vh]">
                <h5 for="cost">
                    Cost
                </h5>
                <div class="mb-[2.1vh]">
                <div class="flex relative">
                    <span class="rounded-l-md inline-flex items-center px-[1.6vh] border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-[1.8vh]">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                      </svg>
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
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

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
      if (this.fieldsFilled()) {
        this.isfirstDialog = false;
        this.isSecondDialog = true;
        this.saveTrip();
      } else {
        const errorMessage = 'Please fill in all fields!'
        $toast.error(errorMessage, {
          position: 'top'
        })
      }
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
    fieldsFilled() {
      return this.tripName && this.tripLocation && this.selectedStartDate && this.selectedEndDate && this.tripCost && this.selectedPhoto.length > 0;
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
      const steps = this.num_of_steps(numDays);
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
          Steps: increment(steps),
      });

      const tripRef = doc(collection(userRef, 'trips'), this.tripName);
      await setDoc(tripRef, {
        Name: this.tripName,
        Location: this.tripLocation,
        Start_Date : this.selectedStartDate,
        End_Date: this.selectedEndDate,
        Cost: this.tripCost,
        Last_Edit: currentTimestamp,
        Distance_Travelled: distance,
        Steps: steps,
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

<style scoped>
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


