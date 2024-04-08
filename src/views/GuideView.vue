<template>
  <div class="guide-layout mt-[40vh]">
    <div class="absolute inset-x-0 top-0 h-2/5">
      <img
        src="@/assets/sf1.jpeg"
        class="object-cover w-full h-full rounded-b-3xl"
        alt="San Francisco"
      />
      <div class="absolute inset-0 bg-gray-700 bg-opacity-50 rounded-b-3xl"></div>
      <div class="absolute bottom-0 left-0 w-full p-4 text-center">
        <!-- <h1 class="text-6xl font-bold text-white">{{ tripData.Name }}</h1>
      <p class="text-xl text-white mt-4">In {{ tripData.Location }}</p>
      <p class="mt-10 text-md text-white">Last Edit: {{ formatDate(tripData.Last_Edit) }}</p> -->
      </div>
    </div>
    <NavBar />
    <GuideNav
      :sections="sections"
      :activeSection="activeSection"
      class="guide-sidebar justify-center m-10"
    />
    <main id="guideContent" class="guide-content">
      <section id="generalAdvice" class="p-8">
        <!-- General Advice content goes here -->
        <h1 class="text-xl font-bold">General Advice</h1>
        <h1 class="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc nec odio ultricies
          ultricies. Nullam nec nunc nec odio ultricies ultricies. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed ac nunc nec odio ultricies ultricies. Nullam nec nunc nec
          odio ultricies ultricies. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
          nunc nec odio ultricies ultricies. Nullam nec nunc nec odio ultricies ultricies.
        </h1>
      </section>
      <section id="placesToVisit" class="p-8">
        <!-- Places to Visit content goes here -->
        <h1 class="text-xl font-bold">Places to Visit</h1>
        <GuideComponent />
        <GuideComponent />
      </section>
      <section id="placesToEat" class="p-8">
        <!-- Places to Eat content goes here -->
        <h1 class="text-xl font-bold">Places to Eat</h1>
        <GuideComponent />
        <GuideComponent />
      </section>
      <section id="placesToStay" class="p-8">
        <!-- Places to Eat content goes here -->
        <h1 class="text-xl font-bold">Places to Stay</h1>
        <GuideComponent />
        <GuideComponent />
      </section>
      <section id="nearbyPlaces" class="p-8">
        <!-- Places to Eat content goes here -->
        <h1 class="text-xl font-bold">Nearby Places</h1>
        <GuideComponent />
        <GuideComponent />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import GuideNav from '@/components/GuideNav.vue'
import GuideComponent from '@/components/GuideComponent.vue'

const sections = [
  { id: 'generalAdvice', name: '1. General Advice' },
  { id: 'placesToVisit', name: '2. Places to Visit' },
  { id: 'placesToEat', name: '3. Places to Eat' },
  { id: 'placesToStay', name: '4. Places to Stay' },
  { id: 'nearbyPlaces', name: '5. Nearby Places' }
]
const activeSection = ref(sections[0].id)

const handleScroll = () => {
  let currentSection = sections[0].id;
  let minOffset = Number.POSITIVE_INFINITY;

  sections.forEach((section) => {
    const element = document.getElementById(section.id);
    if (element) {
      const rect = element.getBoundingClientRect();
      const offset = 0;
      const top = rect.top + offset;

      if (top >= 0 && top < minOffset) {
        currentSection = section.id;
        minOffset = top;
      }
    }
  });

  activeSection.value = currentSection;
};

// Update scroll event listener to listen for scrolling on the window
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
.guide-layout {
  display: flex;
  height: 100vh; /* Viewport height */
}

.guide-sidebar {
  width: 250px; /* Width of the sidebar */
  flex-shrink: 0; /* Prevents the sidebar from shrinking */
  overflow-y: auto; /* Allows scrolling on the sidebar */
  position: sticky;
  top: 0;
  height: calc(100vh - 40vh); /* Height of viewport minus the image height */
}


.guide-content {
  flex-grow: 1; /* Allows the content area to take up the remaining space */
  padding: 20px;
}


/* Add additional global and responsive styles as needed */

/* Style adjustments for smaller screens */
@media (max-width: 768px) {
  .guide-layout {
    flex-direction: column;
  }

  .guide-sidebar {
    width: 100%;
    height: auto;
  }

  .guide-content {
    padding: 10px;
  }
}
</style>