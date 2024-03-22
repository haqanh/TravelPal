<template>
    <div class="absolute inset-x-0 top-0 h-2/5">
        <img src="@/assets/ExploreCrop.jpg" class="object-cover w-full h-full rounded-b-3xl" alt="Desert" />
        <div class="absolute inset-0 bg-opacity-50 rounded-b-3xl"></div>
    </div>
    <NavBar />
    <div class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 class="mb-2 text-5xl font-semibold text-white">Explore our guides...</h1>
        <div class="absolute top-3/5 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-center">
            <div class="relative mt-4">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <img src="../assets/MagnifyingGlass.svg" alt="search" class="w-5 h-5">
            </span>
            <input type="text" placeholder="Search..." class="pl-10 p-2 w-96 rounded-lg border border-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700">
            </div>
        </div>
    </div>

    <div class="mt-[35vh] bg-white text-left mx-auto max-w-7xl">
        
        <h2 class="ml-20 font-semibold mb-2 text-base">Editors' Choice</h2>
        <div class="flex justify-center space-x-12">
                <ExploreCard/>
                <ExploreCard/>
                <ExploreCard/>
                <ExploreCard/>

        </div>
        
        <h2 class="ml-20 font-semibold mb-2 mt-4">Regional Favourites</h2>
        <div class="flex justify-center space-x-12">
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
            <ExploreCard/>
        </div>
    </div>
</template>


<script>
import NavBar from '@/components/NavBar.vue'
import ExploreCard from '@/components/ExploreCard.vue';

export default {
    components: {
        NavBar,
        ExploreCard,
    }
}

</script>
