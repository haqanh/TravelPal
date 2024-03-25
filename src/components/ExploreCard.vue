<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-start space-y-3">
            <div class="bg-gray shadow-lg w-56 rounded-3xl guideCard" v-on:click="openGuide" v-if="isVisible">
                <div class="relative h-48 overflow-hidden bg-gray-200 rounded-3xl">
                    <img :src="card.guidePicPath" loading="lazy" alt="Image" class="object-cover rounded-t-2xl h-full w-full">
                    <div class="flex absolute top-0 right-0 p-3">
                        <img :src="card.profilePicPath" loading="lazy" alt="profile"
                            class="object-cover rounded-full h-7 w-7">
                    </div>
                    <div class="flex items-center absolute bottom-0 left-0 p-3">
                        <img :src="card.flagPath" loading="lazy" alt="flag">
                        <span class="ml-2 text-white font-medium text-xs">{{card.guideTitle}}</span>
                    </div>
                </div>
            </div>
            <div class="w-56 flex justify-between items-center">
                <!-- <span class="px-4 py-1 text-semibold text-xs rounded-lg text-green-700 border border-green-700">
                    Nature
                </span> -->
                <!-- need to put hashcolour -->
                <GlobalTag :tagCategory="card.tagCat" :textColor="card.tagColor" :borderColor="card.tagBorder"></GlobalTag>
                <div @click="likeGuide">
                    <svg v-if="isLiked" xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="red" class="h-5 w-5 heart-icon" :class="{'animate-like': isLiked}">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-5 w-5 heart-icon">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import { useRouter } from 'vue-router'
// import GlobalTag from './GlobalTag.vue'

// export default {
//     components: {
//         GlobalTag
//     },
//     data() {
//         return {
//             isVisible: true,
//             isLiked: false
//         }
//     },
//     methods: {
//         openGuide() {
//             this.isVisible = false
//             this.$router.push({ name: 'GuideView' })
//         },
//         likeGuide() {
//             this.isLiked = !this.isLiked
//         }
//     },
//     created() {
//         this.$router = useRouter()
//     }
// }

import GlobalTag from './GlobalTag.vue'

export default {
    components: {
        GlobalTag
    },
    
    props: { 
        card: {
            type: Object,
            required: true,
        },
        // guidePic: {
        //     type: String,
        // },
        // flag: {
        //     type: String,
        //     default: ''
        // },
        // guideTitle: {
        //     type: String,
        //     default: ''
        // },
        // profilePic: {
        //     type: String,
        //     default: ''
        // },
        // tagCat: {
        //     type: String,
        //     default: ''
        // },
        // tagColor: {
        //     type: String,
        //     default: ''
        // },
        // tagBorder: {
        //     type: String,
        //     default: ''
        // },
        // isLiked: {
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            isVisible: true,
            isLiked: false,
        }
    },
    methods: {
        openGuide() {
            this.isVisible = false
            this.$router.push({ name: 'GuideView' })
        },
        likeGuide() {
            this.isLiked = !this.isLiked;
        }
    },
    mounted() {
            console.log(this.guidePic);
    },
}
</script>

<style scoped>
.heart-icon {
  transition: transform 0.3s ease;
}

.heart-icon.animate-like {
  animation: pulse 0.3s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.guideCard {
    box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23); /* Add shadows for 3D effect */
    transition: transform 0.3s ease-in-out; /* Smooth transform on hover */
}

.guideCard:hover {
    transform: scale(1.05);
}
</style>