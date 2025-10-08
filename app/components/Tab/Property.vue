<template>
  <div class="property-tab">
    <ControlsSearch />
    <ul class="results">
      <li
        v-for="(card, index) in cards"
        :key="index"
      >
        <CardProperty
          :card="card"
          :selected="selectedId === card.id"
          @click="handleClick(card)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const selectedId = ref<string>()
const cards = ref<PropertyCard[]>([
  {
    id: 'building-1',
    title: 'Het Stadshuis',
    address: 'Verponding No. 156',
    streetName: 'Markt',
    yearBuilt: 1459,
    notes: 'Gotisch stadhuis, later verbouwd in renaissancestijl',
  },
  {
    id: 'building-2',
    title: 'Sint-Janskerk',
    address: 'Verponding No. 1',
    streetName: 'Achter de Kerk',
    yearBuilt: 1485,
    notes: 'Laat-gotische kruiskerk, langste kerk van Nederland',
  },
  {
    id: 'building-3',
    title: 'De Goudse Waag',
    address: 'Verponding No. 234',
    streetName: 'NieuwHaven',
    yearBuilt: 1668,
    notes: 'Classicistisch weeggebouw door Pieter Post',
  },
  {
    id: 'building-4',
    title: 'Gasthuis',
    address: 'Verponding No. 89',
    streetName: 'Spieringstraat',
    yearBuilt: 1592,
    yearDemolished: 1886,
    notes: 'Voormalig gasthuis, later armenvoorziening',
  },
])

const handleClick = (card: PropertyCard) => {
  selectedId.value = card.id
}
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
