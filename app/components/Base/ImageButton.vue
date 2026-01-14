<template>
  <button
    class="btn"
    @click="$emit('click')"
  >
    <img
      class="image"
      :src="image"
    >
  </button>
</template>

<script setup lang="ts">
defineProps<{
  image: string
}>()

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.btn {
  padding: 0;
  margin: 0;
  border: 0;
  overflow: hidden;
  display: block;
  height: var(--thumbnail-height-close-by);
}

.image {
  display: block;
  height: 100%;
  width: auto;
  transition: scale 200ms ease-in-out;

  &:hover {
    scale: 1.05;
  }
}
</style>
