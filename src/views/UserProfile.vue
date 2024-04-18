<template>
  <div class="NavBarImage">
    <NavBar />
  </div>
  <!-- <div class="flex justify-center">
    <div class="bg-gray-800 w-10 h-10 rounded-full">afsf</div>
  </div> -->
  <div>
    <div className='mt-20 flex flex-col items-center mb-16'>
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
        <span className='text-[#3F3D3D]'>{{ this.nameVal }}</span>
      </div>
      <div className='w-9/12 mt-10'>
        <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Email</h1>
        <h3 className='bg-gray-200 rounded py-4 px-2 text-xl text-[#3F3D3D]'>{{ this.email }}</h3>
      </div>
      <div className="flex mt-10 w-9/12">
        <div className="w-full">
          <div className='mb-10 mr-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Age range</h1>
            <h3 className='bg-gray-200 text-[#3F3D3D] rounded py-4 px-2 text-xl'>{{ this.ageRangeVal }}</h3>
          </div>
          <div className='mb-10 mr-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Gender</h1>
            <h3 className='bg-gray-200 text-black rounded py-4 px-2 text-xl'>{{ this.genderVal }}</h3>
          </div>
          <div className='mb-10 mr-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Travel frequency</h1>
            <h3 className='bg-gray-200 text-black rounded py-4 px-2 text-xl'>{{ this.travelFreqVal }}</h3>
          </div>
          <div className='mb-10 mr-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Travel companions</h1>
            <h3 className='bg-gray-200 text-black rounded py-4 px-2 text-xl'>{{ this.travelCompVal }}</h3>
          </div>
        </div>
        <div className="w-full">
          <div className='mb-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Steps walked</h1>
            <h3 className='bg-gray-200 text-[#3F3D3D] rounded py-4 px-2 text-xl'>1234</h3>
          </div>
          <div className='mb-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Number of countries travelled</h1>
            <h3 className='bg-gray-200 text-black rounded py-4 px-2 text-xl'>3/195</h3>
          </div>
          <div className='mb-10'>
            <h1 className='text-3xl mb-2 text-[#3F3D3D]'>Account status</h1>
            <h3 className='bg-gray-200 rounded py-4 px-2 text-xl text-[#3F3D3D]'>{{ this.isPublicVal }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  <GlobalFooter />
</template>

<script lang="ts">
import NavBar from '../components/NavBar.vue'
import GlobalFooter from '@/components/GlobalFooter.vue';
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
      email: "",
      age_range: "",
      gender: "",
      travel_freq: "",
      travel_comp: "",
      is_public: "",
    }
  },
  created() {
    const auth = getAuth()
    const user = auth.currentUser
    this.fetchAndRenderImage(user)
    this.fetchDetails(user)
  },
  computed: {
    ageRangeVal: function() {
      const ageRangeValDict = {
        "below25": "< 25",
        "25to39": "25 - 39",
        "40to60": "40 - 60",
        "above60": "> 60",
      }
      return ageRangeValDict[this.age_range] || "Not specified"
    },
    genderVal: function() {
      const genderValDict = {
        "male": "Male",
        "female": "Female",
        "others": "Not specified",
      }
      return genderValDict[this.gender] || "Not specified"
    },
    travelFreqVal: function() {
      const travelFreqValDict = {
        "lessThanOnce": "< 1 time a year",
        "oneToTwo": "1 - 2 times a year",
        "threeToFive": "3 - 5 times a year",
        "moreThanFive": "> 5 times a year",
      }
      return travelFreqValDict[this.travel_freq] || "Not specified"
    },
    travelCompVal: function() {
      const travelCompValDict = {
        "solo": "Solo",
        "family": "Famliy",
        "friends": "Friends"
      }
      return travelCompValDict[this.travel_comp] || "Not specified"
    },
    isPublicVal: function() {
      return this.is_public ? "Public" : "Private"
    },
    nameVal: function() { return this.name || "User" }
  },
  components: {
    NavBar,
    GlobalFooter,
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
    async fetchDetails(user) {
      const docRef = doc(db, 'users', user!.email!)
      const userData = await getDoc(docRef);
      if ("Name" in userData.data()) {
        this.name = userData.data()["Name"]
      }
      if ("Age_Range" in userData.data()) {
        this.age_range = userData.data()["Age_Range"]
      } 
      if ("Gender" in userData.data()) {
        this.gender = userData.data()["Gender"]
      } 
      if ("Travel_Freq" in userData.data()) {
        this.travel_freq = userData.data()["Travel_Freq"]
      } 
      if ("Travel_Comp" in userData.data()) {
        this.travel_comp = userData.data()["Travel_Comp"]
      } 
      this.is_public = userData.data()["Is_Public"]
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