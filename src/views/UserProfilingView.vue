<script lang="ts">
import { ref } from 'vue'
import EmptyDashboard from '@/components/EmptyDashboard.vue'
import UserProfiling from '@/components/UserProfiling.vue'

export default {
  components: {
    EmptyDashboard,
    UserProfiling
  },
}
</script>

<template>
  <EmptyDashboard />
  <UserProfiling />
</template>