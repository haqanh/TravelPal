<template>
  <span
    :style="{ borderColor: borderColor, color: textColor }"
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
    },
    textColor: {
      type: String,
      default: '#0000FF'
    },
    borderColor: {
      type: String,
      default: '#0000FF'
    }
  }
}
</script>
