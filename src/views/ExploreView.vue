<template>
    <div class="absolute inset-x-0 top-0 h-2/5">
        <img src="@/assets/ExploreCrop.jpg" class="object-cover w-full h-full rounded-b-3xl" alt="Desert" />
        <div class="absolute inset-0 bg-opacity-50 rounded-b-3xl"></div>
    </div>
    <NavBar />
    <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 class="mb-2 text-5xl font-semibold text-white">Explore our guides...</h1>
        <div class="absolute top-3/5 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
            <div class="relative mt-4">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="../assets/MagnifyingGlass.svg" alt="search" class="w-5 h-5">
            </span>
            <input type="text" placeholder="Search..." class="pl-10 p-2 w-96 rounded-lg border border-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
            </div>
        </div>
    </div>

    <div class="mt-[35vh] bg-white text-left mx-auto max-w-7xl">
        
        <h2 class="ml-20 font-semibold mb-2 text-base">Editors' Choice</h2>
        <div class="flex justify-center space-x-12">
            <ExploreCard v-for="card in editorsChoices" :key="card.guideTitle" :card="card" />
        </div>
        
        <h2 class="ml-20 font-semibold mb-2 mt-4">Regional Favourites</h2>
        <div class="flex justify-center space-x-12">
            <ExploreCard v-for="card in regionalFavs" :key="card.guideTitle" :card="card" />
            <!-- <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/> -->
        </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import ExploreCard from '@/components/ExploreCard.vue'

// import { storage } from '../firebase'
import { ref, getDownloadURL, getStorage} from 'firebase/storage'

export default {
    components: {
        NavBar,
        ExploreCard,
    },
    data() {
        return {
            editorsChoices:[],
            regionalFavs: [],
        };
    },
    methods: {
        async fetchEditorsChoice() {
            return [
                {
                    guidePicPath: 'guides/MountTaranaki/MountTaranaki.jpg',
                    flagPath: 'guides/MountTaranaki/NZflag.svg',
                    profilePicPath: 'guides/MountTaranaki/ProfilePicWoman.jpg',
                    guideTitle: 'Mount Taranaki',
                    tagCat: 'Nature',
                    tagColor: '#388e3c',
                    tagBorder: '#388e3c',
                    isLiked: false,
                },
                {
                    guidePicPath: 'guides/Taipei/Taipei.jpg',
                    flagPath: 'guides/Taipei/TWflag.svg',
                    profilePicPath: 'guides/Taipei/profile.jpg',
                    guideTitle: 'Taipei',
                    tagCat: 'Culture',
                    tagColor: '#f57c00',
                    tagBorder: '#f57c00',
                    isLiked: false,
                },
                {
                    guidePicPath: 'guides/Luxembourg/Luxembourg.jpg',
                    flagPath: 'guides/Luxembourg/LUXflag.svg',
                    profilePicPath: 'guides/Luxembourg/profileman.jpg',
                    guideTitle: 'Luxembourg',
                    tagCat: 'Entertainment',
                    tagColor: '#9c27b0',
                    tagBorder: '#9c27b0',
                    isLiked: false,
                },
                {
                    guidePicPath: 'guides/Mexico/Mexico.jpg',
                    flagPath: 'guides/Mexico/MEXflag.svg',
                    profilePicPath: 'guides/Mexico/profileman2.jpg',
                    guideTitle: 'Mexico',
                    tagCat: 'Food',
                    tagColor: '#ec407a',
                    tagBorder: '#ec407a',
                    isLiked: false,
                }
            ];
        },
        async fetchRegionalFav() {
            return [
                {
                    guidePicPath: 'guides/Matsuno/Matsuno.jpg',
                    flagPath: 'guides/Matsuno/JAPflag.svg',
                    profilePicPath: 'guides/Matsuno/profileman.jpg',
                    guideTitle: 'Matsuno, Japan',
                    tagCat: 'Nature',
                    tagColor: '#388e3c',
                    tagBorder: '#388e3c',
                    isLiked: false,
                },
                {
                    guidePicPath: 'guides/Bangkok/Bangkok.jpg',
                    flagPath: 'guides/Bangkok/THAIflag.svg',
                    profilePicPath: 'guides/Bangkok/profileman2.jpg',
                    guideTitle: 'Bangkok',
                    tagCat: 'Food',
                    tagColor: '#ec407a',
                    tagBorder: '#ec407a',
                    isLiked: false,
                },
                {
                    guidePicPath: 'guides/TajMahal/TajMahal.jpg',
                    flagPath: 'guides/TajMahal/INDflag.svg',
                    profilePicPath: 'guides/TajMahal/profile.jpg',
                    guideTitle: 'Taj Mahal',
                    tagCat: 'Landmarks',
                    tagColor: '#3f51b5',
                    tagBorder: '#3f51b5',
                    isLiked: false,
                },
                {
                    guidePicPath: 'guides/Marbella/Marbella.jpg',
                    flagPath: 'guides/Marbella/SPNflag.svg',
                    profilePicPath: 'guides/Marbella/profile2.jpg',
                    guideTitle: 'Marbella',
                    tagCat: 'Nature',
                    tagColor: '#388e3c',
                    tagBorder: '#388e3c',
                    isLiked: false,
                }
            ];
        },
        async fetchPhoto(path) {
            const storage = getStorage()
            const photoRef = ref(storage, path)
            try {
                const url = await getDownloadURL(photoRef)
                return url
            } catch (error) {
                console.log(error)
            }
        },
    },
    async mounted() {
        const editorsChoiceData = await this.fetchEditorsChoice();
        for (const data of editorsChoiceData) {
            // const guidePic = await this.fetchPhoto(data.guidePicPath);
            // const flag = await this.fetchPhoto(data.flagPath);
            // const profilePic = await this.fetchPhoto(data.profilePicPath);
            this.editorsChoices.push({
                ...data,
                guidePicPath: await this.fetchPhoto(data.guidePicPath),
                flagPath: await this.fetchPhoto(data.flagPath),
                profilePicPath: await this.fetchPhoto(data.profilePicPath),
            });
        }
        const regionalFavData = await this.fetchRegionalFav();
        for (const data of regionalFavData) {
            this.regionalFavs.push({
                ...data,
                guidePicPath: await this.fetchPhoto(data.guidePicPath),
                flagPath: await this.fetchPhoto(data.flagPath),
                profilePicPath: await this.fetchPhoto(data.profilePicPath),
            

            })
        }
        // this.guidePic = await this.fetchPhoto('guides/MountTaranaki/MountTaranaki.jpg')
        // this.flag = await this.fetchPhoto('guides/MountTaranaki/NZflag.svg')
        // this.profilePic = await this.fetchPhoto('guides/MountTaranaki/ProfilePicWoman.jpg')
    },
}

</script>


