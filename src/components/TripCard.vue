<template>
    <div class="flex items-center">
        <div class="trip-card relative w-[32.8vh] h-[33.4vh] bg-white border border-gray-200 rounded-[2.63vh] custom-shadow">
            <img class="rounded-t-[2.63vh] h-[23.7vh] w-[32.8vh] custom-shadow object-cover object-bottom" :src="TripImage" alt="No Image" />
            <div class="absolute top-0 right-0 mt-[1.05vh] mr-[1.05vh] flex items-center">
                <img class="h-[1.8vh] w-[1.8vh] relative" src="../assets/map-pin.svg" alt="" />
                <span class="ml-[0.53vh] font-medium text-sky-50 text-[1.8vh] text-[#E1F1FF]">{{ Location }}</span>
            </div>
            <div class="p-[1.05vh]">
                <div class="flex justify-between items-center">
                    <span class="mb-[0.13vh] text-[3vh] font-semibold tracking-tight text-[#3F3D3D]">{{ TripName }}</span>
                    <div class="flex items-center flex-shrink-0 space-x-0">
                        <img class="mb-[0.4vh] mr-[1.05vh] h-[1.1vh] w-[1.1vh]" src="../assets/Dot Split.svg" alt="" />
                        <div v-for="i in dollarCount" :key="i">
                            <img src="../assets/Union.svg" class="mb-[0.9vh] h-[2.8vh]" alt="Union" />
                        </div>
                    </div>
                </div>
                <span class="flex pt-[0.3vh] text-[2vh] font-medium text-[#3F3D3D] text-opacity-60">{{ formattedDate }}</span>
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