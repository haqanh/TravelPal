<template>
  <span
    :style="{ borderColor: categoryColor, color: categoryColor }"
    class="px-4 py-1 text-semibold text-xs rounded-lg border"
  >
    {{ tagCategory }}
  </span>
</template>

<script>
export default {
  props: {
    tagCategory: {
      type: String,
      default: 'Nature'
    }
  },
  computed: {
    categoryColor() {
      const colorMap = {
        City: '#0d6efd', // Bootstrap primary blue
        Nature: '#198754', // Bootstrap success green
        Culture: '#ffc107', // Bootstrap warning yellow
        Entertainment: '#dc3545', // Bootstrap danger red
        Food: '#fd7e14', // Bootstrap orange
        Landmarks: '#6f42c1', // Bootstrap indigo
        Adventure: '#20c997', // Bootstrap teal
        History: '#6610f2', // Bootstrap purple
        Science: '#d63384', // Bootstrap pink
        Technology: '#adb5bd', // Bootstrap secondary gray
        Sports: '#0dcaf0', // Bootstrap info cyan
        Health: '#198754', // Bootstrap success green, reused
        Fashion: '#f8f9fa', // Bootstrap light
        Education: '#6c757d', // Bootstrap dark gray
        Travel: '#0c63e4', // A slightly different shade of blue
        Art: '#e83e8c', // Bootstrap pink, different shade
        // Add more categories as needed
      };
      // Return the color for the current tagCategory, or a default color if not found
      return colorMap[this.tagCategory] || '#343a40'; // Bootstrap dark gray as default
    }
  }
}
</script>

