<template>
  <CardBase
    :title="card.title"
    :selected="selected"
    icon-name="lucide:house"
  >
    <template #subtitle>
      <CardSubtitle>
        {{ card.address }}
      </CardSubtitle>
    </template>

    <template #meta-content>
      <CardMeta>
        Straat: {{ card.streetName }}
      </CardMeta>
    </template>

    <template #badges>
      <Tag :value="card.yearBuilt" />
      <Tag
        :value="status"
        :class="statusColor"
      />
    </template>
  </CardBase>
</template>

<script setup lang="ts">
const props = defineProps<{
  selected?: boolean
  card: PropertyCard
}>()

const status = computed<string>(() => {
  return props.card.yearDemolished ? 'Gesloopd' : 'Bestaand'
})

const statusColor = computed<string>(() => {
  return props.card.yearDemolished ? 'red' : 'green'
})
</script>
