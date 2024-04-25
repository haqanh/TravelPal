<template>
  <div>
    <div class="absolute inset-x-0 top-0 h-2/5">
      <img
        :src="tripData.Photos.length ? tripData.Photos[0] : '@/assets/sf1.jpeg'"
        class="object-cover w-full h-full rounded-b-3xl"
        alt="San Francisco"
      />
      <div class="absolute inset-0 bg-gray-700 bg-opacity-50 rounded-b-3xl"></div>
      <div class="absolute bottom-0 left-0 w-full p-4 text-center">
        <h1 class="text-6xl font-bold text-white">{{ tripData.Name }}</h1>
        <p class="text-xl text-white mt-4">In {{ tripData.Location }}</p>
        <p class="mt-10 text-md text-white">Last Edit: {{ formatDate(tripData.Last_Edit) }}</p>
      </div>
    </div>
    <NavBar />

    <div class="mt-[40vh] bg-white text-left mx-auto max-w-7xl">
      <!-- Added text-left class -->
      <div class="p-6">
        <div class="tags-dates-cost mb-8">
          <div class="tags text-xl mb-4">
            <GlobalTag v-for="tag in tags" :tagCategory="tag"/>
          </div>
          <div class="dates mb-4">
            <span class="date text-xl"
              >Date: {{ formatDateRange(tripData.Start_Date, tripData.End_Date) }}</span
            >
          </div>
          <div class="cost mb-4">
            <span class="cost-text text-xl">Total Cost: ${{ tripData.Cost }}</span>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <img src="@/assets/summary.svg" alt="Summary icon" class="inline-block mr-2 w-6 h-6" />
          <h2 class="text-2xl font-bold">Summary</h2>
        </div>
        <p class="text-gray-600 text-xl mb-8">
          {{ tripData.Summary }}
        </p>
      </div>

      <section class="p-6">
        <div class="flex items-center mb-4">
          <img
            src="@/assets/camera-photo.svg"
            alt="Photos icon"
            class="photos-icon inline-block mr-2 w-8 h-8"
          />
          <!-- Adjusted width and height -->
          <h2 class="text-2xl font-bold">Photos</h2>
        </div>
        <div class="grid grid-cols-3 gap-10">
          <img
            v-for="(photoUrl, index) in displayedPhotos"
            :key="index"
            :src="photoUrl"
            alt="Uploaded photo"
            class="photo-card"
            @click="openModal(photoUrl)"
          />
        </div>
        <!-- Modal section -->
        <div v-if="isModalOpen" class="modal" @click.self="closeModal">
          <div class="modal-content" :class="{ 'no-image': imageError }">
            <span class="close" @click="closeModal">&times;</span>
            <img
              v-if="!imageError"
              :src="currentPhoto"
              alt="Enlarged photo"
              class="enlarged-photo"
              @error="imageError = true"
            />
            <span v-else class="placeholder-text">Enlarged Photo</span>
          </div>
        </div>

        <div class="mt-10 text-center">
          <button
            v-if="!showAllImages && tripData.Photos && tripData.Photos.length > 6"
            type="button"
            class="text-xl inline-flex justify-center rounded-lg border border-[#C1C1C1] border-2 shadow-lg px-3 py-1 text-sm font-regular text-[#434343] hover:bg-[#C1C1C1] hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C1C1C1] focus-visible:ring-offset-2"
            @click="viewAllPhotos"
          >
            View All
          </button>
        </div>
      </section>
    </div>
    <GlobalFooter />
  </div>
</template>

<script lang="ts">
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import type { User } from 'firebase/auth'
import NavBar from '@/components/NavBar.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalTag from '@/components/GlobalTag.vue'
import type { Timestamp } from 'firebase/firestore'

interface TripData {
  Photos: string[];
  Name: string;
  Location: string;
  Last_Edit: Timestamp | null;
  Start_Date: Timestamp | null;
  End_Date: Timestamp | null;
  Cost: number;
  Summary: string;
  Tags: string[];
}

export default {
  components: {
    NavBar,
    GlobalFooter,
    GlobalTag
  },
  data() {
    return {
      tripData: {} as TripData,
      isModalOpen: false,
      currentPhoto: '',
      imageError: false,
      showAllImages: false,
      displayedPhotos: [] as string[],
      tags: [] as string[],
    }
  },
  created() {
    this.fetchTripData()
  },
  methods: {
    async fetchTripData() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user: User | null) => {
        if (user?.email) {
          const tripId = this.$route.params.id as string
          try {
            const tripRef = doc(doc(db, 'users', user.email), 'trips', tripId)
            const tripSnapshot = await getDoc(tripRef)

            if (tripSnapshot.exists()) {
              this.tripData = tripSnapshot.data() as TripData
              this.displayedPhotos = this.tripData.Photos.slice(0, 6)
              this.tags = this.tripData.Tags
            } else {
              console.error('No such trip!')
            }
          } catch (error) {
            console.error('Error fetching trip data:', error)
          }
        } else {
          console.log('No user is signed in.')
        }
      })
    },
    openModal(photoUrl: string) {
      this.currentPhoto = photoUrl
      this.isModalOpen = true
      this.imageError = false
    },
    closeModal() {
      this.isModalOpen = false
    },
    formatDateRange(startTimestamp: Timestamp | null, endTimestamp: Timestamp | null): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      const startDate = startTimestamp ? new Date(startTimestamp.toDate()).toLocaleDateString('en-US', options) : 'N/A'
      const endDate = endTimestamp ? new Date(endTimestamp.toDate()).toLocaleDateString('en-US', options) : 'N/A'
      return `${startDate} - ${endDate}`
    },
    formatDate(timestamp: Timestamp | null): string {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
      const editDate = timestamp ? new Date(timestamp.toDate()).toLocaleDateString('en-US', options) : 'N/A'
      return editDate
    },
    viewAllPhotos() {
      this.showAllImages = true
      this.displayedPhotos = this.tripData.Photos
    }
  },
  computed: {
    isMobile(): boolean {
      return window.innerWidth < 768
    }
  }
}
</script>

<style scoped>
.rounded-b-3xl {
  border-bottom-left-radius: 3rem;
  border-bottom-right-radius: 3rem;
}

/* Additional styles for text */
.tags-dates-cost {
  display: flex;
  flex-direction: column;
}

.tag {
  display: inline-block;
  background-color: #efefef;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  margin-right: 0.25rem;
}
.photo-card {
  border-radius: 30px;
  width: 100%;
  height: 400px;
  object-fit: cover;
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23);
  transition: transform 0.3s ease-in-out;
}

@media (max-width: 768px) {
  .photo-card {
    height: auto; /* Change to auto for mobile devices */
  }
}

.photo-card:hover {
  transform: scale(1.05); /* Slightly larger on hover for a popping effect */
}
.modal {
  position: fixed;
  z-index: 10;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  /* Keep your existing styles and adjust the padding, width, or max-width if necessary */
  padding: 20px; /* Adjust padding to create more space inside the modal */
  max-width: 95vw; /* Use a percentage of the viewport width */
  max-height: 95vh; /* Use a percentage of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: white;
  position: relative;
}

.enlarged-photo {
  max-width: 90vw; /* Use less than 100% to account for padding and borders */
  max-height: 80vh; /* Adjust the max-height to fit within the modal */
  width: auto; /* Maintain the aspect ratio */
  height: auto; /* Maintain the aspect ratio */
  object-fit: contain; /* Ensure the image is contained within the element's box */
}

.placeholder-text,
.enlarged-photo-title {
  text-align: center; /* Center the placeholder text */
  font-size: 1.5rem;
}

.close {
  position: absolute;
  top: 0px; /* Position the close button a little from the top */
  right: 5px; /* Position the close button a little from the right */
  font-size: 24px; /* Reduce the font size of the close button */
  cursor: pointer;
}

@media only screen and (max-width: 600px) {
  .photo-card {
    width: 100%; /* Adjust photo card width for mobile devices */
    height: auto; /* Adjust photo card height for mobile devices */
  }

  h1 {
    font-size: 2rem; /* Smaller font size for small screens */
  }
}
</style>
<!-- <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 class="text-6xl font-bold text-white">{{ tripData.Name }}</h1>
    <p class="text-xl text-white mt-4">In {{ tripData.Location }}</p>
  </div> -->
