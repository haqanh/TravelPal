<script setup>
import { ref } from 'vue'
import AddGuide1 from './AddGuide1.vue'

const isOpen = ref(false)

function openModal() {
    isOpen.value = true
}
</script>


<template>
    <div class="addBtn_position">
        <button type="button" @click="openModal" class="addBtn_style">
            Add Guide
        </button>
    </div>

    <AddGuide1 :isOpened="isOpen" />

</template>

<style>
.addBtn_position {
    @apply fixed inset-0 flex items-center justify-center;
}

.addBtn_style {
    @apply rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75;
}
</style>