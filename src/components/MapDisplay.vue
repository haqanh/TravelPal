<script>
import { ref, onMounted } from 'vue';

export default {
    props: {
        // The geopoint prop is expected to be an object with 'lat' and 'lng' properties
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        // The description prop is expected to be a string
        description: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const mapElement = ref(null);

        console.log(props.latitude, props.longitude, props.description)

        onMounted(() => {
            // Initialize the map with the center at the provided geopoint
            const map = new google.maps.Map(mapElement.value, {
                center: { lat: props.latitude, lng: props.longitude },
                zoom: 16,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
                },
            });

            // Create the marker at the provided geopoint
            const marker = new google.maps.Marker({
                position: { lat: props.latitude, lng: props.longitude },
                map: map,
                title: props.description,
            });

            // Create the info window with the provided description
            const infoWindow = new google.maps.InfoWindow({
                content: props.description,
            });

            // Add a click listener for the marker to open the info window
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        });

        return { mapElement };
    }
}
</script>

<template>
    <div ref="mapElement" style="height: 300px; width: 300px;"></div>
</template>