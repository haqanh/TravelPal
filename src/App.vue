<template>
  <div class="flex justify-center items-center align-middle min-h-screen min-w-full font-poppins">
    <div class="flex flex-col justify-between h-[600px] max-w-[600px] shadow-2xl rounded-3xl">
      <keep-alive>
        <component :is="components[page]"/>
      </keep-alive>
      <TheFooter @page-change="updatePage"/>
    </div>
  </div>
</template>

<script lang="ts">
import ProvideDemographic from './components/ProvideDemographic.vue';
import ProvideHabits from './components/ProvideHabits.vue';
import ProvideDestinations from './components/ProvideDestinations.vue';
import ProvideInterests from './components/ProvideInterests.vue';
import StateFamiliarityAndPrivacy from './components/StateFamiliarityAndPrivacy.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  data() {
    return {
      page: 1,
      components: ["", "ProvideDemographic", "ProvideHabits", "ProvideDestinations", "ProvideInterests", "StateFamiliarityAndPrivacy"]
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
    }
  }
}
</script>

