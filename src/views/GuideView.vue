<template>
    <div class="guide-layout">
      <GuideNav :sections="sections" :activeSection="activeSection" class="guide-sidebar justify-center m-10"/>
      <main id="guideContent" class="guide-content">
        <section id="generalAdvice" class="p-8">
          <!-- General Advice content goes here -->
          <h1 class="text-xl font-bold">
            General Advice
          </h1>
          <h1 class="text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc nec odio ultricies ultricies. Nullam nec 
            nunc nec odio ultricies ultricies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc nec odio ultricies ultricies. Nullam nec 
            nunc nec odio ultricies ultricies.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac nunc nec odio ultricies ultricies. Nullam nec 
            nunc nec odio ultricies ultricies.
          </h1>
        </section>
        <section id="placesToVisit" class="p-8">
          <!-- Places to Visit content goes here -->
          <h1 class="text-xl font-bold">
            Places to Visit
          </h1>
          <GuideComponent />
          <GuideComponent />
        </section>
        <section id="placesToEat" class="p-8">
          <!-- Places to Eat content goes here -->
          <h1 class="text-xl font-bold">
            Places to Eat
          </h1>
          <GuideComponent />
          <GuideComponent />
        </section>
        <section id="placesToStay" class="p-8">
          <!-- Places to Eat content goes here -->
          <h1 class="text-xl font-bold">
            Places to Stay
          </h1>
          <GuideComponent />
          <GuideComponent />
        </section>
        <section id="nearbyPlaces" class="p-8">
          <!-- Places to Eat content goes here -->
          <h1 class="text-xl font-bold">
            Nearby Places
          </h1>
          <GuideComponent />
          <GuideComponent />
        </section>
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  import GuideNav from '@/components/GuideNav.vue';
  import GuideComponent from '@/components/GuideComponent.vue';
  
  const sections = [
    { id: 'generalAdvice', name: '1. General Advice' },
    { id: 'placesToVisit', name: '2. Places to Visit' },
    { id: 'placesToEat', name: '3. Places to Eat' },
    { id: 'placesToStay', name: '4. Places to Stay'},
    { id: 'nearbyPlaces', name: '5. Nearby Places'}
  ];
  const activeSection = ref(sections[0].id);

  const handleScroll = () => {
    //console.log('Scrolling...');
    let currentSection = sections[0].id;
    let minOffset = Number.POSITIVE_INFINITY;
    

    sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
        const rect = element.getBoundingClientRect();
        // Use an offset value like header height if needed
        const offset = 0; 
        const top = rect.top + offset;

        if (top >= 0 && top < minOffset) {
            currentSection = section.id;
            minOffset = top;
        }
    }
  });

  //console.log(currentSection); // Add this line to debug
  activeSection.value = currentSection;
};

onMounted(() => {
  //console.log('Component mounted, adding scroll listener');
  guideContent.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  //console.log('Component unmounted, removing scroll listener');
  guideContent.removeEventListener('scroll', handleScroll);
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
  }
  
  .guide-content {
    flex-grow: 1; /* Allows the content area to take up the remaining space */
    overflow-y: auto; /* Allows scrolling on the content area */
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