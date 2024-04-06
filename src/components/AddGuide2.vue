<script>
import {
  Dialog as HeadlessDialog,
  DialogPanel,
  DialogTitle,
  TransitionRoot,
  TransitionChild,
  Disclosure,
  DisclosureButton,
  DisclosurePanel
} from '@headlessui/vue'
import AddPlaces from './AddPlaces.vue'
import AddGeneralAdvice from './AddGeneralAdvice.vue'
import { db, storage} from '@/firebase'
import { collection, addDoc, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { ref, uploadString, getDownloadURL, uploadBytesResumable} from 'firebase/storage'


export default {
  props: {
    guideId: {
      type: String,
      required: true
    }
  },
  components: {
    HeadlessDialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    AddPlaces,
    AddGeneralAdvice
  },
  data() {
    return {
      isOpen: true,
      isLoading: false,
      advices: [{ id: 1, content: '', visible: true }],
      places: [{ id: 1, location: '', tags: [], cost: '', summary: '', selectedPhoto: '', visible: true }],
      placesToEat: [{ id: 1, location: '', tags: [], cost: '', summary: '', selectedPhoto: '', visible: true }],
      placesToStay: [{ id: 1, location: '', tags: [], cost: '', summary: '', selectedPhoto: '', visible: true }],
      placesNearby: [{ id: 1, location: '', tags: [], cost: '', summary:'', selectedPhoto: '', visible: true }]
    }
  },
  methods: {
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
    async submit() {
      this.isLoading = true;
      try {
        const auth = getAuth()
        const user = auth.currentUser

        let numAdvice = 1
  
        if (this.advices[0].location != "") {
          for (let advice of this.advices) {
            console.log(this.advices)
            const newAdviceRef = doc(db, 'users', user.email, "guides", this.guideId, 'advices', `advice${numAdvice}`);
            await setDoc(newAdviceRef, {
              Content: advice.content,
            })
            numAdvice++
            // const newAdviceRef = addDoc(collection(db, 'users', user.email, "guides", this.guideId, 'advices'), {
            //   Content: advice.content,
            // })
            console.log("Advice document written with ID: ", newAdviceRef.id);
          }
        }
        if (this.places[0].location != "") {
          for (let place of this.places) {
            console.log(this.places)
            console.log(place)
            console.log(place.location)

            //create storage reference
            const storageRef = ref(storage,`users/${user.email}/guides/${this.guideId}/places/${place.location}`)

            const file = this.dataURLtoFile(place.selectedPhoto, `image_${place.location}.jpg`)
            // Upload the selectedPhoto to Firebase Storage
            const uploadTask = await uploadBytesResumable(storageRef, file);

            // Get the URL of the uploaded image
            const photoURL = await getDownloadURL(uploadTask.ref);
      
            const newPlaceRef = doc(db, 'users', user.email, "guides", this.guideId, 'places', place.location)
            await setDoc(newPlaceRef, {
              Location: place.location,
              Tags: place.tags,
              Cost: place.cost,
              Summary: place.summary,
              Photo: photoURL,
            })
            console.log("Place document written with ID: ", newPlaceRef.id);
          }
        }

        if (this.placesToEat[0].location != "") {
          for (let place of this.placesToEat) {
            //create storage reference
            const storageRef = ref(storage,`users/${user.email}/guides/${this.guideId}/placesToEat/${place.location}`)
            const file = this.dataURLtoFile(place.selectedPhoto, `image_${place.location}.jpg`)
            // Upload the selectedPhoto to Firebase Storage
            const uploadTask = await uploadBytesResumable(storageRef, file);
            // Get the URL of the uploaded image
            const photoURL = await getDownloadURL(uploadTask.ref);

            const newPlaceRef = doc(db, 'users', user.email, "guides", this.guideId, 'placesToEat', place.location)
            await setDoc(newPlaceRef, {
              Location: place.location,
              Tags: place.tags,
              Cost: place.cost,
              Summary: place.summary,
              Photo: photoURL,
            })
            console.log("Place document written with ID: ", newPlaceRef.id);
          }
        }

        if (this.placesToStay[0].location != "") {
          for (let place of this.placesToStay) {
            //create storage reference
            const storageRef = ref(storage,`users/${user.email}/guides/${this.guideId}/placesToStay/${place.location}`)

            const file = this.dataURLtoFile(place.selectedPhoto, `image_${place.location}.jpg`)
            // Upload the selectedPhoto to Firebase Storage
            const uploadTask = await uploadBytesResumable(storageRef, file);
            // Get the URL of the uploaded image
            const photoURL = await getDownloadURL(uploadTask.ref);

            const newPlaceRef = doc(db, 'users', user.email, "guides", this.guideId, 'placesToStay', place.location)
            await setDoc(newPlaceRef, {
              Location: place.location,
              Tags: place.tags,
              Cost: place.cost,
              Summary: place.summary,
              Photo: photoURL,
            })
            console.log("Place document written with ID: ", newPlaceRef.id);
          }
        }

        if (this.placesNearby[0].location != "") {
          for (let place of this.placesNearby) {
            //create storage reference
            const storageRef = ref(storage,`users/${user.email}/guides/${this.guideId}/placesNearby/${place.location}`)

            const file = this.dataURLtoFile(place.selectedPhoto, `image_${place.location}.jpg`)
            // Upload the selectedPhoto to Firebase Storage
            const uploadTask = await uploadBytesResumable(storageRef, file);
            // Get the URL of the uploaded image
            const photoURL = await getDownloadURL(uploadTask.ref);

            const newPlaceRef = doc(db, 'users', user.email, "guides", this.guideId, 'placesNearby', place.location)
            await setDoc(newPlaceRef, {
              Location: place.location,
              Tags: place.tags,
              Cost: place.cost,
              Summary: place.summary,
              Photo: photoURL,
            })
            console.log("Place document written with ID: ", newPlaceRef.id);
          }
        }

      } catch (e) {
        console.error("Error adding document: ", e);
      } finally {
        this.isLoading = false;
        this.isOpen = false
        this.$emit('close')
      }
    },
    async exit() {
      try {
        this.isOpen = false
        this.$emit('close')
        const auth = getAuth()
        const user = auth.currentUser
        await deleteDoc(doc(db, 'users', user.email, "guides", this.guideId))
        console.log("Document successfully deleted!")
      } catch(e) {
        console.error("Error deleting document: ", e);
      }
    },
    addAdvice(content) {
      const newAdvice = {
        id: `advice-${this.advices.length + 1}`,
        content: content,
        visible: true
      }
      this.advices.push(newAdvice)
    },
    deleteAdvice(advice) {
      if (confirm('Are you sure you want to remove the Advice?')) {
        advice.visible = !advice.visible
        const index = this.advices.indexOf(advice)
        if (index !== -1) {
          this.advices.splice(index, 1)
        }
      }
    },
    updateContent(advice, content) {
      advice.content = content
    },
    updateLocation(place, location) {
      place.location = location
    },
    updateTags(place, tags) {
      place.tags = tags
    },
    updateCost(place, cost) {
      place.cost = cost
    },
    updateSummary(place, summary) {
      place.summary = summary
    },
    updatePhoto(place, photo) {
      place.selectedPhoto = photo

    },
    addPlace() {
      const newPlace = {
        id: `place-${this.places.length + 1}`,
        location: '', 
        tags: [], 
        cost: '', 
        summary: '', 
        selectedPhoto: '',
        visible: true
      }
      this.places.push(newPlace)
    },
    deletePlace(place) {
      if (confirm('Are you sure you want to remove the Place?')) {
        place.visible = !place.visible
        const index = this.places.indexOf(place)
        if (index !== -1) {
          this.places.splice(index, 1)
        }
      }
    },
    addPlaceToEat() {
      const newPlace = {
        id: `place-${this.placesToEat.length + 1}`,
        location: '', 
        tags: [], 
        cost: '', 
        summary: '', 
        selectedPhoto: '',
        visible: true
      }
      this.placesToEat.push(newPlace)
    },
    deletePlaceToEat(place) {
      if (confirm('Are you sure you want to remove the Place?')) {
        place.visible = !place.visible
        const index = this.placesToEat.indexOf(place)
        if (index !== -1) {
          this.placesToEat.splice(index, 1)
        }
      }
    },
    addPlaceToStay() {
      const newPlace = {
        id: `place-${this.placesToStay.length + 1}`,
        location: '', 
        tags: [], 
        cost: '', 
        summary: '', 
        selectedPhoto: '',
        visible: true
      }
      this.placesToStay.push(newPlace)
    },
    deletePlaceToStay(place) {
      if (confirm('Are you sure you want to remove the Place?')) {
        place.visible = !place.visible
        const index = this.placesToStay.indexOf(place)
        if (index !== -1) {
          this.placesToStay.splice(index, 1)
        }
      }
    },
    addPlaceNearby() {
      const newPlace = {
        id: `place-${this.placesNearby.length + 1}`,
        location: '', 
        tags: [], 
        cost: '', 
        summary: '', 
        selectedPhoto: '',
        visible: true
      }
      this.placesNearby.push(newPlace)
    },
    deletePlaceNearby(place) {
      if (confirm('Are you sure you want to remove the Place?')) {
        place.visible = !place.visible
        const index = this.placesNearby.indexOf(place)
        if (index !== -1) {
          this.placesNearby.splice(index, 1)
        }
      }
    }
  },
  mounted() {
    console.log('Guide ID received:', this.guideId); // Check guideId prop

  }
}
</script>

<template>
  <div class="bg-white bg-opacity-100 z-15" v-if="isOpen">
    <TransitionRoot appear :show="isOpen" as="template">
      <HeadlessDialog as="div" class="relative z-10">
        <TransitionChild as="template" enter="duration-150 ease-out" enter-from="opacity-100" enter-to="opacity-100"
          leave="duration-150 ease-in" leave-from="opacity-100" leave-to="opacity-100">
          <div class="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-100 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-100 scale-95">
              <DialogPanel class="panel_style relative">
                <div class="flex justify-between items-center">
                  <DialogTitle class="addGuide_style text-center flex-grow"> Add Guide </DialogTitle>
                  <img src="../assets/Multiply.svg" alt="Close" class="cursor-pointer w-6 h-6" @click="exit" />
                </div>
                <br />
                <div class="mt-2">
                  <Disclosure v-slot="{ open }">
                    <DisclosureButton class="disclosureButton">
                      <span class="flex w-full right-5 space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="black" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

                        <h4>General Advice</h4>
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6" :class="{ 'rotate-180': open, 'w-6': true, 'h-6': true }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </DisclosureButton>
                    <transition
                      enter-active-class="transition duration-300 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-200 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >

                    <!-- Add General Advice Components -->

                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(advice) in advices" :key="advice.id" @contextmenu.prevent="deleteAdvice(advice)">
                            <AddGeneralAdvice v-show="advice.visible" :content="advice.content" @content-updated="updateContent(advice, $event)"/>
                            <br>
                        </div>

                        <div class="flex flex-row justify-end mt-2">
                          <button @click="addAdvice">
                            <div className="w-7 h-7  bg-neutral-700 rounded-[7px]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="white" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </DisclosurePanel>
                    </transition>
                  </Disclosure>
                  <br />

                  <Disclosure v-slot="{ open }">
                    <DisclosureButton class="disclosureButton">
                      <span class="flex w-full right-5 space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="black" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                        </svg>

                        <h4>Places to Visit</h4>
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6" :class="{ 'rotate-180': open, 'w-6': true, 'h-6': true }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </DisclosureButton>
                    <transition
                      enter-active-class="transition duration-300 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-200 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >

                    <!-- Places to Visit Components -->

                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                          <div v-for="(place) in places" :key="place.id" @contextmenu.prevent="deletePlace(place)">
                            <div v-if="place.visible"></div>

                            <AddPlaces :id="place.id" @location-updated="updateLocation(place, $event)" @tags-updated="updateTags(place, $event)" @cost-updated="updateCost(place, $event)" @summary-updated="updateSummary(place, $event)" @photo-updated="updatePhoto(place, $event)"/>

                          <br />
                        </div>

                        <div class="flex flex-row justify-end mt-2">
                          <button @click="addPlace">
                            <div className="w-7 h-7  bg-neutral-700 rounded-[7px]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="white" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </DisclosurePanel>
                    </transition>
                  </Disclosure>
                  <br />

                  <Disclosure v-slot="{ open }">
                    <DisclosureButton class="disclosureButton">
                      <span class="flex w-full right-5 space-x-3">
                        <img src="../assets/cutleryIcon.png" class="w-5 h-5 stroke-width-1.5" />
                        <h4>Places to Eat</h4>
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6" :class="{ 'rotate-180': open, 'w-6': true, 'h-6': true }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </DisclosureButton>
                    <transition
                      enter-active-class="transition duration-300 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-200 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >

                    <!-- Places to Eat Components -->

                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(place) in placesToEat" :key="place.id" @contextmenu.prevent="deletePlaceToEat(place)">
                            <div v-if="place.visible"></div>

                            <AddPlaces :id="place.id" @location-updated="updateLocation(place, $event)" @tags-updated="updateTags(place, $event)" @cost-updated="updateCost(place, $event)" @summary-updated="updateSummary(place, $event)" @photo-updated="updatePhoto(place, $event)"/>

                          <br />
                        </div>

                        <div class="flex flex-row justify-end mt-2">
                          <button @click="addPlaceToEat">
                            <div className="w-7 h-7  bg-neutral-700 rounded-[7px]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="white" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </DisclosurePanel>
                    </transition>
                  </Disclosure>
                  <br />

                  <Disclosure v-slot="{ open }">
                    <DisclosureButton class="disclosureButton">
                      <span class="flex w-full right-5 space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="black" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>

                        <h4>Places to Stay</h4>
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6" :class="{ 'rotate-180': open, 'w-6': true, 'h-6': true }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </DisclosureButton>
                    <transition
                      enter-active-class="transition duration-300 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-200 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >

                    <!-- Places To Stay Component -->

                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(place) in placesToStay" :key="place.id" @contextmenu.prevent="deletePlaceToStay(place)">
                            <div v-if="place.visible"></div>
                            <AddPlaces :id="place.id" @location-updated="updateLocation(place, $event)" @tags-updated="updateTags(place, $event)" @cost-updated="updateCost(place, $event)" @summary-updated="updateSummary(place, $event)" @photo-updated="updatePhoto(place, $event)"/>
                          <br />
                        </div>

                        <div class="flex flex-row justify-end mt-2">
                          <button @click="addPlaceToStay">
                            <div className="w-7 h-7  bg-neutral-700 rounded-[7px]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="white" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </DisclosurePanel>
                    </transition>
                  </Disclosure>
                  <br />

                  <Disclosure v-slot="{ open }">
                    <DisclosureButton class="disclosureButton">
                      <span class="flex w-full right-5 space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="black" class="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
                        </svg>

                        <h4>Nearby Places</h4>
                      </span>

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6" :class="{ 'rotate-180': open, 'w-6': true, 'h-6': true }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </DisclosureButton>
                    <transition
                      enter-active-class="transition duration-300 ease-out"
                      enter-from-class="transform scale-95 opacity-0"
                      enter-to-class="transform scale-100 opacity-100"
                      leave-active-class="transition duration-200 ease-in"
                      leave-from-class="transform scale-100 opacity-100"
                      leave-to-class="transform scale-95 opacity-0"
                    >

                    <!-- Nearby Places Components -->

                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(place) in placesNearby" :key="place.id" @contextmenu.prevent="deletePlaceNearby(place)">
                            <div v-if="place.visible"></div>
                            <AddPlaces :id="place.id" @location-updated="updateLocation(place, $event)" @tags-updated="updateTags(place, $event)" @cost-updated="updateCost(place, $event)" @summary-updated="updateSummary(place, $event)" @photo-updated="updatePhoto(place, $event)"/>
                          <br />
                        </div>

                        <div class="flex flex-row justify-end mt-2">
                          <button @click="addPlaceNearby">
                            <div className="w-7 h-7  bg-neutral-700 rounded-[7px]">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="white" class="w-7 h-7">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                    </DisclosurePanel>
                    </transition>
                  </Disclosure>
                  <br />
                </div>

                <!-- Submit Button -->
                <div class="mt-4 justify-center flex items-center">
                  <button type="button" class="nextBtn_style" @click="submit">Submit</button>
                </div>
              </DialogPanel>
            </TransitionChild>

            <!-- Loading spinner -->
            <div v-if="isLoading" class="loading-spinner fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <div class="spinner"></div>
            </div>

          </div>
        </div>
      </HeadlessDialog>
    </TransitionRoot>
  </div>
</template>

<style scoped>
.addBtn_position {
  @apply fixed inset-0 flex items-center justify-center;
}

.addBtn_style {
  @apply rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75;
}

.panel_style {
  @apply w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all;
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

.disclosureButton {
  @apply flex w-full justify-between rounded-lg bg-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-blue-400 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75;
}

.loading-spinner {
  background: rgba(0, 0, 0, 0.5);
}

.spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #42a5f5; /* Blue */
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
