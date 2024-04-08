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
            <input type="text" placeholder="Search..." class="pl-10 p-2 w-96 h-12 rounded-lg border border-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
            </div>
        </div>
    </div>

    <div class="mt-[35vh] bg-white text-left mx-auto max-w-7xl">
        <!-- Editors' Choice Section -->
        <h2 class="ml-20 font-semibold mb-2 text-base">Editors' Choice</h2>
        <div class="flex justify-center space-x-12">
            <ExploreCard v-for="card in editorsChoices" :key="card.guideTitle" :card="card" />
        </div>

        <!-- Regional Favourites Section -->
        <h2 class="ml-20 font-semibold mb-2 mt-4">Regional Favourites</h2>
        <div class="flex justify-center space-x-12">
            <ExploreCard v-for="card in regionalFavs" :key="card.guideTitle" :card="card" />
        </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import ExploreCard from '@/components/ExploreCard.vue'

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
            editorsChoices:[
                {
                    guidePicPath: MountTaranaki,
                    flagPath: NZflag,
                    profilePicPath: ProfileWoman,
                    guideTitle: 'Mount Taranaki',
                    tagCat: 'Nature',
                    isLiked: false,
                },
                {
                    guidePicPath: Taipei,
                    flagPath: TWflag,
                    profilePicPath: ProfileWoman2,
                    guideTitle: 'Taipei',
                    tagCat: 'Culture',
                    isLiked: false,
                },
                {
                    guidePicPath: Luxembourg,
                    flagPath: LUXflag,
                    profilePicPath: ProfileMan,
                    guideTitle: 'Luxembourg',
                    tagCat: 'Entertainment',
                    isLiked: false,
                },
                {
                    guidePicPath: Mexico,
                    flagPath: MEXflag,
                    profilePicPath: ProfileMan2,
                    guideTitle: 'Mexico',
                    tagCat: 'Food',
                    isLiked: false,
                }
            ],
            regionalFavs: [
                {
                    guidePicPath: Matsuno,
                    flagPath: JAPflag,
                    profilePicPath: ProfileMan,
                    guideTitle: 'Matsuno, Japan',
                    tagCat: 'Nature',
                    isLiked: false,
                },
                {
                    guidePicPath: Bangkok,
                    flagPath: THAIflag,
                    profilePicPath: ProfileMan2,
                    guideTitle: 'Bangkok',
                    tagCat: 'Food',
                    isLiked: false,
                },
                {
                    guidePicPath: TajMahal,
                    flagPath: INDflag,
                    profilePicPath: ProfileWoman2,
                    guideTitle: 'Taj Mahal',
                    tagCat: 'Landmarks',
                    isLiked: false,
                },
                {
                    guidePicPath: Marbella,
                    flagPath: SPNflag,
                    profilePicPath: ProfileWoman,
                    guideTitle: 'Marbella',
                    tagCat: 'Nature',
                    isLiked: false,
                }
            ],
        };
    },
//     methods: {
//         async fetchEditorsChoice() {
//             return [
//                 {
//                     guidePicPath: 'guides/MountTaranaki/MountTaranaki.jpg',
//                     flagPath: 'guides/MountTaranaki/NZflag.svg',
//                     profilePicPath: 'guides/MountTaranaki/ProfilePicWoman.jpg',
//                     guideTitle: 'Mount Taranaki',
//                     tagCat: 'Nature',
//                     tagColor: '#388e3c',
//                     tagBorder: '#388e3c',
//                     isLiked: false,
//                 },
//                 {
//                     guidePicPath: 'guides/Taipei/Taipei.jpg',
//                     flagPath: 'guides/Taipei/TWflag.svg',
//                     profilePicPath: 'guides/Taipei/profile.jpg',
//                     guideTitle: 'Taipei',
//                     tagCat: 'Culture',
//                     tagColor: '#f57c00',
//                     tagBorder: '#f57c00',
//                     isLiked: false,
//                 },
//                 {
//                     guidePicPath: 'guides/Luxembourg/Luxembourg.jpg',
//                     flagPath: 'guides/Luxembourg/LUXflag.svg',
//                     profilePicPath: 'guides/Luxembourg/profileman.jpg',
//                     guideTitle: 'Luxembourg',
//                     tagCat: 'Entertainment',
//                     tagColor: '#9c27b0',
//                     tagBorder: '#9c27b0',
//                     isLiked: false,
//                 },
//                 {
//                     guidePicPath: 'guides/Mexico/Mexico.jpg',
//                     flagPath: 'guides/Mexico/MEXflag.svg',
//                     profilePicPath: 'guides/Mexico/profileman2.jpg',
//                     guideTitle: 'Mexico',
//                     tagCat: 'Food',
//                     tagColor: '#ec407a',
//                     tagBorder: '#ec407a',
//                     isLiked: false,
//                 }
//             ];
//         },
//         async fetchRegionalFav() {
//             return [
//                 {
//                     guidePicPath: 'guides/Matsuno/Matsuno.jpg',
//                     flagPath: 'guides/Matsuno/JAPflag.svg',
//                     profilePicPath: 'guides/Matsuno/profileman.jpg',
//                     guideTitle: 'Matsuno, Japan',
//                     tagCat: 'Nature',
//                     tagColor: '#388e3c',
//                     tagBorder: '#388e3c',
//                     isLiked: false,
//                 },
//                 {
//                     guidePicPath: 'guides/Bangkok/Bangkok.jpg',
//                     flagPath: 'guides/Bangkok/THAIflag.svg',
//                     profilePicPath: 'guides/Bangkok/profileman2.jpg',
//                     guideTitle: 'Bangkok',
//                     tagCat: 'Food',
//                     tagColor: '#ec407a',
//                     tagBorder: '#ec407a',
//                     isLiked: false,
//                 },
//                 {
//                     guidePicPath: 'guides/TajMahal/TajMahal.jpg',
//                     flagPath: 'guides/TajMahal/INDflag.svg',
//                     profilePicPath: 'guides/TajMahal/profile.jpg',
//                     guideTitle: 'Taj Mahal',
//                     tagCat: 'Landmarks',
//                     tagColor: '#3f51b5',
//                     tagBorder: '#3f51b5',
//                     isLiked: false,
//                 },
//                 {
//                     guidePicPath: 'guides/Marbella/Marbella.jpg',
//                     flagPath: 'guides/Marbella/SPNflag.svg',
//                     profilePicPath: 'guides/Marbella/profile2.jpg',
//                     guideTitle: 'Marbella',
//                     tagCat: 'Nature',
//                     tagColor: '#388e3c',
//                     tagBorder: '#388e3c',
//                     isLiked: false,
//                 }
//             ];
//         },
//         async fetchPhoto(path) {
//             // const storage = getStorage()
//             const photoRef = ref(storage, path)
//             try {
//                 const url = await getDownloadURL(photoRef)
//                 return url
//             } catch (error) {
//                 console.log(error)
//             }
//         },
//     },
    
//     async mounted() {
//         const [editorsChoiceData, regionalFavData] = await Promise.all([
//             this.fetchEditorsChoice(),
//             this.fetchRegionalFav()
//         ]);

//         const editorsChoicesPromises = editorsChoiceData.map(async data => {
//             const [guidePicPath, flagPath, profilePicPath] = await Promise.all([
//             this.fetchPhoto(data.guidePicPath),
//             this.fetchPhoto(data.flagPath),
//             this.fetchPhoto(data.profilePicPath)
//             ]);

//             return {
//             ...data,
//             guidePicPath,
//             flagPath,
//             profilePicPath
//             };
//         });

//         const regionalFavsPromises = regionalFavData.map(async data => {
//             const [guidePicPath, flagPath, profilePicPath] = await Promise.all([
//             this.fetchPhoto(data.guidePicPath),
//             this.fetchPhoto(data.flagPath),
//             this.fetchPhoto(data.profilePicPath)
//             ]);

//             return {
//             ...data,
//             guidePicPath,
//             flagPath,
//             profilePicPath
//             };
//         });

//         this.editorsChoices = await Promise.all(editorsChoicesPromises);
//         this.regionalFavs = await Promise.all(regionalFavsPromises);
//     },
// }
}
</script>


