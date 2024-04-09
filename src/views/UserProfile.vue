<template>
  <div class="NavBarImage">
    <NavBar />
  </div>
  <!-- <div class="flex justify-center">
    <div class="bg-gray-800 w-10 h-10 rounded-full">afsf</div>
  </div> -->
  <div>
    <div className='mt-20 flex flex-col items-center mb-16'>
      <!-- <div className="relative before:content-[attr(data-tip)] before:px-3 before:py-2 before:left-1/2 before:-top-3 before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full before:bg-gray-700 before:text-white before:rounded-md before:opacity-0 before:transition-all after:absolute after:left-1/2 after:-top-3 after:-translate-x-1/2 after:border-8 after:border-t-gray-700 after:border-l-transparent after:border-b-transparent after:border-r-transparent after:opacity-0 after:transition-all hover:before:opacity-100 hover:after:opacity-100" data-tip="Change your profile picture!">
        <div className="relative w-32 h-32 overflow-hidden bg-gray-500 hover:bg-gray-400 rounded-full dark:bg-gray-600 cursor-pointer">
          <img src="../assets/DefaultAvatar.png" alt="Default Avatar" class="w-[20vh] h-[20vh]">
        </div>
      </div> -->
      <div class="mb-3 text-center flex justify-center w-fit relative tooltip">
        <span class="tooltiptext">Change your profile photo!</span>
        <!-- Hidden file input to trigger file selection -->
        <input type="file" id="photo-input" accept=".jpg, .jpeg, .png" class="hidden" multiple @change="handleFileChange">
        
        <!-- Label for the file input, shows the camera icon if no photo selected -->
        <label
            for="photo-input"
            class="relative h-32 w-32 flex items-center justify-center cursor-pointer rounded-lg"
          >
          <div v-if="selectedPhoto.length === 0" className="relative w-28 h-28 overflow-hidden bg-gray-500 hover:bg-gray-400 rounded-full cursor-pointer">
            <img src="../assets/DefaultAvatar.png" alt="Default Avatar" class="w-28 h-28">
          </div>
          <div class="flex items-center justify-center mx-[0vw] ">
            <div v-for="(photo, index) in selectedPhoto" :key="index">
              <img :src="photo" alt="Selected Photo" class="h-28 w-28 object-fit-cover cursor-pointer rounded-full" @click="openFileInput">
            </div>
              <div v-if="selectedPhoto.length === 0" class="flex flex-col items-center justify-center">
            </div>
          </div>
        </label>
      </div>
      <div className='flex items-center mt-3 text-5xl'>
        <span className='text-[#3F3D3D]'>{{ this.name }}</span>
      </div>
    </div>
    <div className="flex justify-center">
      <div className='mb-10 w-9/12'>
        <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Email</h1>
        <h3 className='bg-gray-200 rounded py-4 px-2 text-xl text-[#3F3D3D]'>{{ this.email }}</h3>
      </div>
    </div>
    <div className="flex justify-center">
      <div className='mb-10 w-9/12'>
        <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Steps walked</h1>
        <h3 className='bg-gray-200 text-[#3F3D3D] rounded py-4 px-2 text-xl'>1234</h3>
      </div>
    </div>
    <div className="flex justify-center">
      <div className='mb-10 w-9/12'>
        <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Number of countries travelled</h1>
        <h3 className='bg-gray-200 text-black rounded py-4 px-2 text-xl'>3/195</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from '../components/NavBar.vue'
import { firebaseApp, db } from '@/firebase'
import { doc, setDoc, collection, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
const $toast = useToast()

export default {
  data() {
    return {
      selectedPhoto: [],
      name: "",
      email: ""
    }
  },
  created() {
    const auth = getAuth()
    const user = auth.currentUser
    this.fetchAndRenderImage(user)
    this.fetchNameAndEmail(user)
  },
  components: {
    NavBar,
  },
  methods: {
    async fetchAndRenderImage(user) {
      const storage = getStorage(firebaseApp);
      const fileRef = ref(storage, `users/${user!.email}/profile_pic/profile_pic.jpg`);

      try {
        const fileUrl = await getDownloadURL(fileRef);
        this.selectedPhoto.push(fileUrl)
        console.log(fileUrl)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchNameAndEmail(user) {
      const docRef = doc(db, 'users', user!.email!)
      const userData = await getDoc(docRef);
      if ("Name" in userData.data()) {
        this.name = userData.data()["Name"]
      }
      this.email = user!.email!
    },
    handleFileChange(event) {
      const auth = getAuth()
      const user = auth.currentUser

      const files = event.target.files;
      this.selectedPhoto = []; // clear the array before adding new photos
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file && /\.(jpg|jpeg|png)$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = async (e) => {
            this.selectedPhoto.push(e.target.result); // push the result into the array
            await this.uploadImage(e.target.result, user!.email)
            $toast.success('Profile photo updated successfully!', {
              position: 'top'
            })
          };
          reader.readAsDataURL(file);
        } else {
          // Show error message
          alert('Please select a JPEG or PNG file.');
        }
      }
    },
    dataURLtoFile(dataURL, filename) {
      const arr = dataURL.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    async uploadImage(file_url, user_email) {
      const storage = getStorage(firebaseApp);
      const file = this.dataURLtoFile(file_url, `profile_pic.jpg`);
      const fileRef = ref(storage, `users/${user_email}/profile_pic/${file.name}`);
      const uploadTask = uploadBytesResumable(fileRef, file);
      await uploadTask;
    },
  }
}
</script>
  
  
<style scoped>
.NavBarImage {
  background-image: url('@/assets/forest.jpg');
  background-size: cover;
  background-position: center;
}

/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 240px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  bottom: 100%;
  left: 3%;
  margin-left: -60px; /* Use half of the width (120/2 = 60), to center the tooltip */
 
  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}

.tooltip .tooltiptext {
  opacity: 0;
  transition: opacity 0.4s;
}

.tooltip:hover .tooltiptext {
  opacity: 1;
}
</style>