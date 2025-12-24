<template>
  <CardBase
    :title="card.title"
    :selected="selected"
    :icon-name="useFilterStore().iconName('property')"
  />
</template>

<script setup lang="ts">
defineProps<{
  selected?: boolean
  card: PropertyCard
}>()
</script>
