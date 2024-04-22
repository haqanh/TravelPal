<template>
  <div class="NavBarImage">
    <NavBar />
  </div>
  <div class="flex">
    <SideBar />
    <div class="w-80vw p-10 my-10 mx-10">
      <div
        class="DashboardContents flex flex-col lg:flex-row justify-between lg:items-center -mx-10"
      >
        <h1 class="text-[10.2vh] font-semibold text-[#3F3D3D] mx-10">Home</h1>
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
        <h1 class="text-[2vw] font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">
          My Travels
        </h1>
        <div class="border-b border-[#D9D9D9] w-[100vh] mx-[2.6vh] ml-[10.5vh] flex-shrink-0"></div>
        <button class="flex-shrink-0 hover:scale-125" @click="toggleAddTrip">
          <img src="../assets/Add Button.svg" alt="Add Trip" />
        </button>
      </div>
      <AddTrip v-if="showAddTrip" @closetrip="resetAddTrip" @closetriponly="backToDashboard" />
      <div class="TripCardWrapper grid grid-cols-4 min-w-full gap-4">
        <TripCard
          class="cursor-pointer"
          @contextmenu.prevent="openContextMenu($event, trip)"
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
        <h1 class="text-[2vw] font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">
          My Guides
        </h1>
        <div class="border-b border-[#D9D9D9] w-[90vh] mx-[2.6vh] ml-[20.5vh] flex-shrink-0"></div>
        <button class="flex-shrink-0 hover:scale-125" @click="toggleAddGuide">
          <img src="../assets/Add Button.svg" alt="Add Guide" />
        </button>
      </div>
      <AddGuide v-if="showAddGuide" @close="resetAddGuide" />
      <div class="GuideCardWrapper grid grid-cols-4 min-w-full gap-4">
        <GuideCard
          class="cursor-pointer"
          @click="viewGuide(guide)"
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
    v-if="contextMenuOpen"
    :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }"
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
  <DeleteTripModal
    v-if="showDeleteTripModal"
    @del="deleteDoc"
    @closeDel="closeDel"
    :name="selectedTrip.Name"
  />
</template>

<script lang="ts">
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'
import TripCard from '../components/TripCard.vue'
import GuideCard from '../components/GuideCard.vue'
import AddGuide from '../components/AddGuideBtn.vue'
import AddTrip from '../components/AddTrip.vue'
import DeleteTripModal from '../components/DeleteTripModal.vue'
import { db } from '@/firebase'
import { doc, collection, getDocs, deleteDoc, updateDoc, increment } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getStorage, ref, deleteObject, listAll } from 'firebase/storage'

export default {
  components: {
    NavBar,
    SideBar,
    TripCard,
    GuideCard,
    AddGuide,
    AddTrip,
    DeleteTripModal
  },
  data() {
    return {
      showAddGuide: false,
      showAddTrip: false,
      showDeleteTripModal: false,
      trips: [],
      guides: [],
      searchInput: '',
      contextMenuOpen: false,
      contextMenuPosition: { x: 0, y: 0 },
      selectedTrip: null,
      userEmail: ''
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
      location.reload()
    },

    toggleAddTrip() {
      this.showAddTrip = !this.showAddTrip
    },

    resetAddTrip() {
      this.showAddTrip = false
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
          docRef: guide.Guide_Title
        }
      })
    },
    openContextMenu(event, trip) {
      this.contextMenuOpen = true
      this.contextMenuPosition = {
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY
      }
      this.selectedTrip = trip
    },
    deleteTrip() {
      this.showDeleteTripModal = true
      this.contextMenuOpen = false
    },
    async deleteDoc() {
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
    },
    closeDel() {
      this.showDeleteTripModal = false
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
        const guides = querySnapshotGuides.docs.map(doc => doc.data());
        
        // Update the component state with fetched data
        this.trips = trips;
        this.guides = guides;
      } else {
        console.log('User is not signed in');
      }
    });
    
    document.addEventListener('click', () => {
      this.contextMenuOpen = false;
    });
  },
  beforeUnmount() {
    document.removeEventListener('click', () => {
      this.contextMenuOpen = false
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
</style>
