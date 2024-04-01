<script>
import AddGuide2 from './AddGuide2.vue'
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild
} from '@headlessui/vue'
import {ref, uploadString, getDownloadURL} from 'firebase/storage'
import { db, storage } from '@/firebase'
import { collection, addDoc} from "firebase/firestore";
import { getAuth } from 'firebase/auth'

export default {
  components: {
    AddGuide2,
    HeadlessDialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild
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
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedPhoto = e.target.result
        }
        reader.readAsDataURL(file)
        console.log(this.selectedPhoto)
      } else {
        // Reset selectedPhoto or show error message
        this.selectedPhoto = null
        alert('Please select a JPEG, JPG, or PNG file.')
      }
    },
    async addGuide() {

      let fields = [this.guideTitle, this.destination, this.description, this.selectedPhoto]

      if (fields.every(field => field !== '')) {
        try {
          const auth = getAuth()
          const user = auth.currentUser

          //create storage reference
          const storageRef = ref(storage,`users/${user.email}/guides/${this.guideTitle}/coverPhoto`)

          // Upload the selectedPhoto to Firebase Storage
          const uploadTask = await uploadString(storageRef, this.selectedPhoto, 'data_url');

          // Get the URL of the uploaded image
          const photoURL = await getDownloadURL(uploadTask.ref);

          const docRef = await addDoc(collection(db, 'users', user.email, "guides"), {
            title: this.guideTitle,
            destination: this.destination,
            description: this.description,
            coverPhoto: photoURL,
          })
          console.log('Doc updated')

          // Emit custom event with guideID
          this.guideId = docRef.id
          console.log('Guide ID:', this.guideId); // Check guideId value
          this.$emit('update-guide-id', this.guideId)
        } catch (e) {
          console.error('Error updating document: ', e)
        }
          
      } else {
        alert('Please fill out all fields')
        console.log('All fields must be non-empty')
      }
    }
  },
}
</script>

<template>
  <TransitionRoot appear :show="isFirstOpen" class="bg-white z-15" as="template">
    <HeadlessDialog as="div" class="relative z-10">
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

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel class="panel_style scrollbar relative">
              <div class="flex justify-between items-center">
                  <DialogTitle class="addGuide_style text-center flex-grow"> Add Guide </DialogTitle>
                  <img src="../assets/Multiply.svg" alt="Close" class="cursor-pointer w-6 h-6" @click="closeModal" />
              </div>
              <br />

              <div class="mt-2">
                  <div class="place-self-auto items-center justify-center flex">
                    <label for="dropzone-file" 
                      :class="selectedPhoto ? 'flex items-center justify-center rounded-lg cursor-pointer' : 'flex items-center justify-center border border-gray-300 border-dashed rounded-lg cursor-pointer bg-white dark:hover:bg-bray-800 dark:bg-gray-500 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600'"
                      @contextmenu.prevent="confirmRemove">
                        <div class="flex flex-col items-center justify-center w-52 h-40">
                            <!-- Show uploaded image or camera icon based on whether an image has been uploaded -->
                            <img v-if="selectedPhoto" :src="selectedPhoto" alt="Uploaded Image" class="object-cover rounded-lg w-52 h-40">
                            <template v-else>
                              <img class="text-gray-500 dark:text-gray-400" aria-hidden="true" src="../assets/Camera.svg">
                              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400 font-semibold">Add Photo</p>
                            </template>
                        </div>
                        <input id="dropzone-file" type="file" class="hidden"  @change="handleFileChange" accept=".jpg, .jpeg, .png"/>
                    </label>
                  </div> 
                
                <br />

                <h5>Guide Title</h5>
                <div class="flex relative">
                  <span
                    class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    v-model="guideTitle"
                    id="guideTitle"
                    class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    name="guideTitle"
                    placeholder="Guide Title"
                  />
                </div>
                <br />

                <h5>Destination</h5>
                <div class="flex relative">
                  <span
                    class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"
                  >
                    <!-- <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                        </svg> -->

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    v-model="destination"
                    id="destination"
                    class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    name="destination"
                    placeholder="Where?"
                  />
                </div>
                <br />

                <h4>Brief Description</h4>

                <label class="text-gray-700" for="name">
                  <textarea
                    class="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent"
                    id="description"
                    v-model="description"
                    type="text"
                    placeholder="Write your description here"
                    name="description"
                    rows="2"
                    cols="40"
                ></textarea>
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
  <AddGuide2 v-if="isSecondOpen" @close="closeModal" :guideId="guideId" @update-guide-id="guideId = $event"/>
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
