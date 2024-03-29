<script setup>
import { ref } from 'vue'

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

const isOpen = ref(true)

function submit() {
  isOpen.value = false
}

const advices = ref([{ id: 1, content: '', visible: true }])
const places = ref([{id: 1, visible: true}])
const placesToEat = ref([{id:1, visible: true}])
const placesToStay = ref([{id:1, visible: true}])
const placesNearby = ref([{id:1, visible: true}])

// Initialize an id counter
let adId = 2;
const addAdvice = (content) => {
  const newAdvice = {
    id: `advice-${adId++}`, // Increment the id for each new advice
    content: content,
    visible: true
  };
  advices.value.push(newAdvice);
}

function deleteAdvice(advice) {
  if(confirm('Are you sure you want to remove the Advice?')) {
    advice.visible = !advice.visible;
    const index = this.advices.indexOf(advice);
    if (index !== -1) {
      this.advices.splice(index, 1);
    }
  }
}

function updateContent(advice, content) {
      advice.content = content;
}

// Function to add a new AddPlaces component
let pId = 2;
const addPlace = () => {
  const newPlace = {
    id: `place-${pId++}`, 
    visible: true
  };
  places.value.push({newPlace})
}

function deletePlace(place) {
  if(confirm('Are you sure you want to remove the Place?')) {
    place.visible = !place.visible;
    const index = this.places.indexOf(place);
    if (index !== -1) {
      this.places.splice(index, 1);
    }
  }
}

let peId = 2;
const addPlaceToEat = () => {
  const newPlace = {
    id: `place-${peId++}`, // Increment the id for each new advice
    visible: true
  };
  placesToEat.value.push({newPlace})
}

function deletePlaceToEat(place) {
  if(confirm('Are you sure you want to remove the Place?')) {
    place.visible = !place.visible;
    const index = this.placesToEat.indexOf(place);
    if (index !== -1) {
      this.placesToEat.splice(index, 1);
    }
  }
}


let psId = 2;
const addPlaceToStay = () => {
  const newPlace = {
    id: `place-${psId++}`, // Increment the id for each new advice
    visible: true
  };
  placesToStay.value.push({newPlace})
}

function deletePlaceToStay(place) {
  if(confirm('Are you sure you want to remove the Place?')) {
    place.visible = !place.visible;
    const index = this.placesToStay.indexOf(place);
    if (index !== -1) {
      this.placesToStay.splice(index, 1);
    }
  }
}

let pnId = 2;
const addPlaceNearby = () => {
  const newPlace = {
    id: `place-${pnId++}`, // Increment the id for each new advice
    visible: true
  };
  placesNearby.value.push({newPlace})
}

function deletePlaceNearby(place) {
  if(confirm('Are you sure you want to remove the Place?')) {
    place.visible = !place.visible;
    const index = this.placesNearby.indexOf(place);
    if (index !== -1) {
      this.placesNearby.splice(index, 1);
    }
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
              <DialogPanel class="panel_style">
                <DialogTitle as="h3" class="addGuide_style"> Add Guide </DialogTitle>
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
                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <!-- <div v-for="(place) in places" :key="place.id" @contextmenu.prevent="deletePlace(place)">
                            <AddPlaces v-show="place.visible"/> -->

                          <div v-for="(place) in places" :key="place.id" @contextmenu.prevent="deletePlace(place)">
                            <div v-if="place.visible"></div>
                            <AddPlaces />
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
                  </Disclosure>
                  <br />

                  <Disclosure v-slot="{ open }">
                    <DisclosureButton class="disclosureButton">
                      <span class="flex w-full right-5 space-x-3">
                        <img src="../assets/cutleryIcon.png" class="w-5 h-5 stroke-width-1.5" />
                        <h4>Places to Eat</h4>
                      </span>
                      <!-- <span>Places to Eat</span> -->

                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6" :class="{ 'rotate-180': open, 'w-6': true, 'h-6': true }">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </DisclosureButton>
                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(place) in placesToEat" :key="place.id" @contextmenu.prevent="deletePlaceToEat(place)">
                            <div v-if="place.visible"></div>
                            <AddPlaces/>
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
                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(place) in placesToStay" :key="place.id" @contextmenu.prevent="deletePlaceToStay(place)">
                            <div v-if="place.visible"></div>
                            <AddPlaces/>
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
                    <DisclosurePanel class="flex w-full px-4 pb-2 pt-4 text-sm text-gray-500">
                      <div class="flex flex-col w-full">
                        <div v-for="(place) in placesNearby" :key="place.id" @contextmenu.prevent="deletePlaceNearby(place)">
                            <div v-if="place.visible"></div>
                            <AddPlaces/>
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
                  </Disclosure>
                  <br />
                </div>

                <div class="mt-4 justify-center flex items-center">
                  <button type="button" class="nextBtn_style" @click="submit">Submit</button>
                </div>
              </DialogPanel>
            </TransitionChild>
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
  @apply text-lg font-medium leading-6 text-gray-900 justify-center flex items-center;
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
</style>
