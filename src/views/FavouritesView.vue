<template>
  <div>
    <div class="NavBarImage">
      <NavBar />
    </div>
    <div class="flex">
      <div class="w-full p-10 my-10 mx-10">
        <h1 class="w-80vw text-[60px] font-semibold text-[#3F3D3D] mx-10">Favourited Guides</h1>
        <div class="flex justify-between items-start my-10 mb-10 min-w-full">
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full"
          >
            <!-- Loop through favorited guides and use ExploreCard component -->
            <ExploreCard
              v-for="guide in favoritedGuides"
              :key="guide.guideId"
              :card="guide"
              class="w-full"
            />
            <div v-if="favoritedGuides.length === 0" class="mx-10 my-6">
              <p class="text-gray-700">No favorited guides.</p>
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
import { doc, getDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default {
  components: {
    NavBar,
    GlobalFooter,
    ExploreCard
  },
  data() {
    return {
      favoritedGuides: [],
      userEmail: '' // To store the user's email after detection
    }
  },
  methods: {
    async fetchFavoritedGuides() {
      const userRef = doc(db, 'users', this.userEmail)
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
            isLiked: true
          })
        } else {
          console.log('Guide document not found for reference:', favRef.path)
        }
      }
    }
  },
  mounted() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userEmail = user.email; // Set the user's email
        this.fetchFavoritedGuides(); // Fetch favorites after user is detected
      } else {
        console.log('User is not signed in');
        // Handle the case when user is not signed in or the auth state is not known
      }
    });
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
