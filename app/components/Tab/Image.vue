<template>
  <div class="image-tab">
    <ControlsSearch
      type="image"
      placeholder="Zoek op titel, beschrijving, straat of pand..."
    />
    <ul class="results">
      <li
        v-for="(card, index) in images"
        :key="index"
      >
        {{ card.id }} - {{ card.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const selectedImageId = ref()
const images = ref([])
</script>

<style lang="scss" scoped>
.person-tab {
  @include flex-column;
  gap: var(--space-4);
}

.results {
  @include flex-column;
  gap: var(--space-2);
}
</style>
