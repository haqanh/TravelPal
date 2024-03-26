<template>
    <div class="flex items-center">
        <div class="trip-card relative w-[32.8vh] h-[33.4vh] bg-white border border-gray-200 rounded-[2.63vh] custom-shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-[2.63vh] h-[23.7vh] w-[32.8vh] custom-shadow object-cover object-bottom" src="../assets/Trip Image.jpg" alt="" />
            <div class="absolute top-0 right-0 mt-[1.05vh] mr-[1.05vh] flex items-center">
                <img class="h-[1.8vh] w-[1.8vh] relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-[0.53vh] font-medium text-sky-50 text-[1.8vh] text-[#E1F1FF]">Taranaki, New Zealand</span>
            </div>
            <div class="p-[1.05vh]">
                <div class="flex justify-between items-center">
                    <p class="mb-[0.13vh] text-[3vh] font-semibold tracking-tight text-[#3F3D3D] dark:text-white">Alpine Ascents</p>
                    <div class="flex items-center flex-shrink-0 space-x-0">
                        <img class="mb-[0.4vh] mr-[1.05vh] h-[1.1vh] w-[1.1vh]" src="../assets/Dot Split.svg" alt="" />
                        <img class="mb-[0.9vh] h-[2.8vh] " src="../assets/Union.svg" alt="" />
                        <img class="mb-[0.9vh] h-[2.8vh]" src="../assets/Union.svg" alt="" />
                        <img class="mb-[0.9vh] h-[2.8vh] " src="../assets/Union.svg" alt="" />
                    </div>
                </div>
                <p class="pt-[0.3vh] text-[1.6vh] font-medium text-[#3F3D3D] text-opacity-60">Sep 2 ‘20 - Sep 28 ‘20</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.object-bottom {
    object-position: bottom;
}

.custom-shadow {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.trip-card {
    box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23); 
    transition: transform 0.3s ease-in-out; 
}

.trip-card:hover {
  transform: scale(1.05); /* Slightly larger on hover for a popping effect */
}
</style>