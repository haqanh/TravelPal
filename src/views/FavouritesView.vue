<template>
  <div>
    <div class="NavBarImage">
      <NavBar />
    </div>
    <div class="flex">
      <!-- <SideBar /> -->
      <div class="w-80vw p-10 my-10 mx-10">
        <h1 class="text-[60px] font-semibold text-[#3F3D3D] mx-10">Favourited Guides</h1>
        <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
          <div class="mx-20 grid grid-cols-4 min-w-full gap-4">
            <!-- Loop through favorited guides and use exploreCard component -->
            <ExploreCard v-for="guide in favoritedGuides" :key="guide.guideTitle" :card="guide" />
            <div v-if="favoritedGuides.length === 0" class="mx-10 my-6">
              <p class="text-gray-700">No favorited guides yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <GlobalFooter />
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import NavBar from '@/components/NavBar.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import ExploreCard from '@/components/ExploreCard.vue'

export default {
  components: {
    NavBar,
    GlobalFooter,
    ExploreCard // Import and use exploreCard component
  },
  data() {
    return {
      favoritedGuides: []
    }
  },
  methods: {
    async fetchFavoritedGuides() {
      try {
        const userId = '123@gmail.com' // Replace with actual user ID
        const userRef = doc(db, 'users', userId)
        const userSnapshot = await getDoc(userRef)
        const favourites = userSnapshot.data().favourites

        for (const favRef of favourites) {
          const favSnapshot = await getDoc(favRef)
          if (favSnapshot.exists()) {
            const guideId = favSnapshot.id
            const guideData = favSnapshot.data()
            console.log('Favorited guide:', guideData.guidePicPath)
            console.log('Guide ID:', guideId)
            this.favoritedGuides.push({
              id: guideId,
              guideTitle: guideData.guideTitle,
              guidePicPath: guideData.guidePicPath,
              flagPath: guideData.flagPath,
              profilePicPath: guideData.profilePicPath,
              tagCat: guideData.tagCat
            })
          } else {
            console.log('Guide document not found for reference:', favRef.path)
          }
        }
      } catch (error) {
        console.error('Error fetching favorited guides: ', error)
      }
    }
  },
  mounted() {
    this.fetchFavoritedGuides()
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
