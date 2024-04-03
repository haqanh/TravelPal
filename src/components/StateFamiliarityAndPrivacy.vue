<template>
  <div class="text-center">
    <div class="pt-8 pb-6">
      <p class="font-bold text-3xl">We're almost there!</p>
    </div>
    <div class="py-5">
      <p class="w-9/12 m-auto text-xl mb-2">You can update your privacy settings anytime you wish</p>
    </div>
    <div class="grid grid-cols-3 grid-rows-3 w-10/12 mx-auto gap-y-3">
      <p class="text-left text-lg self-center">Have you used TravelPal before?</p>
      <div class="flex items-center ml-16">
        <input @change="$emit('update-used-travelpal-before', $event.target.value)" :checked="usedTravelpalBefore === 'yes'" type="radio" value="yes" id="radio1yes" />
        <label for="radio1yes" class="h-fit text-lg ml-2 mb-0.5 select-none">Yes</label>
      </div>
      <div class="flex items-center ml-16">
        <input @change="$emit('update-used-travelpal-before', $event.target.value)" :checked="usedTravelpalBefore === 'no'" type="radio" value="no" id="radio1no" />
        <label for="radio1no" class="h-fit text-lg ml-2 mb-0.5 select-none">No</label>
      </div>

      <p class="text-left text-lg self-center">Have you used other similar apps before?</p>
      <div class="flex items-center ml-16">
        <input @change="$emit('update-used-similar-apps-before', $event.target.value)" :checked="usedSimilarAppsBefore === 'yes'" type="radio" value="yes" id="radio2yes" />
        <label for="radio2yes" class="h-fit text-lg ml-2 mb-0.5 select-none">Yes</label>
      </div>
      <div class="flex items-center ml-16">
        <input @change="$emit('update-used-similar-apps-before', $event.target.value)" :checked="usedSimilarAppsBefore === 'no'" type="radio" value="no" id="radio2no" />
        <label for="radio2no" class="h-fit text-lg ml-2 mb-0.5 select-none">No</label>
      </div>

      <p class="text-left text-lg self-center">Do you want to make your activity private or public?</p>
      <div class="flex items-center ml-16">
        <input @change="$emit('update-private-or-public', $event.target.value)" :checked="privateOrPublic === 'public'" type="radio" value="public" id="public" />
        <label for="public" class="h-fit text-lg ml-2 mb-0.5 select-none">Public</label>
      </div>
      <div class="flex items-center ml-16">
        <input @change="$emit('update-private-or-public', $event.target.value)" :checked="privateOrPublic === 'private'" type="radio" value="private" id="private" />
        <label for="private" class="h-fit text-lg ml-2 mb-0.5 select-none">Private</label>
      </div>
    </div>
  </div> 
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    usedTravelpalBefore: String,
    usedSimilarAppsBefore: String,
    privateOrPublic: String,
  },
  emits:['update-used-travelpal-before', 'update-used-similar-apps-before', 'update-private-or-public'],
  methods: {
  }
}
</script>