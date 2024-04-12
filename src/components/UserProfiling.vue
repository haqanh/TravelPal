<template>
  <div class="flex justify-center items-center align-middle min-h-screen min-w-full font-poppins absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md">
    <div class="flex flex-col justify-between h-[600px] w-[600px] shadow-2xl rounded-3xl bg-white relative">
      <hr class="relative h-[1px] border-0 bg-gray-600 top-[6rem]" />
      <keep-alive>
        <transition name="fade" mode="out-in">
        <keep-alive>
        <component 
          :is="components[page]" 
          :name="name" @update-name="updateName" 
          @update-image="updateImage"
          @update-age-range="updateAgeRange"
          @update-gender="updateGender"
          @update-travel-freq="updateTravelFreq"
          @update-travel-companions="updateTravelCompanions"
          :usedTravelpalBefore="usedTravelpalBefore" @update-used-travelpal-before="updateUsedTravelpalBefore"
          :usedSimilarAppsBefore="usedSimilarAppsBefore" @update-used-similar-apps-before="updateUsedSimilarAppsBefore"
          :privateOrPublic="privateOrPublic" @update-private-or-public="updatePrivateOrPublic"
          :selectedCountries="selectedCountries" @toggle-country="toggleCountry"
          :selectedInterests="selectedInterests" @toggle-interest="toggleInterest"
        />
        </keep-alive>
        </transition>
      </keep-alive>
      <TheFooter @page-change="updatePage"/>
    </div>
  </div>
</template>

<script lang="ts">
import ProvideDemographic from './ProvideDemographic.vue';
import ProvideHabits from './ProvideHabits.vue';
import ProvideDestinations from './ProvideDestinations.vue';
import ProvideInterests from './ProvideInterests.vue';
import StateFamiliarityAndPrivacy from './StateFamiliarityAndPrivacy.vue';
import TheFooter from './TheFooter.vue';
import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { firebaseApp, db } from '@/firebase'
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export default {
  data() {
    return {
      page: 1,
      components: ["", "ProvideDemographic", "ProvideHabits", "ProvideDestinations", "ProvideInterests", "StateFamiliarityAndPrivacy"],
      name: "",
      image: "",
      ageRange: "",
      gender: "",
      travelFreq: "",
      travelCompanions: "",
      usedTravelpalBefore: "no",
      usedSimilarAppsBefore: "no",
      privateOrPublic: "private",
      selectedCountries: [],
      selectedInterests: [],
      auth: null,
    }
  },
  components: {
    ProvideDemographic,
    ProvideHabits,
    ProvideDestinations,
    ProvideInterests,
    StateFamiliarityAndPrivacy,
    TheFooter
  },
  methods: {
    async updatePage(page: number) {
      if (page === 6) {
        try {
          const auth = getAuth()
          const user = auth.currentUser
          await updateDoc(doc(db, 'users', user!.email!), {
            Name: this.name,
            Age_Range: this.ageRange,
            Gender: this.gender,
            Travel_Freq: this.travelFreq,
            Travel_Comp: this.travelCompanions,
            Used_Before: this.usedTravelpalBefore == "yes" ? true : false,
            Used_Similar: this.usedSimilarAppsBefore == "yes" ? true : false,
            Is_Public: this.privateOrPublic == "public" ? true : false,
            Bucket_List: this.selectedCountries,
            Interests: this.selectedInterests
          })
          if (this.image.length > 0) {
            this.uploadImage(this.image, user!.email)
          }
          console.log('User profile updated in Firebase')
        } catch (e) {
          console.error('Error updating document: ', e)
        }
        this.$router.push('dashboard')
      } else {
        this.slideRight = page > this.page ? true : false
        this.page = page
      }
    },
    updateName(name: string) {
      this.name = name
    },
    updateImage(image: string) {
      this.image = image
    },
    updateAgeRange(ageRange: string) {
      this.ageRange = ageRange
    },
    updateGender(gender: string) {
      this.gender = gender
    },
    updateTravelFreq(travelFreq: string) {
      this.travelFreq = travelFreq
    },
    updateTravelCompanions(travelCompanions: string) {
      this.travelCompanions = travelCompanions
    },
    updateUsedTravelpalBefore(usedTravelpalBefore: string) {
      this.usedTravelpalBefore = usedTravelpalBefore
    },
    updateUsedSimilarAppsBefore(usedSimilarAppsBefore: string) {
      this.usedSimilarAppsBefore = usedSimilarAppsBefore
    },
    updatePrivateOrPublic(privateOrPublic: string) {
      this.privateOrPublic = privateOrPublic
    },
    toggleCountry(country: string) {
      if (this.selectedCountries.includes(country)) {
        const index = this.selectedCountries.indexOf(country)
        this.selectedCountries.splice(index, 1)
      } else {
        if (this.selectedCountries.length <= 10) {
          this.selectedCountries.push(country)
        }
      }
    },
    toggleInterest(interest: string) {
      if (this.selectedInterests.includes(interest)) {
        const index = this.selectedInterests.indexOf(interest)
        this.selectedInterests.splice(index, 1)
      } else {
        this.selectedInterests.push(interest)
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>