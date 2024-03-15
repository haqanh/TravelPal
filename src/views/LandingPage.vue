<script lang="ts">
import { ref, computed } from 'vue';
import AuthenticationModal from '@/components/AuthenticationModal.vue';

export default {
  components: {
    AuthenticationModal
  },
  setup() {
    const showModal = ref(false);

    const images = [
      'https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1450149632596-3ef25a62011a?q=80&w=2862&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    ];

    const currentImageIndex = ref(0);

    setInterval(() => {
      currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
    }, 5000); // Change image every 5 seconds

    const currentImage = computed(() => images[currentImageIndex.value]);

    return { currentImage, showModal};
  }
};
</script>

<template>
<div className="LandingPage">
  <transition name="fade" mode="out-in">
    <img :key="currentImage" class="Background object-cover block bg-center w-screen h-screen opacity-100 fade-in-transition" :src="currentImage" />
  </transition>
  <div className="Rectangle w-full h-full left-0 top-0 absolute bg-black bg-opacity-25" />
  <div className="container ml-20 pl-16 block">  
    <img className="Logo w-32 h-32 left-[73px] top-[376px] absolute shadow" src='@/assets/logo.svg'/>
    <div className="TravelPal w-96 h-48 left-[227px] top-[376px] absolute text-white text-9xl font-semibold font-['Poppins']">TravelPal</div>
    <div className="Slogan h-20 left-[73px] top-[525px] absolute">
      <span className="text-white text-5xl font-semibold font-['Poppins']">Journey Together, </span><span className="text-yellow-600 text-5xl font-semibold font-['Poppins']">Share Forever </span>
    </div>
    <div>
    <button @click="showModal = true" className="LoginButton w-60 h-16 left-[73px] top-[612px] absolute bg-yellow-600 hover:bg-yellow-600 rounded-full shadow text-white text-xl text-center hover:translate-x-1 hover:transition-transform hover:-translate-y-1 hover:shadow-xl font-semibold font-['Poppins']"> Start Traveling </button>
    </div>
    <AuthenticationModal :open="showModal" @close="showModal = false" />

  </div>
  

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

.TravelPal{
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  opacity: 1;
}
</style>