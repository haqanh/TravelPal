<template>
    <div class="flex items-center">
        <div class="trip-card relative lg:w-64 lg:h-64 md:w-48 md:h-48 bg-white border border-gray-200 rounded-2xl custom-shadow">
            <img class="rounded-t-2xl lg:h-48 lg:w-64 md:w-48 md:h-32 custom-shadow object-cover object-bottom" :src="TripImage" alt="No Image" />
            <div class="absolute top-0 right-0 mt-2 mr-2 flex items-center">
                <img class="h-auto w-auto relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-1 font-medium text-sky-50 text-xs text-[#E1F1FF]">{{ Location }}</span>
            </div>
            <div class="p-2">
                <div class="flex justify-between items-center">
                    <span class="mb-0.2 text-m font-semibold tracking-tight text-[#3F3D3D]">{{ TripName }}</span>
                    <div class="flex items-center flex-shrink-0 space-x-0">
                        <img class="lg-mb-0.2 mr-2 h-auto w-auto" src="../assets/Dot Split.svg" alt="" />
                        <div v-for="i in dollarCount" :key="i">
                            <img src="../assets/Union.svg" class="lg-mb-0.8 mb-1 h-auto" alt="Union" />
                        </div>
                    </div>
                </div>
                <span class="flex pt-1 text-xs font-medium text-[#3F3D3D] text-opacity-60">{{ formattedDate }}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        TripName: {
            type: String,
            default: 'Trip Name'
        },
        Location: {
            type: String,
            default: 'Location'
        },
        TripStartDate: {
            type: String,
            default: 'Trip Start Date'
        },
        TripEndDate: {
            type: String,
            default: 'Trip End Date'
        },
        trip: {
            type: Object,
            required: true
        },
        TripImage: {
            type: String,
            default: ''
        
        },
        TripCost: {
            type: Number,
            default: 0
        }
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
            return this.formatDateRange(this.TripStartDate, this.TripEndDate)
        },
        dollarCount() {
            if (this.TripCost < 2000) {
            return 1;
            } else if (this.TripCost < 5000) {
            return 2;
            } else {
            return 3;
            }
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