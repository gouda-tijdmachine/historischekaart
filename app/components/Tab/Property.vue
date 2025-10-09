<template>
  <div class="property-tab">
    <ControlsSearch
      type="property"
      placeholder="Zoek op naam, adres of straatnaam..."
    />
    <ul class="results">
      <li
        v-for="(card, index) in properties"
        :key="index"
      >
        <CardProperty
          :card="card"
          :selected="selectedProperty === card.id"
          @click="selectedProperty = card.id"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { properties, selectedProperty } = storeToRefs(usePropertyStore())
</script>

<style lang="scss" scoped>
.property-tab {
  @include flex-column;
  gap: var(--space-4);
}

.results {
  @include flex-column;
  gap: var(--space-2);
}
</style>
