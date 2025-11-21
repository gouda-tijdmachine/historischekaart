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
          :selected="selectedPropertyId === card.id"
          @click="selectedPropertyId = card.id"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const propertyStore = usePropertyStore()
const { properties, selectedPropertyId } = storeToRefs(propertyStore)
await propertyStore.fetchData()
</script>

<style lang="scss" scoped>
.property-tab {
  @include flex-column;
  gap: var(--space-4);
  height: 100%;
}

.results {
  @include flex-column;
  gap: var(--space-2);
  flex: 1;
  overflow-y: auto;
  max-height: 100%;
}
</style>
