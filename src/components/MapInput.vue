<script>

import { ref, onMounted } from 'vue';

export default {
    setup() {
        const location = ref();

        onMounted(() => {        
            const autocomplete = new google.maps.places.Autocomplete(location.value, {
                fields: ["geometry.location", "place_id", "name"],
                types: ["geocode"],
            });

            google.maps.event.addListener(autocomplete, "place_changed", () => {
                const place = autocomplete.getPlace();
                console.log(place);
                console.log("Latitude: ", place.geometry.location.lat());
                console.log("Longitude: ", place.geometry.location.lng());
        });
    });
         
        return { location };
    }
}
</script>



<template>
<div>
    <h1>MapTestView</h1>
    <input id="autocomplete" type="text" ref="location" placeholder="Please input your destination">

  </div>


</template>

