<template>
  <div>
    <div class="NavBarImage">
      <NavBar />
    </div>
    <div class="flex">
      <div class="w-80vw p-10 my-10 mx-10">
        <h1 class="text-[60px] font-semibold text-[#3F3D3D] mx-10">Favourited Guides</h1>
        <div class="flex justify-between items-center my-10 mb-10 min-w-full -mx-10">
          <div class="mx-20 grid grid-cols-4 min-w-full gap-4">
            <!-- Loop through favorited guides and use ExploreCard component -->
            <ExploreCard v-for="guide in favoritedGuides" :key="guide.guideId" :card="guide" />
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
import NavBar from '@/components/NavBar.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import ExploreCard from '@/components/ExploreCard.vue'
import { db } from '@/firebase'
import { doc, getDoc, collection } from 'firebase/firestore'

export default {
  components: {
    NavBar,
    GlobalFooter,
    ExploreCard
  },
  data() {
    return {
      favoritedGuides: []
    }
  },
  methods: {
    async fetchFavoritedGuides() {
      try {
        const userId = '123@gmail.com' // Replace with the actual user ID from auth
        const userRef = doc(db, 'users', userId)
        const userSnapshot = await getDoc(userRef)
        const favourites = userSnapshot.data().Favourites

        for (const favRef of favourites) {
          const favSnapshot = await getDoc(favRef)
          if (favSnapshot.exists()) {
            const guideData = favSnapshot.data()
            this.favoritedGuides.push({
              guideId: favSnapshot.id,
              guideTitle: guideData.Guide_Title,
              guidePicPath: guideData.Cover_Photo,
              flagPath: guideData.Flag_Photo,
              profilePicPath: guideData.Profile_Photo,
              tags: guideData.Tags,
              country: guideData.Country,
              isLiked: true // Assuming the user has these in favorites, so liked is true
            })
          } else {
            console.log('Guide document not found for reference:', favRef.path)
          }
        }
      } catch (error) {
        console.error('Error fetching favorited guides:', error)
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
