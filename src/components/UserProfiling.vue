<template>
  <div class="flex justify-center items-center align-middle min-h-screen min-w-full font-poppins absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md">
    <div class="flex flex-col justify-between h-[600px] max-w-[600px] shadow-2xl rounded-3xl bg-white">
      <keep-alive>
        <component 
          :is="components[page]" 
          :name="name" @update-name="updateName" 
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
      <TheFooter @page-change="updatePage"/>
    </div>
  </div>
  <div>
    {{ name }}
    <br/>
    {{ ageRange }}
    <br/>
    {{ gender }}
    <br/>
    {{ travelFreq }}
    <br/>
    {{ travelCompanions }}
    <br/>
    {{ usedTravelpalBefore }}
    <br/>
    {{ usedSimilarAppsBefore }}
    <br/>
    {{ privateOrPublic }}
    <br/>
    {{ selectedCountries }}
    <br/>
    {{ selectedInterests }}
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
const $toast = useToast()

export default {
  data() {
    return {
      page: 1,
      components: ["", "ProvideDemographic", "ProvideHabits", "ProvideDestinations", "ProvideInterests", "StateFamiliarityAndPrivacy"],
      name: "",
      ageRange: "",
      gender: "",
      travelFreq: "",
      travelCompanions: "",
      usedTravelpalBefore: "no",
      usedSimilarAppsBefore: "no",
      privateOrPublic: "private",
      selectedCountries: [""],
      selectedInterests: [""],
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
    updatePage(page: number) {
      this.page = page
    },
    updateName(name: string) {
      this.name = name
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
        if (this.selectedCountries.length > 10) {
          $toast.error('Maximum 10 countries!', {
            position: 'top'
          })
        } else{
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
    }
  }
}
</script>