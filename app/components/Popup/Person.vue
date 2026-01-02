<template>
  <PopupSection anchor="details">
    <PopupProperties
      :data="data"
      :properties="supportedProperties"
    />
  </PopupSection>
  <PopupSection
    v-if="sources.length"
    title="Bronnen"
    anchor="bronnen"
  >
    <PopupRelatedList :items="sources">
      <template #item="item">
        <PopupItemsSource :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopupSection
    title="Eigenaar/bewoner van"
    anchor="panden"
  >
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

const anchorSections = computed(() => {
  const sections = [
    { id: 'details', label: 'Details' },
  ]

  if (sources.value.length) {
    sections.push({ id: 'bronnen', label: 'Bronnen' })
  }

  sections.push({ id: 'panden', label: 'Panden' })

  return sections
})

defineExpose({
  anchorSections,
})
</script>
