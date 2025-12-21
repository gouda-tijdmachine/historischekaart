<template>
  <BaseTab
    search-type="property"
    placeholder="Typ (deel van) naam in en klik op Zoeken..."
    :transform-function="transform"
  >
    <template #card="{ card, selected, onSelect }">
      <CardProperty
        :card="card"
        :selected="selected"
        @click="onSelect"
      />
    </template>
  </BaseTab>
</template>

<script setup lang="ts">
const transform = (pand: PropertyResponse): PropertyCard => {
  return {
    id: pand.identifier!,
    title: pand.naam!,
    streets: (pand.straten ?? []).map((street: StreetResponse) => street.identifier),
  }
}
</script>
