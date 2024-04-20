<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col items-start space-y-3">
      <div
        class="bg-gray shadow-lg w-56 rounded-3xl guideCard cursor-pointer"
        v-on:click="openGuide"
        v-if="isVisible"
      >
        <div class="flex flex-col relative h-48 overflow-hidden bg-gray-200 rounded-3xl">
          <!-- Guide Cover Photo -->
            <img
              :src="card.guidePicPath"
              alt="Image"
              class="object-cover rounded-t-2xl h-full w-full"
            />

          <div class="flex absolute top-0 right-0 p-3">
            <!-- Profile Picture -->
            <img
              :src="card.profilePicPath"
              alt="profile"
              class="object-cover rounded-full h-7 w-7"
            />
          </div>

            <!-- Guide Title and Flag -->
          <div class="flex items-center absolute bottom-0 left-0 p-3">
            <!-- <img :src="card.flagPath" loading="lazy" alt="flag" /> -->
            <span :class="getFlagClass(card.country)" class="mr-2"></span>
            <span class="ml-2 text-white font-medium text-xs drop-shadow-lg">{{ card.guideTitle }}</span>
          </div>
        </div>
      </div>

      <div class="w-56 flex justify-between items-center place-items-center">
        <!-- Tag  -->
        <div class="flex flex-wrap ">
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
      isLiked: this.card.isLiked,
    }
  },
  methods: {
    openGuide() {
      this.isVisible = false;
      console.log("Passing the correct guideId:", this.card.guideId)
      this.$router.push(`/guide/${this.card.guideId}`);
    },
    async handleLike() {
      this.isLiked = !this.isLiked;
      const auth = getAuth();
      const user = auth.currentUser;

      // Get reference to the current guide
      const currGuideRef = doc(collection(db, 'guides'), this.card.guideId);
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

        // Add the user's email to the guide's Liked_By array
        await updateDoc(currGuideRef, {
          Liked_By: arrayUnion(user.email)
        })
        .then(() => {
          console.log('Successfully added to Liked_By!');
        })
        .catch((error) => {
          console.error('Error adding to Liked_By: ', error);
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

        // Remove the user's email from the guide's Liked_By array
        await updateDoc(currGuideRef, {
          Liked_By: arrayRemove(user.email)
        })
        .then(() => {
          console.log('Successfully removed from Liked_By!');
        })
        .catch((error) => {
          console.error('Error removing from Liked_By: ', error);
        });
      }
    },
    getFlagClass(country) {
      const countryCodes = {
        "Albania": "fi fi-al",
        "Algeria": "fi fi-dz",
        "Andorra": "fi fi-ad",
        "Angola": "fi fi-ao",
        "Antigua and Barbuda": "fi fi-ag",
        "Argentina": "fi fi-ar",
        "Armenia": "fi fi-am",
        "Australia": "fi fi-au",
        "Austria": "fi fi-at",
        "Azerbaijan": "fi fi-az",
        "Bahamas": "fi fi-bs",
        "Bahrain": "fi fi-bh",
        "Bangladesh": "fi fi-bd",
        "Barbados": "fi fi-bb",
        "Belarus": "fi fi-by",
        "Belgium": "fi fi-be",
        "Belize": "fi fi-bz",
        "Benin": "fi fi-bj",
        "Bhutan": "fi fi-bt",
        "Bolivia": "fi fi-bo",
        "Bosnia and Herzegovina": "fi fi-ba",
        "Botswana": "fi fi-bw",
        "Brazil": "fi fi-br",
        "Brunei": "fi fi-bn",
        "Bulgaria": "fi fi-bg",
        "Burkina Faso": "fi fi-bf",
        "Burundi": "fi fi-bi",
        "Cabo Verde": "fi fi-cv",
        "Cambodia": "fi fi-kh",
        "Cameroon": "fi fi-cm",
        "Canada": "fi fi-ca",
        "Central African Republic": "fi fi-cf",
        "Chad": "fi fi-td",
        "Chile": "fi fi-cl",
        "China": "fi fi-cn",
        "Colombia": "fi fi-co",
        "Comoros": "fi fi-km",
        "Congo (Congo-Brazzaville)": "fi fi-cg",
        "Costa Rica": "fi fi-cr",
        "Croatia": "fi fi-hr",
        "Cuba": "fi fi-cu",
        "Cyprus": "fi fi-cy",
        "Czechia (Czech Republic)": "fi fi-cz",
        "Democratic Republic of the Congo": "fi fi-cd",
        "Denmark": "fi fi-dk",
        "Djibouti": "fi fi-dj",
        "Dominica": "fi fi-dm",
        "Dominican Republic": "fi fi-do",
        "Ecuador": "fi fi-ec",
        "Egypt": "fi fi-eg",
        "El Salvador": "fi fi-sv",
        "Equatorial Guinea": "fi fi-gq",
        "Eritrea": "fi fi-er",
        "Estonia": "fi fi-ee",
        "Eswatini": "fi fi-sz",
        "Ethiopia": "fi fi-et",
        "Fiji": "fi fi-fj",
        "Finland": "fi fi-fi",
        "France": "fi fi-fr",
        "Gabon": "fi fi-ga",
        "Gambia": "fi fi-gm",
        "Georgia": "fi fi-ge",
        "Germany": "fi fi-de",
        "Ghana": "fi fi-gh",
        "Greece": "fi fi-gr",
        "Grenada": "fi fi-gd",
        "Guatemala": "fi fi-gt",
        "Guinea": "fi fi-gn",
        "Guinea-Bissau": "fi fi-gw",
        "Guyana": "fi fi-gy",
        "Haiti": "fi fi-ht",
        "Honduras": "fi fi-hn",
        "Hungary": "fi fi-hu",
        "Iceland": "fi fi-is",
        "India": "fi fi-in",
        "Indonesia": "fi fi-id",
        "Iran": "fi fi-ir",
        "Iraq": "fi fi-iq",
        "Ireland": "fi fi-ie",
        "Italy": "fi fi-it",
        "Ivory Coast": "fi fi-ci",
        "Jamaica": "fi fi-jm",
        "Japan": "fi fi-jp",
        "Jordan": "fi fi-jo",
        "Kazakhstan": "fi fi-kz",
        "Kenya": "fi fi-ke",
        "Kiribati": "fi fi-ki",
        "Kuwait": "fi fi-kw",
        "Kyrgyzstan": "fi fi-kg",
        "Laos": "fi fi-la",
        "Latvia": "fi fi-lv",
        "Lebanon": "fi fi-lb",
        "Lesotho": "fi fi-ls",
        "Liberia": "fi fi-lr",
        "Libya": "fi fi-ly",
        "Liechtenstein": "fi fi-li",
        "Lithuania": "fi fi-lt",
        "Luxembourg": "fi fi-lu",
        "Madagascar": "fi fi-mg",
        "Malawi": "fi fi-mw",
        "Malaysia": "fi fi-my",
        "Maldives": "fi fi-mv",
        "Mali": "fi fi-ml",
        "Malta": "fi fi-mt",
        "Marshall Islands": "fi fi-mh",
        "Mauritania": "fi fi-mr",
        "Mauritius": "fi fi-mu",
        "Mexico": "fi fi-mx",
        "Micronesia": "fi fi-fm",
        "Moldova": "fi fi-md",
        "Monaco": "fi fi-mc",
        "Mongolia": "fi fi-mn",
        "Montenegro": "fi fi-me",
        "Morocco": "fi fi-ma",
        "Mozambique": "fi fi-mz",
        "Myanmar (Burma)": "fi fi-mm",
        "Namibia": "fi fi-na",
        "Nauru": "fi fi-nr",
        "Nepal": "fi fi-np",
        "Netherlands": "fi fi-nl",
        "New Zealand": "fi fi-nz",
        "Nicaragua": "fi fi-ni",
        "Niger": "fi fi-ne",
        "Nigeria": "fi fi-ng",
        "North Macedonia": "fi fi-mk",
        "Norway": "fi fi-no",
        "Oman": "fi fi-om",
        "Palau": "fi fi-pw",
        "Panama": "fi fi-pa",
        "Papua New Guinea": "fi fi-pg",
        "Paraguay": "fi fi-py",
        "Peru": "fi fi-pe",
        "Philippines": "fi fi-ph",
        "Poland": "fi fi-pl",
        "Portugal": "fi fi-pt",
        "Qatar": "fi fi-qa",
        "Romania": "fi fi-ro",
        "Russia": "fi fi-ru",
        "Rwanda": "fi fi-rw",
        "Saint Kitts and Nevis": "fi fi-kn",
        "Saint Lucia": "fi fi-lc",
        "Saint Vincent and the Grenadines": "fi fi-vc",
        "Samoa": "fi fi-ws",
        "San Marino": "fi fi-sm",
        "Sao Tome and Principe": "fi fi-st",
        "Saudi Arabia": "fi fi-sa",
        "Senegal": "fi fi-sn",
        "Serbia": "fi fi-rs",
        "Seychelles": "fi fi-sc",
        "Sierra Leone": "fi fi-sl",
        "Singapore": "fi fi-sg",
        "Slovakia": "fi fi-sk",
        "Slovenia": "fi fi-si",
        "Solomon Islands": "fi fi-sb",
        "Somalia": "fi fi-so",
        "South Africa": "fi fi-za",
        "South Korea": "fi fi-kr",
        "South Sudan": "fi fi-ss",
        "Spain": "fi fi-es",
        "Sri Lanka": "fi fi-lk",
        "Sudan": "fi fi-sd",
        "Suriname": "fi fi-sr",
        "Sweden": "fi fi-se",
        "Switzerland": "fi fi-ch",
        "Syria": "fi fi-sy",
        "Taiwan": "fi fi-tw",
        "Tajikistan": "fi fi-tj",
        "Tanzania": "fi fi-tz",
        "Thailand": "fi fi-th",
        "Timor-Leste": "fi fi-tl",
        "Togo": "fi fi-tg",
        "Tonga": "fi fi-to",
        "Trinidad and Tobago": "fi fi-tt",
        "Tunisia": "fi fi-tn",
        "Turkey": "fi fi-tr",
        "Turkmenistan": "fi fi-tm",
        "Tuvalu": "fi fi-tv",
        "Uganda": "fi fi-ug",
        "Ukraine": "fi fi-ua",
        "United Arab Emirates": "fi fi-ae",
        "United Kingdom": "fi fi-gb",
        "United States": "fi fi-us",
        "Uruguay": "fi fi-uy",
        "Uzbekistan": "fi fi-uz",
        "Vanuatu": "fi fi-vu",
        "Vatican City": "fi fi-va",
        "Venezuela": "fi fi-ve",
        "Vietnam": "fi fi-vn",
        "Yemen": "fi fi-ye",
        "Zambia": "fi fi-zm",
        "Zimbabwe": "fi fi-zw",
      };
      return countryCodes[country] || 'fi'; // Default class if country code not found
    },
  },
  mounted() {
    console.log(this.guidePic)
    const img1 = new Image();
    img1.src = this.card.guidePicPath;

    const img2 = new Image();
    img2.src = this.card.profilePicPath;

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
