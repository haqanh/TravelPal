<template>
  <div class="flex flex-col items-center justify-center">
    <div class="flex flex-col items-start space-y-3">
      <div
        class="bg-gray shadow-lg w-56 rounded-3xl guideCard cursor-pointer"
        v-on:click="openGuide"
        v-if="isVisible"
      >
        <div class="relative h-48 overflow-hidden bg-gray-200 rounded-3xl">
          <!-- Guide Cover Photo -->
          <img
            :src="card.guidePicPath"
            loading="lazy"
            alt="Image"
            class="object-cover rounded-t-2xl h-full w-full"
          />
          <div class="flex absolute top-0 right-0 p-3">
            <!-- Profile Picture -->
            <img
              :src="card.profilePicPath"
              loading="lazy"
              alt="profile"
              class="object-cover rounded-full h-7 w-7"
            />
          </div>

            <!-- Guide Title and Flag -->
          <div class="flex items-center absolute bottom-0 left-0 p-3">
            <img :src="card.flagPath" loading="lazy" alt="flag" />
            <span class="ml-2 text-white font-medium text-xs drop-shadow-lg">{{ card.guideTitle }}</span>
          </div>
        </div>
      </div>

      <div class="w-56 flex justify-between items-center place-items-center">
        <!-- Tag  -->
        <div class="flex flex-wrap">
          <div v-for="(tag, index) in card.tags" :key="index" class="mr-2 mb-2">
            <GlobalTag
              :tagCategory="tag"
            ></GlobalTag>
          </div>
        </div>

        <!-- Like Button -->
        <div @click="handleLike" class="cursor-pointer">
          <svg
            v-if="isLiked"
            xmlns="http://www.w3.org/2000/svg"
            fill="red"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="red"
            class="h-5 w-5 heart-icon cursor-pointer"
            :class="{ 'animate-like': isLiked }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5 w-5 heart-icon"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script>

import GlobalTag from './GlobalTag.vue';
import { db } from '@/firebase';
import { doc, collection, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

import { getAuth } from 'firebase/auth';

export default {
  components: {
    GlobalTag
  },

  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isVisible: true,
      isLiked: false
    }
  },
  methods: {
    openGuide() {
      this.isVisible = false;
      this.$router.push(`/guide/${this.card.guideTitle}`);
    },
    async handleLike() {
      this.isLiked = !this.isLiked;
      const auth = getAuth();
      const user = auth.currentUser;

      // Get reference to the current guide
      const currGuideRef = doc(collection(db, 'guides'), this.card.guideTitle);
      const userRef = doc(collection(db, 'users'), user.email);

      if (this.isLiked) {
        // Add the current guide to the user's favourites
        await updateDoc(userRef, {
          Favourites: arrayUnion(currGuideRef)
        })
        .then(() => {
          console.log('Successfully added to Favourites!');
        })
        .catch((error) => {
          console.error('Error adding to favourites: ', error);
        });
      } else {
        // Remove the current guide from the user's favourites
        await updateDoc(userRef, {
          Favourites: arrayRemove(currGuideRef)
        })
        .then(() => {
          console.log('Successfully removed from Favourites!');
        })
        .catch((error) => {
          console.error('Error removing from favourites: ', error);
        });
      }
    }
  },
  mounted() {
    console.log(this.guidePic)
  }
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
