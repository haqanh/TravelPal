<template>
  <div class="NavBarImage">
    <NavBar />
  </div>
  <div class="flex">
    <!-- <SideBar /> -->
    <div class="w-80vw p-10 my-10 mx-10">
      <div
        class="DashboardContents flex flex-col lg:flex-row justify-between lg:items-center -mx-10"
      >
        <h1 class="text-[60px] font-semibold text-[#3F3D3D] mx-10">Home</h1>
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
            class="block w-full py-3 pl-10 pr-4 leading-normal rounded-xl focus:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-800 ring-opacity-90 bg-gray-100 dark:bg-gray-800 text-gray-[#3F3D3D] aa-input"
            placeholder="Search"
          />
        </div>
      </div>
      <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
        <h1 class="text-[2vw] font-semibold text-[#3F3D3D] whitespace-nowrap flex-shrink-0 mx-10">
          My Travels
        </h1>
        <div class="border-b border-[#D9D9D9] w-[100vh] mx-[2.6vh] ml-[10.5vh] flex-shrink-0"></div>
        <button class="flex-shrink-0" @click="toggleAddTrip">
          <img src="../assets/Add Button.svg" alt="Add Trip" />
        </button>
      </div>
      <AddTrip v-if="showAddTrip" @closetrip="resetAddTrip" @closetriponly="backToDashboard" />
      <div class="TripCardWrapper grid grid-cols-4 min-w-full gap-4">
        <TripCard
          class="cursor-pointer"
          @click="viewTrip(trip)"
          v-for="trip in trips"
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
        <button class="flex-shrink-0" @click="toggleAddGuide">
          <img src="../assets/Add Button.svg" alt="Add Guide" />
        </button>
      </div>
      <AddGuide v-if="showAddGuide" @close="resetAddGuide" />
      <div class="GuideCardWrapper grid grid-cols-4 min-w-full gap-4">
        <GuideCard
          v-for="guide in guides"
          :key="guide.id"
          :GuideName="guide.title"
          :Location="guide.destination"
          :GuideImage="guide.coverPhoto"
          :GuideStartDate="guide.Start_Date"
          :GuideEndDate="guide.End_Date"
        />
      </div>
    </div>
  </div>
  <GlobalFooter />
</template>

<script lang="ts">
import NavBar from '../components/NavBar.vue'
import SideBar from '../components/SideBar.vue'
import TripCard from '../components/TripCard.vue'
import GuideCard from '../components/GuideCard.vue'
import AddGuide from '../components/AddGuideBtn.vue'
import AddTrip from '../components/AddTrip.vue'
import GlobalFooter from '../components/GlobalFooter.vue'
import { db } from '@/firebase'
import { doc, collection, getDocs } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  components: {
    NavBar,
    SideBar,
    TripCard,
    GuideCard,
    AddGuide,
    AddTrip,
    GlobalFooter
  },
  data() {
    return {
      showAddGuide: false,
      showAddTrip: false,
      trips: [],
      guides: []
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
    }
  },
  mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.email)
        const querySnapshotTrips = await getDocs(collection(userRef, 'trips'))
        const querySnapshotGuides = await getDocs(collection(userRef, 'guides'))
        const trips = querySnapshotTrips.docs.map((doc) => {
          const data = doc.data()
          data.id = doc.id // Add the id property to the trip object
          return data
        })
        const guides = querySnapshotGuides.docs.map((doc) => doc.data())
        this.trips = trips
        this.guides = guides
        console.log('Trips:', this.trips[0].id)
      } else {
        console.log('User is not signed in')
      }
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
