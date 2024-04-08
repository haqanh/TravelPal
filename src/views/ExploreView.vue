<template>
    <div class="absolute inset-x-0 top-0 h-2/5">
        <img src="@/assets/ExploreCrop.jpg" class="object-cover w-full h-full rounded-b-3xl" alt="Desert" />
        <div class="absolute inset-0 bg-opacity-50 rounded-b-3xl"></div>
    </div>
    <NavBar />
    <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 class="mb-1 text-5xl font-semibold text-white">Explore our guides...</h1>

        <!-- Search Bar -->
        <div class="absolute top-3/5 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
            <div class="relative mt-4">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="../assets/MagnifyingGlass.svg" alt="search" class="w-5 h-5">
            </span>
            <input v-model="searchInput" type="text" placeholder="Search..." class="pl-10 p-2 w-96 h-12 rounded-lg border border-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
            </div>
        </div>
    </div>

    <!-- Loading spinner -->
    <div v-if="isLoading" class="loading-spinner fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <div class="spinner"></div>
    </div>

    <div v-else class="mt-[35vh] bg-white text-left mx-auto max-w-7xl">
        <!-- Editors' Choice Section -->
        <h2 class="ml-20 font-semibold mb-2 text-base">Editors' Choice</h2>
        <div class="flex flex-wrap justify-center space-x-12">
            <ExploreCard v-for="card in filteredEditorsChoices" :key="card.guideTitle" :card="card" />
        </div>

        <!-- Regional Favourites Section -->
        <h2 class="ml-20 font-semibold mb-2 mt-4">Regional Favourites</h2>
        <div class="flex flex-wrap justify-center space-x-12">
            <ExploreCard v-for="card in filteredRegionalFavs" :key="card.guideTitle" :card="card" />
        </div>

        <!-- Recently Added Section -->
        <h2 v-if="recentlyAdded" class="ml-20 font-semibold mb-2 mt-4">Recently Added</h2>
        <div class="flex flex-wrap justify-center space-x-12">
            <ExploreCard v-for="card in recentlyAdded" :key="card.guideTitle" :card="card" />
        </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import ExploreCard from '@/components/ExploreCard.vue'

import { db } from '@/firebase';
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import MountTaranaki from '../assets/guideCover/MountTaranaki.jpg'
import ProfileWoman from '../assets/profiles/ProfileWoman.jpg'
import NZflag from '../assets/flags/NZflag.svg'

import Taipei from '../assets/guideCover/Taipei.jpg'
import TWflag from '../assets/flags/TWflag.svg'
import ProfileWoman2 from '../assets/profiles/ProfileWoman2.jpg'

import Luxembourg from '../assets/guideCover/Luxembourg.jpg'
import LUXflag from '../assets/flags/LUXflag.svg'
import ProfileMan from '../assets/profiles/ProfileMan.jpg'

import Mexico from '../assets/guideCover/Mexico.jpg'
import MEXflag from '../assets/flags/MEXflag.svg'
import ProfileMan2 from '../assets/profiles/ProfileMan2.jpg'

import Matsuno from '../assets/guideCover/Matsuno.jpg'
import JAPflag from '../assets/flags/JAPflag.svg'

import Bangkok from '../assets/guideCover/Bangkok.jpg'
import THAIflag from '../assets/flags/THAIflag.svg'

import TajMahal from '../assets/guideCover/TajMahal.jpg'
import INDflag from '../assets/flags/INDflag.svg'

import Marbella from '../assets/guideCover/Marbella.jpg'
import SPNflag from '../assets/flags/SPNflag.svg'

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
    },
    methods: {
        async fetchMockGuides(guideIds) {
            const guides = [];
            for (const id of guideIds) {
                const docRef = doc(db, 'guides', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists) {
                    const data = docSnap.data();
                    guides.push({
                        guidePicPath: data.Cover_Photo,
                        flagPath: data.Flag_Photo,
                        profilePicPath: data.Profile_Photo,
                        guideTitle: data.Guide_Title,
                        tags: data.Tags,
                        isLiked: data.Is_Liked,
                        country: data.Country,
                    });
                } else {
                    console.log(`No such document found with id: ${id}`);
                }
            }
            return guides;
        },
        async fetchRecentlyAdded(excludeMock) {
            const guidesRef = collection(db, 'guides');
            const queryRef = query(guidesRef, where('Guide_Title', 'not-in', excludeMock));
            let guides = [];
            try {
                const querySnapshotGuides = await getDocs(queryRef);
                guides = querySnapshotGuides.docs.map(doc => ({
                    guidePicPath: doc.data().Cover_Photo,
                    flagPath: doc.data().Flag_Photo,
                    profilePicPath: doc.data().Profile_Photo,
                    guideTitle: doc.data().Guide_Title,
                    tags: doc.data().Tags,
                    isLiked: doc.data().Is_Liked,
                    country: doc.data().Country,
                }));
            } catch (error) {
                console.log(error);
            }
            return guides;
        },
    },
    async mounted() {
        const [editorsChoiceData, regionalFavData, recentlyAddedData] = await Promise.all([
            this.fetchMockGuides(['Mount Taranaki', 'Taipei', 'Luxembourg', 'Mexico']),
            this.fetchMockGuides(['Matsuno, Japan', 'Bangkok', 'Agra, India', 'Marbella']),
            this.fetchRecentlyAdded(['Mount Taranaki', 'Taipei', 'Luxembourg', 'Mexico', 'Matsuno, Japan', 'Bangkok', 'Agra, India', 'Marbella']),
        ]);
        this.editorsChoices = editorsChoiceData;
        this.regionalFavs = regionalFavData;
        this.recentlyAdded = recentlyAddedData;
        this.isLoading = false;
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