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
  <div className="LandingPage">
    <div className="backgroundcontainer object-cover block bg-center w-screen h-screen">
      <div className="pic " id="pic3" />
      <div className="pic " id="pic2" />
      <div className="pic " id="pic1" />
    </div>

    <div className="Rectangle w-full h-full left-0 top-0 absolute bg-black bg-opacity-30" />

    <div className="container ml-20 pl-16 block">
      <img
        className="Logo w-32 h-32 left-[73px] top-[376px] absolute shadow"
        src="@/assets/logo.svg"
      />
      <div
        className="TravelPal w-96 h-48 left-[227px] top-[376px] absolute text-white text-9xl font-semibold font-['Poppins']"
      >
        TravelPal
      </div>
      <div className="Slogan h-20 left-[73px] top-[525px] absolute">
        <span className="SloganFirst text-white text-5xl font-semibold font-['Poppins']"
          >Journey Together,
        </span>
        <span className="SloganSecond text-yellow-600 text-5xl font-semibold font-['Poppins']"
          >Share Forever</span
        >
      </div>
      <div>
        <button
          @click="showModal = true"
          className="LoginButton w-60 h-16 left-[73px] top-[612px] absolute bg-yellow-600 hover:bg-yellow-600 rounded-full shadow text-white text-xl text-center hover:translate-x-1 hover:transition-transform hover:-translate-y-1 hover:shadow-xl font-semibold font-['Poppins']"
        >
          Start Traveling
        </button>
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
