<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="relative max-w-[200px] h-[240px] bg-white border border-gray-200 rounded-[20px] shadow shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-[20px] h-[180px] w-[200px] shadow-l object-cover object-bottom" src="../assets/Trip Image.jpg" alt="" />
            <div class="absolute top-0 right-0 mt-2 mr-2 flex items-center">
                <img class="h-3 w-3 relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-1 font-medium text-sky-50 text-[10px] text-white">Taranaki, New Zealand</span>
            </div>
            <div class="p-2">
                <div class="flex justify-between items-center">
                    <p class="mb-[1px] text-[18px] font-semibold tracking-tight text-[#3F3D3D] dark:text-white">Alpine Ascents</p>
                    <div class="flex items-center flex-shrink-0 space-x-0">
                        <img class="mb-2 mr-2 h-[5px] w-[5px]" src="../assets/Dot Split.svg" alt="" />
                        <img class="mb-2 h-4" src="../assets/Union.svg" alt="" />
                        <img class="mb-2 h-4" src="../assets/Union.svg" alt="" />
                        <img class="mb-2 h-4" src="../assets/Union.svg" alt="" />
                    </div>
                </div>
                <p class="pb-1 text-[10px] font-medium text-[#3F3D3D] text-opacity-60">Sep 2 ‘20 - Sep 28 ‘20</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.object-bottom {
    object-position: bottom;
}
</style>