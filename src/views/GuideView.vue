<template>
      <div class="inset-x-0 top-0 h-2/5 absolute">
      <img
        :src= photo
        class="object-cover w-full h-full shadow-md rounded-b-3xl"
        alt="cover photo"
      />
      <div class="absolute inset-0 bg-gray-700 bg-opacity-50 rounded-b-3xl"></div>
      <div class="absolute bottom-0 left-0 w-full p-4 text-center">
        <h1 class="text-6xl font-bold text-white"> {{ title }} </h1>
        <p class="text-xl text-white my-1 2xl:my-4"> Country: {{ country }} </p>
      </div>
    </div>

  
  <NavBar />


  <div class="flex flex-grow ">
      <!-- Guide Contents sidebar -->
      <div class="guide-sidebar w-1/5 p-9 sticky top-0 h-1/3 z-20 mt-[32vh]">
        <GuideNav :createdBy="createdBy" :profilePicUrl="profilePhoto" :sections="sections" :activeSection="activeSection" class="h-screen overflow-y-auto sticky top-0 bottom-0"/>
      </div>
      <main id="guideContent" class="guide-content mt-[35vh] overflow-auto px-10 w-3/4 ">
        <h1 class="text-base 2xl:text-lg italic font-light text-justify py-2 2xl:py-4">
        " {{ overview }} "
        </h1>
        <section id="generalAdvice" class="py-2 2xl:py-4">
          <!-- General Advice content goes here -->
          <h1 class="text-2xl 2xl:text-4xl font-bold">
            General Advice
          </h1>
          <h1 class="text-md 2xl:text-lg my-1 2xl:my-4 text-justify text-gray-600">
            <h1 v-for="advice in generalAdvice" :key="advice.id">
              {{ advice.content }}
            </h1>
          </h1>
        </section>
        <section id="placesToVisit" class="py-1 2xl:py-4">
          <!-- Places to Visit content goes here -->
          <h1 class="text-2xl 2xl:text-4xl font-bold">
            Places to Visit
          </h1>
          <GuideComponent
            v-for="place in placesToVisit"
            :key="place.id"
            :place="place"
          />
        </section>
        <section id="placesToEat" class="py-1 2xl:py-4">
          <!-- Places to Eat content goes here -->
          <h1 class="text-2xl 2xl:text-4xl font-bold">
            Places to Eat
          </h1>
          <GuideComponent
            v-for="place in placesToEat"
            :key="place.id"
            :place="place"
          />
        </section>
        <section id="placesToStay" class="py-1 2xl:py-4">
          <!-- Places to Stay content goes here -->
          <h1 class="text-2xl 2xl:text-4xl font-bold">
            Places to Stay
          </h1>
          <GuideComponent
            v-for="place in placesToStay"
            :key="place.id"
            :place="place"
          />
        </section>
        <section id="nearbyPlaces" class="py-1 2xl:py-4">
          <!-- Nearby Places content goes here -->
          <h1 class="text-2xl 2xl:text-4xl font-bold">
            Nearby Places
          </h1>
          <GuideComponent
            v-for="place in nearbyPlaces"
            :key="place.id"
            :place="place"
          />
        </section>
      </main>
    </div>
    
<GlobalFooter />
</template>
  
<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import GuideNav from '@/components/GuideNav.vue';
  import NavBar from '@/components/NavBar.vue';
  import GuideComponent from '@/components/GuideComponent.vue';
  import GlobalFooter from '@/components/GlobalFooter.vue';
  import { useRoute } from 'vue-router';
  import { db } from '@/firebase';
  import { doc, getDoc, getDocs, collection } from 'firebase/firestore';

  const route = useRoute();
  const guideData = ref(null);
  
  const sections = [
    { id: 'generalAdvice', name: '1. General Advice' },
    { id: 'placesToVisit', name: '2. Places to Visit' },
    { id: 'placesToEat', name: '3. Places to Eat' },
    { id: 'placesToStay', name: '4. Places to Stay'},
    { id: 'nearbyPlaces', name: '5. Nearby Places'}
  ];

  const title = ref('');
  const country = ref('');
  const photo = ref('');

  const createdBy = ref('');
  const profilePhoto = ref('');

  const overview = ref('');

  const generalAdvice = ref('');
  const placesToVisit = ref([]);
  const placesToEat = ref([]);
  const placesToStay = ref([]);
  const nearbyPlaces = ref([]);

  const activeSection = ref(sections[0].id);

  const handleScroll = () => {
    // Threshold to consider that the user is at the bottom of the page, e.g., 10 pixels from the bottom
    const bottomThreshold = 10;
    const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - bottomThreshold;

    if (scrolledToBottom) {
        // If the user is at the bottom, set the active section to the last section
        activeSection.value = sections[sections.length - 1].id;
    } else {
        let currentSection = sections[0].id;
        let minOffset = Number.POSITIVE_INFINITY;

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                const rect = element.getBoundingClientRect();
                // Use an offset value like header height if needed
                const offset = 0; 
                const top = rect.top + offset;
                const bottom = rect.bottom + offset;

                // Check if the element is visible enough to be considered as the active section
                // This condition checks if the element's top is within the viewport and also if a significant portion of it is visible
                if ((top >= 0 && top < minOffset) || (top < 0 && bottom > 0)) {
                    currentSection = section.id;
                    minOffset = Math.abs(top);  // Choosing the section that is closest to aligning to the top
                }
            }
        });

        activeSection.value = currentSection;
    }
};


onMounted(async () => {
  window.addEventListener('scroll', handleScroll);

  const docId = route.params.docRef;
  if (docId) {
    const docRef = await getDoc(doc(db, 'guides', docId)); // can change to places to test


    if (docRef.exists()) {
      guideData.value = docRef.data();

    
      title.value = guideData.value.Guide_Title;
      country.value = guideData.value.Country;
      photo.value = guideData.value.Cover_Photo;

      createdBy.value = guideData.value.Created_By;
      profilePhoto.value = guideData.value.Profile_Photo;

      overview.value = guideData.value.Description;

      const advicesCollectionRef = collection(docRef.ref, 'advices');
      const advicesSnapshot = await getDocs(advicesCollectionRef);
      
      generalAdvice.value = advicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const placesToVisitCollectionRef = collection(docRef.ref, 'placesToVisit');
      const placesToVisitSnapshot = await getDocs(placesToVisitCollectionRef);
      
      placesToVisit.value = placesToVisitSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const placesToEatCollectionRef = collection(docRef.ref, 'placesToEat');
      const placesToEatSnapshot = await getDocs(placesToEatCollectionRef);
      placesToEat.value = placesToEatSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const placesToStayCollectionRef = collection(docRef.ref, 'placesToStay');
      const placesToStaySnapshot = await getDocs(placesToStayCollectionRef);
      placesToStay.value = placesToStaySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const nearbyPlacesCollectionRef = collection(docRef.ref, 'placesNearby');
      const nearbyPlacesSnapshot = await getDocs(nearbyPlacesCollectionRef);
      nearbyPlaces.value = nearbyPlacesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

    } else {
      console.error('No such document!');
      // Handle the "not found" case
    }
  }
});

onUnmounted(() => {
  //console.log('Component unmounted, removing scroll listener');
  window.removeEventListener('scroll', handleScroll);

});
</script>
