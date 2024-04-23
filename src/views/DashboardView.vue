<template>
  <div class="NavBarImage">
    <NavBar />
  </div>
  <div class="flex">
    <SideBar class="flex"/>
    <div class="w-[80vw] p-10 my-10 mx-10">
      <div
        class="DashboardContents flex flex-col lg:flex-row justify-between lg:items-center -mx-10"
      >
        <h1 class="text-5xl font-semibold text-[#3F3D3D] mx-10">Home</h1>
        <div class="relative flex items-center w-full h-full lg:w-96 group mt-4 lg:mt-0">
          <svg
            class="absolute left-0 z-0 hidden w-4 h-4 ml-4 text-gray-500 pointer-events-none fill-current group-hover:text-gray-400 sm:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
            ></path>
          </svg>
          <input
            type="text"
            v-model="searchInput"
            class="block w-full py-3 pl-10 pr-4 leading-normal rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 ring-opacity-90 bg-gray-100 text-gray-[#3F3D3D] aa-input"
            placeholder="Search"
          />
        </div>
      </div>
      <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
        <h1 class="text-2xl font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">
          My Travels
        </h1>
        <div class="border-b border-[#D9D9D9] w-[100vh] mx-[2.6vh] ml-[10.5vh] flex-shrink-0"></div>
        <button class="flex-shrink-0 hover:scale-125" @click="toggleAddTrip">
          <img src="../assets/Add Button.svg" alt="Add Trip" />
        </button>
      </div>
      <AddTrip v-if="showAddTrip" @closetrip="resetAddTrip" @closetriponly="backToDashboard" />
      <div class="TripCardWrapper grid grid-cols-3 min-w-full gap-4">
        <TripCard
          class="cursor-pointer"
          @contextmenu.prevent="openContextMenuTrip($event, trip)"
          @click="viewTrip(trip)"
          v-for="trip in filteredTrips"
          :key="trip.id"
          :TripName="trip.Name"
          :Location="trip.Location"
          :TripStartDate="trip.Start_Date"
          :TripEndDate="trip.End_Date"
          :TripImage="trip.Photos[0]"
          :TripCost="trip.Cost"
        />
      </div>
      <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
        <h1 class="text-2xl font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">
          My Guides
        </h1>
        <div class="border-b border-[#D9D9D9] w-[90vh] mx-[2.6vh] ml-[20.5vh] flex-shrink-0"></div>
        <button class="flex-shrink-0 hover:scale-125" @click="toggleAddGuide">
          <img src="../assets/Add Button.svg" alt="Add Guide" />
        </button>
      </div>
      <AddGuide v-if="showAddGuide" @close="resetAddGuide" @closeOnly="closeGuideModal" />
      <div class="GuideCardWrapper grid grid-cols-3 min-w-full gap-4">
        <GuideCard
          class="cursor-pointer"
          @click="viewGuide(guide)"
          @contextmenu.prevent="openContextMenuGuide($event, guide)"
          v-for="guide in filteredGuides"
          :key="guide.id"
          :GuideName="guide.Guide_Title"
          :Location="guide.Destination"
          :GuideImage="guide.Cover_Photo"
        />
      </div>
    </div>
  </div>
  <div
    v-if="contextMenuOpenTrip"
    :style="{ top: `${contextMenuPositionTrip.y}px`, left: `${contextMenuPositionTrip.x}px` }"
    class="absolute bg-white border border-gray-200 rounded-md shadow-lg"
  >
    <button
      @click="deleteTrip"
      class="block w-full text-left px-[0.7vw] py-[0.7vw] text-l text-gray-700 hover:bg-gray-100 flex justify-between items-center rounded-md shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 inline-block align-text-bottom mr-[0.7vw]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
      <span class="mt-[0.3vw]">Delete</span>
    </button>
  </div>
  <div
    v-if="contextMenuOpenGuide"
    :style="{ top: `${contextMenuPositionGuide.y}px`, left: `${contextMenuPositionGuide.x}px` }"
    class="absolute bg-white border border-gray-200 rounded-md shadow-lg"
  >
    <button
      @click="deleteGuide"
      class="block w-full text-left px-[0.7vw] py-[0.7vw] text-l text-gray-700 hover:bg-gray-100 flex justify-between items-center rounded-md shadow-lg"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 inline-block align-text-bottom mr-[0.7vw]"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
      <span class="mt-[0.3vw]">Delete</span>
    </button>
  </div>
  <DeleteTripModal
    v-if="showDeleteTripModal"
    @delTrip="deleteDocTrip"
    @closeDelTrip="closeDelTrip"
    :name="selectedTrip.Name" 
    :type="type1"
  />
  <DeleteTripModal
    v-if="showDeleteGuideModal"
    @delGuide="deleteDocGuide"
    @closeDelGuide="closeDelGuide"
    :name="selectedGuide.Guide_Title"
    :type="type2"
  />
  <GlobalFooter class="adjustMargin"/>
</template>

<script lang="ts">
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'
import TripCard from '../components/TripCard.vue'
import GuideCard from '../components/GuideCard.vue'
import AddGuide from '../components/AddGuideBtn.vue'
import AddTrip from '../components/AddTrip.vue'
import DeleteTripModal from '../components/DeleteTripModal.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import { db } from '@/firebase'
import { doc, collection, getDocs, deleteDoc, updateDoc, increment } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, deleteObject, listAll } from 'firebase/storage'
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast()

export default {
  components: {
    NavBar,
    SideBar,
    TripCard,
    GuideCard,
    AddGuide,
    AddTrip,
    DeleteTripModal,
    GlobalFooter,
  },
  data() {
    return {
      showAddGuide: false,
      showAddTrip: false,
      showDeleteTripModal: false,
      showDeleteGuideModal: false,
      trips: [],
      guides: [],
      searchInput: '',
      contextMenuOpenTrip: false,
      contextMenuPositionTrip: { x: 0, y: 0 },
      contextMenuOpenGuide: false,
      contextMenuPositionGuide: { x: 0, y: 0 },
      selectedTrip: null,
      selectedGuide: null,
      userEmail: '',
      type1: 'trip',
      type2: 'guide',
    }
  },
  computed: {
    filteredTrips() {
      if (this.searchInput === '') {
        return this.trips
      } else {
        return this.trips.filter((trip) => {
          return trip.Name.toLowerCase().startsWith(this.searchInput.toLowerCase())
        })
      }
    },
    filteredGuides() {
      if (this.searchInput === '') {
        return this.guides
      } else {
        return this.guides.filter((guide) => {
          return guide.Guide_Title.toLowerCase().startsWith(this.searchInput.toLowerCase())
        })
      }
    }
  },
  methods: {
    toggleAddGuide() {
      this.showAddGuide = !this.showAddGuide
    },

    resetAddGuide() {
      this.showAddGuide = false
      localStorage.setItem('showToastGuide', 'true')
      location.reload()
    },

    closeGuideModal() {
      this.showAddGuide = false
    },

    toggleAddTrip() {
      this.showAddTrip = !this.showAddTrip
    },

    resetAddTrip() {
      this.showAddTrip = false
      localStorage.setItem('showToast', 'true')
      location.reload()
    },
    backToDashboard() {
      this.showAddTrip = false
    },
    viewTrip(trip) {
      this.$router.push({
        name: 'viewtrip',
        params: {
          id: trip.id
        }
      })
    },
    viewGuide(guide) {
      this.$router.push({
        name: 'GuideView',
        params: {
          docRef: guide.id
        }
      })
    },
    openContextMenuTrip(event, trip) {
      this.contextMenuOpenTrip = true
      this.contextMenuPositionTrip = {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY
      }
      this.selectedTrip = trip
    },
    openContextMenuGuide(event, guide) {
      this.contextMenuOpenGuide = true
      this.contextMenuPositionGuide = {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY
      }
      this.selectedGuide = guide
    },
    deleteTrip() {
      this.showDeleteTripModal = true
      this.contextMenuOpenTrip = false
    },
    deleteGuide() {
      this.showDeleteGuideModal = true
      this.contextMenuOpenGuide = false
    },
    async deleteDocTrip() {
      this.trips = this.trips.filter((trip) => trip.Name !== this.selectedTrip.Name)
      const tripRef = doc(db, 'users', this.userEmail, 'trips', this.selectedTrip.Name)
      await updateDoc(doc(db, 'users', this.userEmail), {
        Distance_Travelled: increment(-this.selectedTrip.Distance_Travelled),
        Num_Visited: increment(-1),
        Steps: increment(-this.selectedTrip.Steps)
      })
      const storage = getStorage()
      const folderRef = ref(storage, `users/${this.userEmail}/trips/${this.selectedTrip.Name}`)
      listAll(folderRef).then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef)
        })
      })
      deleteDoc(tripRef)
      this.showDeleteTripModal = false
      localStorage.setItem('showToastTripDelete', 'true')
      location.reload()
    },
    closeDelTrip() {
      this.showDeleteTripModal = false
    },
    closeDelGuide() {
      this.showDeleteGuideModal = false
    },
    async deleteDocGuide() {
      const documentId = this.selectedGuide.id;
      this.guides = this.guides.filter((guide) => guide.Guide_Title !== this.selectedGuide.Guide_Title);
      
      const guideRef = doc(db, 'users', this.userEmail, 'guides', documentId);
      const globalGuideRef = doc(db, 'guides', documentId);
      
      // Known subcollection (In User)
      const subcollectionRef1 = collection(guideRef, 'advices');
      const subcollectionRef2 = collection(guideRef, 'placesNearby');
      const subcollectionRef3 = collection(guideRef, 'placesToEat');
      const subcollectionRef4 = collection(guideRef, 'placesToStay');
      const subcollectionRef5 = collection(guideRef, 'placesToVisit');
      const subcollectionSnapshot1 = await getDocs(subcollectionRef1);
      const subcollectionSnapshot2 = await getDocs(subcollectionRef2);
      const subcollectionSnapshot3 = await getDocs(subcollectionRef3);
      const subcollectionSnapshot4 = await getDocs(subcollectionRef4);
      const subcollectionSnapshot5 = await getDocs(subcollectionRef5);

      // Known subcollection (In Global)
      const subcollectionRef1Global = collection(globalGuideRef, 'advices');
      const subcollectionRef2Global = collection(globalGuideRef, 'placesNearby');
      const subcollectionRef3Global = collection(globalGuideRef, 'placesToEat');
      const subcollectionRef4Global = collection(globalGuideRef, 'placesToStay');
      const subcollectionRef5Global = collection(globalGuideRef, 'placesToVisit');
      const subcollectionSnapshot1Global = await getDocs(subcollectionRef1Global);
      const subcollectionSnapshot2Global = await getDocs(subcollectionRef2Global);
      const subcollectionSnapshot3Global = await getDocs(subcollectionRef3Global);
      const subcollectionSnapshot4Global = await getDocs(subcollectionRef4Global);
      const subcollectionSnapshot5Global = await getDocs(subcollectionRef5Global);
      
      if (subcollectionSnapshot1 && !subcollectionSnapshot1.empty) {
        for (let doc of subcollectionSnapshot1.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot2 && !subcollectionSnapshot2.empty) {
        for (let doc of subcollectionSnapshot2.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot3 && !subcollectionSnapshot3.empty) {
        for (let doc of subcollectionSnapshot3.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot4 && !subcollectionSnapshot4.empty) {
        for (let doc of subcollectionSnapshot4.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot5 && !subcollectionSnapshot5.empty) {
        for (let doc of subcollectionSnapshot5.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot1Global && !subcollectionSnapshot1Global.empty) {
        for (let doc of subcollectionSnapshot1Global.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot2Global && !subcollectionSnapshot2Global.empty) {
        for (let doc of subcollectionSnapshot2Global.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot3Global && !subcollectionSnapshot3Global.empty) {
        for (let doc of subcollectionSnapshot3Global.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot4Global && !subcollectionSnapshot4Global.empty) {
        for (let doc of subcollectionSnapshot4Global.docs) {
          await deleteDoc(doc.ref);
        }
      }

      if (subcollectionSnapshot5Global && !subcollectionSnapshot5Global.empty) {
        for (let doc of subcollectionSnapshot5Global.docs) {
          await deleteDoc(doc.ref);
        }
      }

      const storage = getStorage()
      const folderRef = ref(storage, `users/${this.userEmail}/guides/${this.selectedGuide.Guide_Title}`)
      listAll(folderRef).then((res) => {
        res.items.forEach((itemRef) => {
          deleteObject(itemRef)
        })
      })
      
      await deleteDoc(guideRef);
      await deleteDoc(globalGuideRef);
      this.showDeleteGuideModal = false;
      localStorage.setItem('showToastGuideDelete', 'true')
      location.reload()
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.userEmail = user.email;
        const userRef = doc(db, 'users', user.email);
        
        // Fetching trips and adding the id to each trip object
        const querySnapshotTrips = await getDocs(collection(userRef, 'trips'));
        const trips = querySnapshotTrips.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id; // Add the id property to the trip object
          return data;
        });
        
        // Fetching guides (no changes here)
        const querySnapshotGuides = await getDocs(collection(userRef, 'guides'));
        const guides = querySnapshotGuides.docs.map(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        
        // Update the component state with fetched data
        this.trips = trips;
        this.guides = guides;
      } else {
        console.log('User is not signed in');
      }
      if (localStorage.getItem('showToast') === 'true') {
        $toast.success('Trip Successfully Added!', {
          position: 'top',
          duration: 6000
        })
        localStorage.removeItem('showToast')
      }
      if (localStorage.getItem('showToastTripDelete') === 'true') {
        $toast.success('Trip Successfully Deleted!', {
          position: 'top',
          duration: 6000
        })
        localStorage.removeItem('showToastTripDelete')
      }
      if (localStorage.getItem('showToastGuide') === 'true') {
        $toast.success('Guide Successfully Added!', {
          position: 'top',
          duration: 6000
        })
        localStorage.removeItem('showToastGuide')
      }
      if (localStorage.getItem('showToastGuideDelete') === 'true') {
        $toast.success('Guide Successfully Deleted!', {
          position: 'top',
          duration: 6000
        })
        localStorage.removeItem('showToastGuideDelete')
      }
    });
    
    document.addEventListener('click', () => {
      this.contextMenuOpenGuide = false;
      this.contextMenuOpenTrip = false;
    });
  },
  beforeUnmount() {
    document.removeEventListener('click', () => {
      this.contextMenuOpenGuide = false
      this.contextMenuOpenTrip = false
    })
  }
}
</script>

<style scoped>
.NavBarImage {
  background-image: url('@/assets/forest.jpg');
  background-size: cover;
  background-position: center;
}
.adjustMargin {
  margin-top: 0 !important;
}
</style>
