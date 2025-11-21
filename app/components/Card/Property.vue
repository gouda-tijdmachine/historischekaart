<template>
  <CardBase
    :title="card.title"
    :selected="selected"
    icon-name="lucide:house"
  >
    <template #subtitle>
      <!-- <CardSubtitle>
        {{ card.address }}
      </CardSubtitle> -->
    </template>

    <template #meta-content>
      <CardMeta>
        Straat: {{ streets.join(', ') }}
      </CardMeta>
    </template>

    <template #badges>
      <!-- <Tag :value="card.yearBuilt" /> -->
      <!-- <Tag
        :value="status"
        :class="statusColor"
      /> -->
    </template>
  </CardBase>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()

const props = defineProps<{
  selected?: boolean
  card: PropertyCard
}>()

const streets = computed<string[]>(() => {
  return filterStore.findStreetNamesByID(props.card.streets)
})

// const status = computed<string>(() => {
//   return props.card.yearDemolished ? 'Gesloopt' : 'Bestaand'
// })

// const statusColor = computed<string>(() => {
//   return props.card.yearDemolished ? 'red' : 'green'
// })
</script>
