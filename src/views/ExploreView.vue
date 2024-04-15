<template>
    <div class="absolute inset-x-0 top-0 h-1/3">
        <img src="@/assets/ExploreCrop.jpg" class="object-cover w-full h-full rounded-b-3xl" alt="Desert" />
        <div class="absolute inset-0 bg-opacity-50 rounded-b-3xl"></div>
    </div>
    <NavBar />
    <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 class="text-4xl font-semibold text-white">Explore our guides...</h1>

        <!-- Search Bar -->
        <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
            <div class="relative mt-[2vh]">
            <span class="absolute inset-y-0 left-0 flex items-center pl-[2vh]">
                <img src="../assets/MagnifyingGlass.svg" alt="search" class="w-5 h-5">
            </span>
            <input v-model="searchInput" type="text" placeholder="Search..." class="pl-[5.5vh] p-[2vh] w-[60vh] h-[6.5vh] border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
            </div>
        </div>
    </div>

    <!-- Loading spinner -->
    <div v-if="isLoading" class="loading-spinner fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <div class="spinner"></div>
    </div>

    <div v-else class="mt-[30vh] bg-white text-left mx-auto max-w-7xl"> 
        <!-- Editors' Choice Section -->
        <h2 class="ml-[5vw] font-semibold mb-[2vh] text-base">Editors' Choice</h2>
        <div class="flex flex-wrap justify-center space-x-12">
            <ExploreCard v-for="card in filteredEditorsChoices" :key="card.guideTitle" :card="card" />
        </div>

        <!-- Regional Favourites Section -->
        <h2 class="ml-[5vw] font-semibold mb-[2vh] mt-[3vh]">Regional Favourites</h2>
        <div class="flex flex-wrap justify-center space-x-12">
            <ExploreCard v-for="card in filteredRegionalFavs" :key="card.guideTitle" :card="card" />
        </div>

        <!-- Recently Added Section -->
        <h2 v-if="recentlyAdded" class="ml-[5vw] font-semibold mb-[2vh] mt-[3vh]">Recently Added</h2>
        <div class="flex flex-wrap justify-center space-x-12">
        <div class="grid grid-cols-4 gap-[3.5vw]">
            <ExploreCard v-for="card in filteredRecentlyAdded" :key="card.guideTitle" :card="card" /> 
        </div>
        </div>
    </div>
</template>




<script>
import NavBar from '@/components/NavBar.vue'
import ExploreCard from '@/components/ExploreCard.vue'

import { db } from '@/firebase';
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// import { storage } from '../firebase'
// import { ref, getDownloadURL, getStorage} from 'firebase/storage'

export default {
    components: {
        NavBar,
        ExploreCard,
    },
    data() {
        return {
            editorsChoices: [],
            regionalFavs: [],
            recentlyAdded: [],
            guides:[],
            searchInput: '',
            isLoading: true,
        };
    },
    computed: {
        filteredEditorsChoices() {
            if (this.searchInput === '') {
                return this.editorsChoices;
            } else {
                return this.editorsChoices.filter(guide => guide.guideTitle.toLowerCase().startsWith(this.searchInput.toLowerCase()));
            }
        },
        filteredRegionalFavs() {
            if (this.searchInput === '') {
                return this.regionalFavs;
            } else {
                return this.regionalFavs.filter(guide => guide.guideTitle.toLowerCase().startsWith(this.searchInput.toLowerCase()));
            }
        },
        filteredRecentlyAdded() {
            if (this.searchInput === '') {
                return this.recentlyAdded;
            } else {
                return this.recentlyAdded.filter(guide => guide.guideTitle.toLowerCase().startsWith(this.searchInput.toLowerCase()));
            }
        },
        userEmail() {
            const auth = getAuth();
            const user = auth.currentUser;
            return user.email;
        }
    },
    methods: {
        async fetchMockGuides(guideIds) {
            console.log('fetchMockGuides is being called');
            let guides = [];

            try {
            for (const id of guideIds) {
                const docRef = doc(db, 'guides', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists) {
                const data = docSnap.data();
                console.log(data);
                guides.push({
                    guidePicPath: data.Cover_Photo,
                    flagPath: data.Flag_Photo,
                    profilePicPath: data.Profile_Photo,
                    guideTitle: data.Guide_Title,
                    tags: data.Tags,
                    country: data.Country,
                    guideId: docRef.id,
                    isLiked: data.Liked_By.includes(this.userEmail) ? true : false,
                });
                } else {
                console.log(`No such document found with id: ${id}`);
                }
            }
            return guides;
            } catch (error) {
            console.error('Error fetching mock guides:', error);
            throw error; // Rethrow the error to handle it in the caller
            }
        },

        async fetchRecentlyAdded(excludeMock) {
            console.log('fetchRecentlyAdded is being called');
            let guides = [];

            try {
            const guidesRef = collection(db, 'guides');
            const queryRef = query(guidesRef, where('__name__', 'not-in', excludeMock));
            const querySnapshotGuides = await getDocs(queryRef);
            guides = querySnapshotGuides.docs.map(doc => ({
                guidePicPath: doc.data().Cover_Photo,
                flagPath: doc.data().Flag_Photo,
                profilePicPath: doc.data().Profile_Photo,
                guideTitle: doc.data().Guide_Title,
                tags: doc.data().Tags,
                country: doc.data().Country,
                guideId: doc.id,
                isLiked: doc.data().Liked_By.includes(this.userEmail) ? true : false,
            }));
            return guides;
            } catch (error) {
            console.error('Error fetching recently added guides:', error);
            throw error; // Rethrow the error to handle it in the caller
            }
        },
    },
    async mounted() {
        try {
            let [editorsChoiceData, regionalFavData, recentlyAddedData] = await Promise.all([
            this.fetchMockGuides(['NewZealand', 'Taipei', 'Luxembourg', 'Mexico']),
            this.fetchMockGuides(['Osaka,Japan', 'Bangkok', 'Agra,India', 'Marbella']),
            this.fetchRecentlyAdded(['NewZealand', 'Taipei', 'Luxembourg', 'Mexico', 'Osaka,Japan', 'Bangkok', 'Agra,India', 'Marbella']),
            ]);

            console.log("Editorschoicesdata", editorsChoiceData)
            console.log("RegionalFavsdata", regionalFavData)
            console.log("RecentlyAddedData", recentlyAddedData)
            this.editorsChoices = editorsChoiceData;
            this.regionalFavs = regionalFavData;
            this.recentlyAdded = recentlyAddedData;
            console.log("Editorschoices", this.editorsChoices)
            console.log("RegionalFavs", this.regionalFavs)
            console.log("RecentlyAdded", this.recentlyAdded)
            this.isLoading = false
        } catch (error) {
            console.error('Error fetching data:', error);
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
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>