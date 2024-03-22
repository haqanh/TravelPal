<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="relative max-w-[200px] h-[245px] bg-white border border-gray-200 rounded-[20px] custom-shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-[20px] h-[180px] w-[200px] custom-shadow object-cover object-bottom" src="../assets/Marbella.jpg" alt="" />
            <div class="absolute top-0 right-0 mt-2 mr-2 flex items-center">
                <img class="h-3 w-3 relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-1 font-medium text-sky-50 text-[10px] text-[#E1F1FF]">Marbella, Spain</span>
            </div>
            <div class="p-2">
                <div class="flex justify-between items-center">
                    <p class="mb-[1px] text-[18px] font-semibold tracking-tight text-[#3F3D3D] dark:text-white">Marbella</p>
                    <div class="flex items-center flex-shrink-0 space-x-0">
                        <img class="mb-2 mr-2 h-[5px] w-[5px]" src="../assets/Dot Split.svg" alt="" />
                        <img class="mb-2 h-4" src="../assets/Union.svg" alt="" />
                        <img class="mb-2 h-4" src="../assets/Union.svg" alt="" />
                        <img class="mb-2 h-4" src="../assets/Union.svg" alt="" />
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <p class="pt-1 text-[10px] font-medium text-[#3F3D3D] text-opacity-60">Aug 27 ‘19 - Sep 12 ‘19</p>
                    <span class="px-2 font-semibold text-center text-[10px] rounded-full guide-colour border undefined ">
                        Guide
                    </span>
                </div>
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

.guide-colour {
    color: rgba(215, 135, 15, 0.75);
    border-color: rgba(215, 135, 15, 0.75);
}
</style>