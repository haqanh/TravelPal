<script lang="ts">
import { ref } from 'vue'
import AuthenticationModal from '@/components/AuthenticationModal.vue'

export default {
  components: {
    AuthenticationModal
  },
  setup() {
    const showModal = ref(false)
    return { showModal }
  }
}
</script>

<template>
  <div class="relative w-screen h-screen">
    <!-- Background Container -->
    <div class="absolute inset-0">
      <!-- Background Images -->
      <div class="pic absolute w-full h-full bg-cover bg-center" id="pic3" />
      <div class="pic absolute w-full h-full bg-cover bg-center" id="pic2" />
      <div class="pic absolute w-full h-full bg-cover bg-center" id="pic1" />
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-30"></div>
    </div>

    <!-- Content Container -->
    <div class="flex flex-col justify-center items-start h-full px-5 md:px-20 lg:pl-32 space-y-8">
      <!-- Logo and Title Container -->
    <div class="flex items-center space-x-4 lg:space-x-8">
      <!-- Logo -->
      <img
        class="Logo w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 shadow"
        src="@/assets/logo.svg"
        alt="TravelPal logo"
      />
      <!-- Title -->
      <h1 class="TravelPal text-5xl md:text-7xl lg:text-9xl sm:text-3xl xs:text-xl font-semibold text-white">
        TravelPal
      </h1>
    </div>
      <!-- Slogan -->
      <div class="Slogan space-y-2">
        <span class="SloganFirst text-white text-3xl md:text-4xl lg:text-5xl sm:text-2xl xs:text-xl font-semibold">
          Journey Together,
        </span>
        <span class="SloganSecond text-yellow-600 text-3xl md:text-4xl lg:text-5xl sm:text-2xl xs:text-xl font-semibold">
          Share Forever
        </span>
      </div>
      <!-- Button -->
      <button
        @click="showModal = true"
        class="LoginButton bg-yellow-600 hover:bg-yellow-700 text-white text-lg md:text-xl lg:text-2xl sm:text-base xs:text-sm text- font-semibold rounded-full px-10 py-3 hover:shadow-xl transition transform hover:-translate-y-1 hover:translate-x-1"
      >
        Start Traveling
      </button>
    </div>

    <!-- Authentication Modal -->
    <AuthenticationModal :open="showModal" @close="showModal = false" />
  </div>
</template>

<style scoped>
@keyframes slideIn {
  0% {
    transform: translateY(120px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideInSlogan {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes grow {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.TravelPal {
  opacity: 0;
  animation: slideIn 1.25s ease-in-out 1 forwards;
  animation-delay: 0.2s;
}

.Logo {
  opacity: 0;
  animation: slideIn 1.25s ease-in-out 1 forwards;
  animation-delay: 0.2s;
}

.Slogan {
  opacity: 0;
  animation: slideInSlogan 1s ease-in-out 1 forwards;
  animation-delay: 1.5s;
}

.LoginButton {
  opacity: 0;
  animation: grow 1.5s ease-in-out 1 forwards;
  animation-delay: 2.5s;
}

.pic {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  -webkit-animation: fade 24s infinite;
  animation: fade 24s infinite;
}
#pic1 {
  animation-delay: 0s;
  background-image: url('@/assets/background_plane.jpg');
}
#pic2 {
  background-image: url('@/assets/background_cave.jpeg');
  animation-delay: 8s;
}
#pic3 {
  background-image: url('@/assets/background_bridge.jpeg');
  animation-delay: 16s;
}
@-webkit-keyframes fade {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  34% {
    opacity: 0;
  }
  88% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fade {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 1;
  }
  34% {
    opacity: 0;
  }
  88% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
