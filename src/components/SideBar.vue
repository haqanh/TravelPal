<template>
  <aside class="bg-gray-100 w-80 px-6 py-8 sticky top-0 h-screen">
    <ul class="space-y-10">
      <li>
        <h5 class="text-xl font-semibold mb-4 text-left">Bucket List 🌍</h5>
        <ul class="grid grid-cols-2 gap-2">
          <li
            v-for="(country, index) in userData.Bucket_List"
            :key="index"
            class="country-item"
          >
            <span :class="getFlagClass(country)"></span>
            <span class="country-name">{{ country }}</span>
          </li>
        </ul>
      </li>
      <li>
        <div class="flex justify-between items-center mb-4">
          <h5 class="text-l font-semibold text-left">Distance Travelled</h5>
          <span class="text-gray-600">{{ formatNumber(userData.Distance_Travelled) }}km</span>
        </div>
        <div class="w-full bg-gray-300 h-1.5 rounded-full">
          <div class="bg-primary h-1.5 rounded-full" style="width: 75%"></div>
        </div>
      </li>
      <div class="grid grid-cols-2 gap-4">
        <div class="info-card">
          <h3 class="text-l font-semibold mb-2">You've been to</h3>
          <div class="stats-container text-white">
            <span class="text-lg font-semibold">{{ formatNumber(userData.Num_Visited) }}</span>
            <p>Countries</p>
          </div>
        </div>
        <div class="info-card2">
          <h3 class="text-l font-semibold mb-2">You've walked</h3>
          <div class="stats-container text-white">
            <span class="text-lg font-semibold">{{ formatNumber(userData.Steps) }}</span> <br />
            Steps
          </div>
        </div>
      </div>
    </ul>
  </aside>
</template>
<script lang="ts">
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth' // Import Firebase Authentication methods

export default {
  data() {
    return {
      userData: {
        Bucket_list: [] // Initialize with an empty array
      }
    }
  },
  created() {
    this.initAuthListener()
  },
  methods: {
    initAuthListener() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Fetch user data using the email as the document ID
          this.fetchUserData(user.email)
          console.log(user.email)
        } else {
          console.log('User is not logged in')
        }
      })
    },
    async fetchUserData(email) {
      try {
        const userRef = doc(db, 'users', email) // Use email to reference user document
        const userSnapshot = await getDoc(userRef)

        if (userSnapshot.exists()) {
          this.userData = userSnapshot.data()
          console.log('User data:', this.userData)
        } else {
          console.error('No such user!')
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    formatNumber(number) {
      if (number === undefined || isNaN(number)) {
        // Return a default value, such as '0', or handle the case as needed
        return '0';
      }
      return number.toLocaleString();
    },
    getFlagClass(country) {
      const countryCodes = {
        Albania: 'fi fi-al',
        Algeria: 'fi fi-dz',
        Andorra: 'fi fi-ad',
        Angola: 'fi fi-ao',
        'Antigua and Barbuda': 'fi fi-ag',
        Argentina: 'fi fi-ar',
        Armenia: 'fi fi-am',
        Australia: 'fi fi-au',
        Austria: 'fi fi-at',
        Azerbaijan: 'fi fi-az',
        Bahamas: 'fi fi-bs',
        Bahrain: 'fi fi-bh',
        Bangladesh: 'fi fi-bd',
        Barbados: 'fi fi-bb',
        Belarus: 'fi fi-by',
        Belgium: 'fi fi-be',
        Belize: 'fi fi-bz',
        Benin: 'fi fi-bj',
        Bhutan: 'fi fi-bt',
        Bolivia: 'fi fi-bo',
        'Bosnia and Herzegovina': 'fi fi-ba',
        Botswana: 'fi fi-bw',
        Brazil: 'fi fi-br',
        Brunei: 'fi fi-bn',
        Bulgaria: 'fi fi-bg',
        'Burkina Faso': 'fi fi-bf',
        Burundi: 'fi fi-bi',
        'Cabo Verde': 'fi fi-cv',
        Cambodia: 'fi fi-kh',
        Cameroon: 'fi fi-cm',
        Canada: 'fi fi-ca',
        'Central African Republic': 'fi fi-cf',
        Chad: 'fi fi-td',
        Chile: 'fi fi-cl',
        China: 'fi fi-cn',
        Colombia: 'fi fi-co',
        Comoros: 'fi fi-km',
        'Congo (Congo-Brazzaville)': 'fi fi-cg',
        'Costa Rica': 'fi fi-cr',
        Croatia: 'fi fi-hr',
        Cuba: 'fi fi-cu',
        Cyprus: 'fi fi-cy',
        'Czechia (Czech Republic)': 'fi fi-cz',
        'Democratic Republic of the Congo': 'fi fi-cd',
        Denmark: 'fi fi-dk',
        Djibouti: 'fi fi-dj',
        Dominica: 'fi fi-dm',
        'Dominican Republic': 'fi fi-do',
        Ecuador: 'fi fi-ec',
        Egypt: 'fi fi-eg',
        'El Salvador': 'fi fi-sv',
        'Equatorial Guinea': 'fi fi-gq',
        Eritrea: 'fi fi-er',
        Estonia: 'fi fi-ee',
        Eswatini: 'fi fi-sz',
        Ethiopia: 'fi fi-et',
        Fiji: 'fi fi-fj',
        Finland: 'fi fi-fi',
        France: 'fi fi-fr',
        Gabon: 'fi fi-ga',
        Gambia: 'fi fi-gm',
        Georgia: 'fi fi-ge',
        Germany: 'fi fi-de',
        Ghana: 'fi fi-gh',
        Greece: 'fi fi-gr',
        Grenada: 'fi fi-gd',
        Guatemala: 'fi fi-gt',
        Guinea: 'fi fi-gn',
        'Guinea-Bissau': 'fi fi-gw',
        Guyana: 'fi fi-gy',
        Haiti: 'fi fi-ht',
        Honduras: 'fi fi-hn',
        Hungary: 'fi fi-hu',
        Iceland: 'fi fi-is',
        India: 'fi fi-in',
        Indonesia: 'fi fi-id',
        Iran: 'fi fi-ir',
        Iraq: 'fi fi-iq',
        Ireland: 'fi fi-ie',
        Italy: 'fi fi-it',
        'Ivory Coast': 'fi fi-ci',
        Jamaica: 'fi fi-jm',
        Japan: 'fi fi-jp',
        Jordan: 'fi fi-jo',
        Kazakhstan: 'fi fi-kz',
        Kenya: 'fi fi-ke',
        Kiribati: 'fi fi-ki',
        Kuwait: 'fi fi-kw',
        Kyrgyzstan: 'fi fi-kg',
        Laos: 'fi fi-la',
        Latvia: 'fi fi-lv',
        Lebanon: 'fi fi-lb',
        Lesotho: 'fi fi-ls',
        Liberia: 'fi fi-lr',
        Libya: 'fi fi-ly',
        Liechtenstein: 'fi fi-li',
        Lithuania: 'fi fi-lt',
        Luxembourg: 'fi fi-lu',
        Madagascar: 'fi fi-mg',
        Malawi: 'fi fi-mw',
        Malaysia: 'fi fi-my',
        Maldives: 'fi fi-mv',
        Mali: 'fi fi-ml',
        Malta: 'fi fi-mt',
        'Marshall Islands': 'fi fi-mh',
        Mauritania: 'fi fi-mr',
        Mauritius: 'fi fi-mu',
        Mexico: 'fi fi-mx',
        Micronesia: 'fi fi-fm',
        Moldova: 'fi fi-md',
        Monaco: 'fi fi-mc',
        Mongolia: 'fi fi-mn',
        Montenegro: 'fi fi-me',
        Morocco: 'fi fi-ma',
        Mozambique: 'fi fi-mz',
        'Myanmar (Burma)': 'fi fi-mm',
        Namibia: 'fi fi-na',
        Nauru: 'fi fi-nr',
        Nepal: 'fi fi-np',
        Netherlands: 'fi fi-nl',
        'New Zealand': 'fi fi-nz',
        Nicaragua: 'fi fi-ni',
        Niger: 'fi fi-ne',
        Nigeria: 'fi fi-ng',
        'North Macedonia': 'fi fi-mk',
        Norway: 'fi fi-no',
        Oman: 'fi fi-om',
        Palau: 'fi fi-pw',
        Panama: 'fi fi-pa',
        'Papua New Guinea': 'fi fi-pg',
        Paraguay: 'fi fi-py',
        Peru: 'fi fi-pe',
        Philippines: 'fi fi-ph',
        Poland: 'fi fi-pl',
        Portugal: 'fi fi-pt',
        Qatar: 'fi fi-qa',
        Romania: 'fi fi-ro',
        Russia: 'fi fi-ru',
        Rwanda: 'fi fi-rw',
        'Saint Kitts and Nevis': 'fi fi-kn',
        'Saint Lucia': 'fi fi-lc',
        'Saint Vincent and the Grenadines': 'fi fi-vc',
        Samoa: 'fi fi-ws',
        'San Marino': 'fi fi-sm',
        'Sao Tome and Principe': 'fi fi-st',
        'Saudi Arabia': 'fi fi-sa',
        Senegal: 'fi fi-sn',
        Serbia: 'fi fi-rs',
        Seychelles: 'fi fi-sc',
        'Sierra Leone': 'fi fi-sl',
        Singapore: 'fi fi-sg',
        Slovakia: 'fi fi-sk',
        Slovenia: 'fi fi-si',
        'Solomon Islands': 'fi fi-sb',
        Somalia: 'fi fi-so',
        'South Africa': 'fi fi-za',
        'South Korea': 'fi fi-kr',
        'South Sudan': 'fi fi-ss',
        Spain: 'fi fi-es',
        'Sri Lanka': 'fi fi-lk',
        Sudan: 'fi fi-sd',
        Suriname: 'fi fi-sr',
        Sweden: 'fi fi-se',
        Switzerland: 'fi fi-ch',
        Syria: 'fi fi-sy',
        Taiwan: 'fi fi-tw',
        Tajikistan: 'fi fi-tj',
        Tanzania: 'fi fi-tz',
        Thailand: 'fi fi-th',
        'Timor-Leste': 'fi fi-tl',
        Togo: 'fi fi-tg',
        Tonga: 'fi fi-to',
        'Trinidad and Tobago': 'fi fi-tt',
        Tunisia: 'fi fi-tn',
        Turkey: 'fi fi-tr',
        Turkmenistan: 'fi fi-tm',
        Tuvalu: 'fi fi-tv',
        Uganda: 'fi fi-ug',
        Ukraine: 'fi fi-ua',
        'United Arab Emirates': 'fi fi-ae',
        'United Kingdom': 'fi fi-gb',
        'United States': 'fi fi-us',
        Uruguay: 'fi fi-uy',
        Uzbekistan: 'fi fi-uz',
        Vanuatu: 'fi fi-vu',
        'Vatican City': 'fi fi-va',
        Venezuela: 'fi fi-ve',
        Vietnam: 'fi fi-vn',
        Yemen: 'fi fi-ye',
        Zambia: 'fi fi-zm',
        Zimbabwe: 'fi fi-zw'
      }
      return countryCodes[country] || 'fi' // Default class if country code not found
    }
  }
}
</script>
<style scoped>
.info-card .stats-container {
  background-image: url('@/assets/trees.jpeg'); /* Replace with the path to your image, for example trees.jpeg in assets will be /assets/trees.jpeg */
  background-size: cover; /* This will ensure that your image covers the entire div */
  background-position: center; /* This will center your image in the div */
  border-radius: 0.5rem; /* This keeps the rounded corners */
  padding: 1rem; /* Adjust padding to ensure the content is spaced nicely */
  text-align: center; /* Center the text horizontally */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow for depth */
}

.info-card2 .stats-container {
  background-image: url('@/assets/images.jpeg'); /* Replace with the path to your image, for example trees.jpeg in assets will be /assets/trees.jpeg */
  background-size: cover; /* This will ensure that your image covers the entire div */
  background-position: center; /* This will center your image in the div */
  border-radius: 0.5rem; /* This keeps the rounded corners */
  padding: 1rem; /* Adjust padding to ensure the content is spaced nicely */
  text-align: center; /* Center the text horizontally */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Optional: Adds a subtle shadow for depth */
}

/* .fi {
  width: 32px;
  height: 24px; 
} */
/* Assuming .fi is your flag class */
.country-item {
  display: flex;
  align-items: center;
  margin-bottom: 2rem; /* Increase the bottom margin for more space between rows */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Increase the gap for the grid layout */
.grid.grid-cols-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem; /* Adjust the gap to increase space between rows and columns */
}

/* Fixed size for flags */
.fi {
  width: 32px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

/* Styles for the country name */
.country-name {
  margin-left: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<!-- United States - US
Canada - CA
United Kingdom - GB
Germany - DE
France - FR
Italy - IT
Spain - ES
Australia - AU
Japan - JP
China - CN
India - IN
Brazil - BR
Russia - RU
South Africa - ZA
Mexico - MX
Argentina - AR
Saudi Arabia - SA
United Arab Emirates - AE
South Korea - KR
Turkey - TR 
Norway: NO
Sweden: SE
Canada: CA 
F8F8F8 - gray-100
-->
