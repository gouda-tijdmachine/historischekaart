<template>
  <PopupSection>
    <PopupProperties
      :data="data"
      :properties="supportedProperties"
    />
  </PopupSection>
  <PopupSection
    v-if="sources.length"
    title="Brongegevens"
  >
    <PopupRelatedList :items="sources">
      <template #item="item">
        <PopupItemsSource :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopupSection title="Gerelateerde Panden">
    <PopupRelatedList :items="data.panden">
      <template #item="item">
        <PopupItemsProperty :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: PersonDetailResponse
}>()

const supportedProperties = computed<string[]>(() => {
  return ['geboortedatum', 'geboorteplaats', 'overlijdensdatum', 'overlijdensplaats', 'leeftijd', 'beroep']
})

const sources = computed(() => {
  return (props.data.panden || [])
    .flatMap(pand => pand.bron || [])
    .filter(bron => bron.naam && bron.url)
})
</script>
