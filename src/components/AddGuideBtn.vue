<script>
import AddGuide2 from './AddGuide2.vue'
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import { ref, uploadString, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/firebase'
import { collection, addDoc, updateDoc, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import Datepicker from 'vue3-datepicker'
import GlobalTag from './GlobalTag.vue';

export default {
  emits:['close', 'update-guide-id'],
  components: {
    AddGuide2,
    HeadlessDialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
    Datepicker,
    GlobalTag,
  },
  data() {
    return {
      isFirstOpen: true,
      isSecondOpen: false,
      selectedPhoto: null,
      guideTitle: '',
      destination: '',
      description: '',
      guideId: '',
      selectedStartDate: null,
      selectedEndDate: null,
      showStartDatepicker: false,
      showEndDatepicker: false,
      country: '',
      tagOptions: [
          {id: 1, category: 'Food', colour: "#ec407a"},
          {id: 2, category: 'Nature', colour: "#388e3c"},
          {id: 3, category: 'Landmarks', colour: "#3f51b5"},
          {id: 4, category: 'Culture', colour: "#f57c00"},
          {id: 5, category: 'Entertainment', colour: "#9c27b0"},
      ], 
      // tags: [],
      dropdownOpen: false,
      selectedTags:[],
      hovering: null,
    }
  },
  methods: {
    openSecondModal() {
      this.addGuide()

      this.isFirstOpen = false
      this.isSecondOpen = true
    },
    closeModal() {
      this.$emit('close')
    },
    clearStartDate() {
      this.selectedStartDate = null
    },
    clearEndDate() {
      this.selectedEndDate = null
    },
    selectTag(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags.push(tag);
        this.$emit('update-selectedTags', this.selectedTags);
      }
    },
    removeTag(tagId) {
      this.selectedTags = this.selectedTags.filter(tag => tag.id !== tagId);
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedPhoto = e.target.result
          console.log(this.selectedPhoto)
        }
        reader.readAsDataURL(file)
      } else {
        // Reset selectedPhoto or show error message
        this.selectedPhoto = null
        alert('Please select a JPEG, JPG, or PNG file.')
      }
    },
    async addGuide() {
      let fields = [this.guideTitle, this.destination, this.description, this.selectedPhoto, this.selectedEndDate, this.selectedStartDate, this.selectedTags]

      if (fields.every((field) => field !== '')) {
        try {
          const auth = getAuth()
          const user = auth.currentUser
          const userRef = doc(db, 'users', user.email)
  
          const docRef = doc(collection(userRef, 'guides'), this.guideTitle);
          await setDoc(docRef, {
            Guide_Title: this.guideTitle,
            Destination: this.destination,
            Description: this.description,
            Start_Date: this.selectedStartDate,
            End_Date: this.selectedEndDate,
            Last_Edited: serverTimestamp(),
            Country: this.country,
            Tags: this.selectedTags,
          });
          console.log('Doc created')

          //Get the generated ID
          this.guideId = this.guideTitle
          console.log('Guide ID:', this.guideTitle) // Check guideId value

          // Create storage reference using the generated ID
          const storageRef = ref(storage, `users/${user.email}/guides/${this.guideTitle}/coverPhoto`)

          // Upload the selectedPhoto to Firebase Storage
          const uploadTask = await uploadString(storageRef, this.selectedPhoto, 'data_url')

          // Get the URL of the uploaded image
          const photoURL = await getDownloadURL(uploadTask.ref)

          // Update the guide document to include the coverPhoto
          await updateDoc(docRef, {
            Cover_Photo: photoURL
          })

          console.log('Doc updated in user')

          const globalGuidesRef = doc(collection(db, 'guides'), this.guideTitle);
          await setDoc(globalGuidesRef, {
              Guide_Title: this.guideTitle,
              Destination: this.destination,
              Description: this.description,
              Start_Date: this.selectedStartDate,
              End_Date: this.selectedEndDate,
              Last_Edited: serverTimestamp(),
              Country: this.country,
              Cover_Photo: photoURL,
              Tags: this.selectedTags,
          });
          console.log('Doc created in global guides collection');


          // Emit custom event with guideID
          this.$emit('update-guide-id', this.guideId)
        } catch (e) {
          console.error('Error updating document: ', e)
        }
      } else {
        alert('Please fill out all fields')
        console.log('All fields must be non-empty')
        return
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.$refs.destination_input, {
        fields: ['geometry.location', 'place_id', 'name', 'formatted_address', 'address_components'],
        types: ['geocode']
      })

      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace()
        this.destination = place.formatted_address

        // Extract the country from the address components
        const countryComponent = place.address_components.find(component => component.types.includes('country'));
        if (countryComponent) {
          this.country = countryComponent.long_name;
        }
        console.log(this.destination)
        console.log(this.country)
      })
    })
  }
}
</script>

<template>
  <TransitionRoot appear :show="isFirstOpen" class="bg-white z-15" as="template">
    <HeadlessDialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel class="panel_style scrollbar relative">
              <div class="flex justify-between items-center">
                <DialogTitle class="addGuide_style text-center flex-grow"> Add Guide </DialogTitle>
                <img src="../assets/Multiply.svg" alt="Close" class="cursor-pointer w-6 h-6" @click="closeModal" />
              </div>
              <br />

              <div class="mt-2">
                <div class="place-self-auto items-center justify-center flex">
                  <label for="dropzone-file" :class="selectedPhoto
                      ? 'flex items-center justify-center rounded-lg cursor-pointer'
                      : 'flex items-center justify-center border border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'
                    " @contextmenu.prevent="confirmRemove">
                    <div class="flex flex-col items-center justify-center w-52 h-40">
                      <!-- Show uploaded image or camera icon based on whether an image has been uploaded -->
                      <img v-if="selectedPhoto" :src="selectedPhoto" alt="Uploaded Image"
                        class="object-cover rounded-lg w-52 h-40" />
                      <template v-else>
                        <img class="text-gray-500 dark:text-gray-400" aria-hidden="true" src="../assets/Camera.svg" />
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">
                          Add Photo
                        </p>
                      </template>
                    </div>
                    <input id="dropzone-file" type="file" class="hidden" @change="handleFileChange"
                      accept=".jpg, .jpeg, .png" />
                  </label>
                </div>

                <br />

                <h5>Guide Title</h5>
                <div class="flex relative">
                  <span class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    <img src='@/assets/PencilSquare.svg' alt="tag" width="20" height="20" fill="currentColor"
                      viewBox="0 0 1792 1792">
                  </span>
                  <input type="text" v-model="guideTitle" id="guideTitle"
                    class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    name="guideTitle" placeholder="Guide Title" />
                </div>
                <br />

                <h5>Destination</h5>
                <div class="flex relative">
                  <span
                    class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    <img src="@/assets/globeIcon.svg" alt="globe" width="20" height="20" fill="currentColor"
                      viewBox="0 0 1792 1792">
                  </span>
                  <input ref="destination_input" type="text" v-model="destination" id="destination"
                    class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    name="destination" placeholder="Where?" />
                </div>
                <br />

                <h5>Tags</h5>
                <div class="flex relative ">
                  <span class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    <img src='@/assets/tagIcon.svg' alt="tag" width="20" height="20" fill="currentColor"
                      viewBox="0 0 1792 1792">
                  </span>

                  <div class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-1/2 p-1 mr-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent">
                    <!-- Tag Inputs that are rendered once selected-->
                    <div class="flex-wrap flex">
                      <div v-for="tag in selectedTags" :key="tag.id" class="mr-2 mb-2 relative flex items-center hover:text-gray-700 cursor-pointer" @mouseover="hovering = tag.id" @mouseleave="hovering = null">
                        <GlobalTag :tagCategory="tag.category" :textColor="tag.colour" :borderColor="tag.colour"/>
                        <span @click="removeTag(tag.id)" class="ml-1 text-sm text-gray-400 hover:text-gray-700 cursor-pointer" v-show="hovering === tag.id">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </span>
                        
                      </div>
                    </div>
                    <!-- Tag Options Dropdown -->
                    <div class="relative w-full" @click="dropdownOpen = !dropdownOpen">
                        <button
                          class="py-2 px-3 w-full hover:bg-gray-700 hover:bg-opacity-10 flex items-center gap-2 rounded"
                        >
                          <span class="text-gray-400">Select Tags</span>
                            <img v-if="!dropdownOpen" src="../assets/ChevronDown.svg" alt="chevron" width="30" height="30" fill="currentColor" viewbox="0 0 24 24" class="pointer-events-none absolute right-0 flex items-center pr-3">
                            <img v-if="dropdownOpen" src="../assets/ChevronUp.svg" alt="chevron" width="30" height="30" fill="currentColor" viewbox="0 0 24 24" class="pointer-events-none absolute right-0 flex items-center pr-3">
                          
                        </button>
                        <div v-if="dropdownOpen" class="relative bg-white mt-2 rounded-md w-full">
                          <ul class="py-1 text-base leading-6 rounded-md shadow-xs overflow-auto max-h-60">
                            <li v-for="tag in tagOptions" :key="tag.id" @click="selectTag(tag)" class="mb-2 text-gray-700 cursor-pointer select-none relative py-2 pr-9 hover:bg-gray-300 hover:text-white rounded-md">
                              <span class="font-normal ml-2block truncate">
                                <GlobalTag :key='tag.id' :tagCategory='tag.category' :textColor="tag.colour" :borderColor="tag.colour"/>  
                              </span>
                            </li>
                          </ul>
                        </div>
                    </div>
                  </div>
              
                </div>
                <br />

                <h5>Dates</h5>
                <div class="flex relative">
                  <!-- Select Dates Inputs -->
                  <div class="mb-[2.1vh]">
                    <div date-rangepicker class="flex items-center justify-center">
                      <div class="relative">
                        <Datepicker v-model="selectedStartDate" :show="showStartDatepicker"
                          @update:show="(val) => (showStartDatepicker = val)"
                          class="w-[20vw] h-[7vh] border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Start Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[1.4vh] pointer-events-none">
                          <svg class="w-[2.1vh] h-[2.1vh] text-gray-800 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-[1.4vh] cursor-pointer"
                          @click="clearStartDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-[2.1vh] h-[2.1vh]" />
                        </div>
                      </div>
                      <span class="mx-[2.1vh] text-gray-500">-</span>
                      <div class="relative">
                        <Datepicker v-model="selectedEndDate" :show="showEndDatepicker"
                          @update:show="(val) => (showEndDatepicker = val)"
                          class="w-[20vw] h-[7vh] border border-gray-300 text-gray-900 text-sm rounded-lg pl-12 pr-2.5 pt-2.5 pb-2.5 focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="End Date">
                        </Datepicker>
                        <div class="absolute inset-y-0 left-0 flex items-center pl-[1.6vh] pointer-events-none">
                          <svg class="w-[2.1vh] h-[2.1vh] text-gray-800 dark:text-gray-400" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-[1.6vh] cursor-pointer"
                          @click="clearEndDate">
                          <img src="../assets/Multiply.svg" alt="Close Icon" class="w-[2.1vh] h-[2.1vh]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <h4>Brief Description</h4>

                <label class="text-gray-700" for="name">
                  <textarea
                    class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    id="description" v-model="description" type="text" placeholder="Write your description here"
                    name="description" rows="2" cols="40"></textarea>
                </label>
              </div>
              <div class="mt-4 justify-center flex items-center">
                <button @click="openSecondModal" class="nextBtn_style">Next</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>

  <AddGuide2 v-if="isSecondOpen" @close="closeModal" :guideId="guideId" @update-guide-id="guideId = $event" />
</template>

<style scoped>
.panel_style {
  @apply h-[85vh] w-[50vw] overflow-y-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all;
}

.addGuide_style {
  @apply text-2xl font-semibold leading-6 text-gray-900 justify-center ml-10 items-center;
}

.photoInput_style {
  @apply rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent;
}

.nextBtn_style {
  @apply inline-flex justify-center rounded-lg border-2 shadow-lg border-[#C1C1C1] px-3 py-1 text-sm font-normal text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2;
}

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
</style>
