<template>

    <div class="flex items-center">
        <div class="guide-card relative 2xl:w-64 2xl:h-64 lg:w-42 lg:h-42 bg-white border border-gray-200 rounded-2xl custom-shadow">
            <img class="rounded-t-2xl 2xl:h-48 2xl:w-64 lg:w-42 lg:h-35  custom-shadow object-cover object-bottom" :src="GuideImage" alt="" />
            <div class="absolute top-0 right-0 mt-2 mr-2 flex items-center">
                <img class="h-3 w-3 relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-1 font-medium text-sky-50 text-xs text-[#E1F1FF]">{{Location}}</span>

            </div>
            <div class="p-2">
                <div class="flex justify-between items-center">
                    <p class="mb-0.2 text-m font-semibold tracking-tight text-[#3F3D3D]">{{GuideName}}</p>
                </div>
                <div class="flex pt-0.2 justify-end items-right">
                    <span class="px-1 font-semibold text-center text-xs rounded-full guide-colour border undefined ">
                        Guide
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        GuideName: {
            type: String,
            default: 'Guide Name'
        },
        Location: {
            type: String,
            default: 'Location'
        },
        guide: {
            type: Object,
            required: true
        },
        GuideImage: {
            type: String,
            default: ''
        
        },
    },
    computed: {
        formattedDate() {
            return this.formatDateRange(this.GuideStartDate, this.GuideEndDate)
        },
    }
}
</script>

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

.guide-card {
    box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.19),
    0 6px 6px rgba(0, 0, 0, 0.23); 
    transition: transform 0.3s ease-in-out; 
}

.guide-card:hover {
  transform: scale(1.05); /* Slightly larger on hover for a popping effect */
}

.guide-card img {
    aspect-ratio: 4/3;
}
</style>

