<template>
  <CardBase
    :title="card.title"
    :selected="selected"
    :icon-name="useFilterStore().iconName('property')"
  >
    <template #meta-content>
      <!-- <CardMeta>
        Straat: {{ streets.join(', ') }}
      </CardMeta> -->
    </template>
  </CardBase>
</template>

<script setup lang="ts">
const props = defineProps<{
  selected?: boolean
  card: PropertyCard
}>()

const streets = computed<string[]>(() => {
  return useFilterStore().findStreetNamesByID(props.card.streets)
})
</script>
