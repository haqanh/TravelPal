<template>
<TransitionRoot appear :show="isOpen"  as="template" v-if="isOpen">
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
      <div class="z-50 fixed inset-0 flex items-center justify-center overflow-y-auto">
        <div class="p-4 text-center">
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
              class="h-auto w-[40vw] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl"
            >
              <DialogTitle
                as="h3"
                class="mb-5 text-center text-lg leading-6 text-[#3F3D3D] font-semibold text-[26px]"
              >
                Add Trip
              </DialogTitle>
              <div class="mt-2">
                <div class="mb-10">
                <div class="flex relative">
                    <span class="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                        <img src= "../assets/Align Left.svg" width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792">
                            <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                            </path>
                    </span>
                    <textarea v-model="summary" type="text" id="summary" class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-[455px] h-[200px] py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent" name="email" placeholder="Write a short summary"></textarea>
                    </div>
                </div>
                <h5>Tags</h5>
                <div class="flex relative">
                  <span class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm">
                    <img src='@/assets/tagIcon.svg' alt="tag" width="20" height="20" fill="currentColor"
                      viewBox="0 0 1792 1792">
                  </span>

                  <div class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-1/2 p-1 mr-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-0 focus:ring-2 focus:ring-gray-800 focus:border-transparent">
                    <!-- Tag Inputs that are rendered once selected-->
                    <div class="flex-wrap flex">
                      <div v-for="tag in tags" :key="tag" class="mr-2 mb-2 relative flex items-center hover:text-gray-700 cursor-pointer" @mouseover="hovering = tag" @mouseleave="hovering = null">
                        <GlobalTags :tagCategory="tag"/>
                        <span @click="removeTag(tag)" class="ml-1 text-sm text-gray-400 hover:text-gray-700 cursor-pointer" v-show="hovering === tag">
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
                            <li v-for="tag in tagOptions" :key="tag" @click="selectTag(tag)" class="mb-2 text-gray-700 cursor-pointer select-none relative py-2 pr-9 hover:bg-gray-300 hover:text-white rounded-md">
                              <span class="font-normal ml-2block truncate">
                                <GlobalTags :key='tag' :tagCategory='tag'/>  
                              </span>
                            </li>
                          </ul>
                        </div>
                    </div>
                  </div>
                </div>
            </div>


              <div class="mt-4 text-center">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-lg border-[#C1C1C1] border-2 shadow-lg px-3 py-1 text-sm font-regular text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2"
                  @click="closeModal"
                >
                  Save Trip
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </HeadlessDialog>
  </TransitionRoot>
  </template>
  
  <script>
  import {
    TransitionRoot,
    TransitionChild,
    Dialog as HeadlessDialog,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/vue';
  import { db } from '@/firebase'
  import { doc, updateDoc, collection } from "firebase/firestore";
  import { getAuth } from 'firebase/auth'
  import GlobalTags from './GlobalTag.vue'
  import { useToast } from 'vue-toast-notification'
  import 'vue-toast-notification/dist/theme-sugar.css'

  const $toast = useToast()
  
  export default {
    data() {
      return {
        isOpen: true,
        tags: [],
        tagOptions: ['City', 'Nature', 'Culture', 'Entertainment', 'Food', 'Landmarks', 'Adventure', 'History', 'Science', 'Technology', 'Sports', 'Health', 'Fashion', 'Education', 'Travel', 'Art'], 
        hovering: null,
        dropdownOpen: false,
      };
    },
    props: ['tripName'],
    methods: {
      async saveTrip2() {
        const auth = getAuth();
        const user = auth.currentUser;
        
        if (!user || !user.email) {
          console.log('User or user email is undefined');
          return;
        }

        const userRef = doc(db, 'users', user.email);

        const tripRef = doc(collection(userRef, 'trips'), this.tripName);
        await updateDoc(tripRef, {
          Summary: this.summary,
          Tags: this.tags,
        });
        console.log('Trip part 2 saved successfully');
        $toast.success('Trip Successfully Added!', {
          position: 'top'
        })
    },
    fieldsFilled() {
      return this.summary && this.tags.length > 0;
    },
    closeModal() {
      if (this.fieldsFilled()) {
        this.isOpen = false;
        this.$emit('closetrip')
        this.saveTrip2();
      } else {
        const errorMessage = 'Please fill in all fields!'
        $toast.error(errorMessage, {
          position: 'top'
        })
      }
    },
      closeModalOnly() {
        this.isOpen = false;
        this.$emit('closetriponly')
      },
      selectTag(tag) {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag);
        }
      },
      removeTag(currTag) {
        this.tags = this.tags.filter(tag => tag !== currTag);
      },
    },
    components: {
      TransitionRoot,
      TransitionChild,
      HeadlessDialog,
      DialogPanel,
      DialogTitle,
      GlobalTags,
    },
  };
  </script>