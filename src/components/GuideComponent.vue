<template>
    <div class="places-to-visit" v-if="placeLoaded">
      <div class="info">
        <div className="placeInfo flex align-baseline mb-0.5 items-center"> 
            <img src="@/assets/map-marker.svg" alt="Map Pin" class="w-7 h-7 mr-4">
            <h2 class="title font-bold">{{ place.Name }}</h2>
            <div class="price font-bold text-xl">{{ priceSymbol }}</div>
        </div>
        <div class="tags">
          <span class="tag" v-for="tag in place.Tags" :key="tag">{{ tag }}</span>
        </div>
        
        <p class="description max-w-3xl">
          {{ place.Descripton }}
        </p>
      </div>
      <div class="image mr-12">
        <img :src="place.imageUrl" :alt="place.Name">
      </div>
      <div class="map" v-if="place.Location">
        <MapDisplay :latitude="place.Location.latitude" :longitude="place.Location.longitude" :description="place.Name" />
      </div>
    </div>
    <p v-else>Loading place...</p>
  </template>
  
  <script>
  // Import the Firebase utilities you need, assuming you're using Firebase v9 or later
  import { doc, getDoc } from 'firebase/firestore';
  import { db } from '@/firebase'
  import MapDisplay from '../components/MapDisplay.vue'
  
  export default {
    name: 'PlacesToVisit',
    data() {
      return {
        place: null,
        placeLoaded: false,
        longitude: null,
        latitude: null,
      };
    },
    computed: {
      priceSymbol() {
        return '$'.repeat(this.place.Price || 0);
      }
    },
    async created() {
      await this.fetchPlaceData();
    },
    methods: {
      async fetchPlaceData() {
        const docRef = doc(db, 'places', 'Alquiler veleros Marbella');
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          this.place = docSnap.data();
          // Assuming that the 'Location' field is a GeoPoint
          this.placeLoaded = true; // Set the loading state to true
        } else {
          console.log("No such document!");
        }
      }
    },
    components: {
      MapDisplay
    }
  };
  </script>
  
  <style scoped>
    .places-to-visit {
    display: flex;
    align-items: center; /* Ensure the children align vertically in the middle */
    justify-content: space-between; /* Spacing out the main axis */
    padding: 1rem; /* Add padding around the entire container */
    }

    .info {
    padding-right: 1rem; /* Add more padding between the text and the image */
    }
  .title {
    font-size: 1.5rem;
    color: #333;
    margin-right: 1.5rem;
  }
  .tags {
    margin: 0.5rem 0;
  }
  .tag {
    background-color: #eee;
    padding: 0.25rem 0.5rem;
    margin-right: 0.5rem;
    border-radius: 0.25rem;
    display: inline-block;
  }
  .description {
    font-size: 1rem;
    color: #666;
  }
  .image img {
    max-width: 200px;
    height: auto;
    align-items: center; /* This will align the image vertically */
    justify-content: center; /* This will align the image horizontally */
    border-radius: 0.5rem;
  }

  </style>
  