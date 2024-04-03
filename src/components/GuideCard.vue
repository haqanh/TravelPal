<template>
    <div class="flex items-center">
        <div class="guide-card relative w-[32.8vh] h-[33.4vh] bg-white border border-gray-200 rounded-[2.63vh] custom-shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="rounded-t-[2.63vh] h-[23.7vh] w-[32.8vh] custom-shadow object-cover object-bottom" :src="GuideImage" alt="" />
            <div class="absolute top-0 right-0 mt-[1.05vh] mr-[1.05vh] flex items-center">
                <img class="h-[1.8vh] w-[1.8vh] relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-[0.53vh] font-medium text-sky-50 text-[1.8vh] text-[#E1F1FF]">{{Location}}</span>
            </div>
            <div class="p-[1.05vh]">
                <div class="flex justify-between items-center">
                    <p class="mb-[0.13vh] text-[3vh] font-semibold tracking-tight text-[#3F3D3D] dark:text-white">{{GuideName}}</p>
                </div>
                <div class="flex justify-between items-center">
                    <p class="pt-[0.3vh] text-[1.7vh] font-medium text-[#3F3D3D] text-opacity-60">{{ formattedDate }}</p>
                    <span class="px-[1.05vh] font-semibold text-center text-[1.7vh] rounded-full guide-colour border undefined ">
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
        GuideStartDate: {
            type: String,
            default: 'Guide Start Date'
        },
        GuideEndDate: {
            type: String,
            default: 'Guide End Date'
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
    methods: {
        formatDateRange(startTimestamp, endTimestamp) {
            const formatDate = (timestamp) => {
                if (!timestamp) return 'N/A';
                const date = new Date(timestamp.seconds * 1000);
                const month = date.toLocaleString('default', { month: 'short' });
                const day = date.getDate();
                const year = date.getFullYear().toString().substr(-2);
                return `${month} ${day} ‘${year}`;
            }

            const startDate = formatDate(startTimestamp);
            const endDate = formatDate(endTimestamp);

            return `${startDate} - ${endDate}`;
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
</style>