<template>
  <div class="absolute inset-x-0 top-0 h-1/3">
    <img
      src="@/assets/ExploreCrop.jpg"
      class="object-cover w-full h-full rounded-b-3xl"
      alt="Desert"
    />
    <div class="absolute inset-0 bg-opacity-50 rounded-b-xl"></div>
  </div>
  <NavBar />
  <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <h1 class="text-4xl font-semibold text-white">Explore our guides...</h1>

    <!-- Search Bar -->
    <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
      <div class="relative mt-[2vh]">
        <span class="absolute inset-y-0 left-0 flex items-center pl-[2vh]">
          <img src="../assets/MagnifyingGlass.svg" alt="search" class="w-5 h-5" />
        </span>
        <input
          v-model="searchInput"
          type="text"
          placeholder="Search..."
          class="pl-[5.5vh] p-[2vh] w-[65vh] h-[6.5vh] border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
        />
      </div>
    </div>
  </div>

  <!-- Loading spinner -->
  <!-- <transition name="fade" mode="out-in">
    <div
        v-if="isLoading"
        class="loading-spinner fade-in fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
    >
        <div class="spinner"></div>
    </div>
  </transition> -->

  <div v-if= "!isLoading" class="mt-[30vh] bg-white text-left mx-auto max-w-7xl">
    <!-- Editors' Choice Section -->
    <h2 class="ml-[5vw] font-semibold mb-[2vh] text-base">Editors' Choice</h2>
    <div class="flex flex-wrap justify-center space-x-12">
      <div class="grid grid-cols-4 gap-[3.8vw]">
        <!-- <ExploreCard v-for="card in filteredEditorsChoices" :key="card.guideTitle" :card="card" /> -->
        <ExploreCard v-if="filteredEditorsChoices[0]" :card="filteredEditorsChoices[0]" />
        <ExploreCard v-if="filteredEditorsChoices[1]" :card="filteredEditorsChoices[1]" />
        <ExploreCard v-if="filteredEditorsChoices[2]" :card="filteredEditorsChoices[2]" />
        <ExploreCard v-if="filteredEditorsChoices[3]" :card="filteredEditorsChoices[3]" />

      </div>
    </div>

    <!-- Regional Favourites Section -->
    <h2 class="ml-[5vw] font-semibold mb-[2vh] mt-[3vh]">Regional Favourites</h2>
    <div class="flex flex-wrap justify-center space-x-12">
      <div class="grid grid-cols-4 gap-[3.8vw]">
        <!-- <ExploreCard v-for="card in filteredRegionalFavs" :key="card.guideTitle" :card="card" /> -->
        <ExploreCard v-if="filteredRegionalFavs[0]" :card="filteredRegionalFavs[0]" />
        <ExploreCard v-if="filteredRegionalFavs[1]" :card="filteredRegionalFavs[1]" />
        <ExploreCard v-if="filteredRegionalFavs[2]" :card="filteredRegionalFavs[2]" />
        <ExploreCard v-if="filteredRegionalFavs[3]" :card="filteredRegionalFavs[3]" />
      </div>
    </div>

    <!-- Recently Added Section -->
    <h2 class="ml-[5vw] font-semibold mb-[2vh] mt-[3vh]">Recently Added</h2>
    <div class="flex flex-wrap justify-center space-x-12">
      <div class="grid grid-cols-4 gap-[3.8vw]">
        <!-- <ExploreCard v-for="card in filteredRecentlyAdded" :key="card.guideTitle" :card="card" /> -->
        <ExploreCard v-if="filteredRecentlyAdded[0]" :card="filteredRecentlyAdded[0]" />
        <ExploreCard v-if="filteredRecentlyAdded[1]" :card="filteredRecentlyAdded[1]" />
        <ExploreCard v-if="filteredRecentlyAdded[2]" :card="filteredRecentlyAdded[2]" />
        <ExploreCard v-if="filteredRecentlyAdded[3]" :card="filteredRecentlyAdded[3]" />
      </div>
    </div>
  </div>
  <GlobalFooter />
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import ExploreCard from '@/components/ExploreCard.vue'

import { db } from '@/firebase'
import { getDoc, doc, collection, query, getDocs, orderBy, limit, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import GlobalFooter from '@/components/GlobalFooter.vue'

export default {
  components: {
    NavBar,
    ExploreCard,
    GlobalFooter
  },
  data() {
    return {
      editorsChoices: [],
      regionalFavs: [],
      recentlyAdded: [],
      guides: [],
      searchInput: '',
      isLoading: true
    }
  },
  computed: {
    filteredEditorsChoices() {
      if (this.searchInput === '') {
        return this.editorsChoices
      } else {
        return this.editorsChoices.filter((guide) =>
          guide.guideTitle.toLowerCase().startsWith(this.searchInput.toLowerCase())
        )
      }
    },
    filteredRegionalFavs() {
      if (this.searchInput === '') {
        return this.regionalFavs
      } else {
        return this.regionalFavs.filter((guide) =>
          guide.guideTitle.toLowerCase().startsWith(this.searchInput.toLowerCase())
        )
      }
    },
    filteredRecentlyAdded() {
      if (this.searchInput === '') {
        return this.recentlyAdded
      } else {
        return this.recentlyAdded.filter((guide) =>
          guide.guideTitle.toLowerCase().startsWith(this.searchInput.toLowerCase())
        )
      }
    },
    userEmail() {
      const auth = getAuth()
      const user = auth.currentUser
      return user.email
    }
  },
  async created() {
    try {
      let [editorsChoiceData, regionalFavData, recentlyAddedData] = await Promise.all([
        this.fetchMockGuides(['NewZealand', 'Taipei', 'Luxembourg', 'Mexico']),
        this.fetchMockGuides(['Osaka,Japan', 'Bangkok', 'Agra,India', 'Marbella']),
        this.fetchRecentlyAdded([
          'NewZealand',
          'Taipei',
          'Luxembourg',
          'Mexico',
          'Osaka,Japan',
          'Bangkok',
          'Agra,India',
          'Marbella'
        ])
      ])

      this.editorsChoices = editorsChoiceData
      this.regionalFavs = regionalFavData
      this.recentlyAdded = recentlyAddedData
      this.isLoading = false
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  },
  methods: {
    async fetchMockGuides(guideIds) {
      console.log('fetchMockGuides is being called')
      // let guides = []

      try {
        // for (const id of guideIds) {
        //   const docRef = doc(db, 'guides', id)
        //   const docSnap = await getDoc(docRef)

        //   if (docSnap.exists) {
        //     const data = docSnap.data()
        //     console.log(data)
        //     guides.push({
        //       guidePicPath: data.Cover_Photo,
        //       flagPath: data.Flag_Photo,
        //       profilePicPath: data.Profile_Photo,
        //       guideTitle: data.Guide_Title,
        //       tags: data.Tags,
        //       country: data.Country,
        //       guideId: docRef.id,
        //       isLiked: data.Liked_By.includes(this.userEmail) ? true : false
        //     })
        //   } else {
        //     console.log(`No such document found with id: ${id}`)
        //   }
        // }
        // return guides
        const guides = [];
        
        const q = query(collection(db, 'guides'), where('__name__', 'in', guideIds));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          guides.push({
            guidePicPath: data.Cover_Photo,
            flagPath: data.Flag_Photo,
            profilePicPath: data.Profile_Photo,
            guideTitle: data.Guide_Title,
            tags: data.Tags,
            country: data.Country,
            guideId: doc.id,
            isLiked: data.Liked_By.includes(this.userEmail) ? true : false
          });
        });

        return guides;


      } catch (error) {
        console.error('Error fetching mock guides:', error)
        throw error // Rethrow the error to handle it in the caller
      }
    },

    async fetchRecentlyAdded() {
      console.log('fetchRecentlyAdded is being called')
      let guides = []

      try {
        const guidesRef = collection(db, 'guides')
        // Sort by 'Last_Edited' in descending order to get the most recently updated guides
        const queryRef = query(guidesRef, orderBy('Last_Edited', 'desc'), limit(4))
        const querySnapshotGuides = await getDocs(queryRef)
        guides = querySnapshotGuides.docs.map((doc) => ({
          guidePicPath: doc.data().Cover_Photo,
          flagPath: doc.data().Flag_Photo,
          profilePicPath: doc.data().Profile_Photo,
          guideTitle: doc.data().Guide_Title,
          tags: doc.data().Tags,
          country: doc.data().Country,
          guideId: doc.id,
          isLiked: doc.data().Liked_By.includes(this.userEmail) ? true : false
        }))
        return guides
      } catch (error) {
        console.error('Error fetching recently added guides:', error)
        throw error // Rethrow the error to handle it in the caller
      }
    }
  },
}
</script>

<style scoped>
.loading-spinner {
  background: rgba(0, 0, 0, 0.5);
}

.spinner {
  border: 8px solid #f3f3f3; /* Light grey */
  border-top: 8px solid #6b7280; /* Blue */
  border-radius: 50%;
  width: 75px;
  height: 75px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
