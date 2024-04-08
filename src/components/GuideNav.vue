<template>
  <div> 
    <span class="flex items-center"> 
      <img src="@/assets/profiles/ProfileWoman.jpg" alt="Profile Picture" class="w-14 h-14 rounded-full object-cover" />
      <h1 class="username ml-4 font-bold text-lg xl:text-xl"> Mary Jane </h1>
    </span>
  </div>
  <nav class="guide-nav flex flex-col mt-5">
    <span class="flex justify-left mt-15 mb-5"> 
    <img src="@/assets/heart-icon.svg" alt="Heart Icon" class="w-6 h-6 mx-3" />
    <img src="@/assets/share-icon.svg" alt="Share Icon" class="w-6 h-6 mx-3" />
    <img src="@/assets/comment-icon.svg" alt="Comment Icon" class="w-6 h-6 mx-3" />
    </span>
    <ul class=" bg-gray-300 list-none rounded-2xl shadow-lg text-justify font-bold p-5">
      <h2 class=" text-gray-900 font-bold lg:text-2xl md:text-xl text-lg text-center"> Guide Contents </h2>
      <li v-for="section in sections" 
          :key="section" 
          class="text-center lg:my-3 md:my-2 my-1 lg:text-base md:text-md text-sm"
          :class="activeSection === section.id ? 'bg-blue-500 text-white rounded-full' : 'text-gray-700 rounded-2xl hover:bg-gray-200'">
        <a
          :href="`#${section.id}`"
          :class="{ 'is-active': activeSection === section.id }"
          class=" block lg:py-1 py-0.5 items-center transition-colors duration-150 ease-in-out"
          @click.prevent="scrollToSection(section.id)"
        >{{ section.name }}</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">

//import heartIcon from '@/assets/heart-icon.svg';
//import shareIcon from '@/assets/share-icon.svg';
//import commentIcon from '@/assets/comment-icon.svg';

const props = defineProps({
  sections: Array,
  activeSection: String
});

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

