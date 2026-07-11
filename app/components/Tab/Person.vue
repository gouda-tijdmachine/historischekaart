<template>
  <BaseTab
    search-type="person"
    placeholder="Typ (deel van) naam in en klik op Zoeken..."
    :transform-function="transform"
  >
    <template #card="{ card, selected, onSelect }">
      <CardPerson
        :card="card"
        :selected="selected"
        @click="onSelect"
      />
    </template>
  </BaseTab>
</template>

<script setup lang="ts">
const transform = (person: PersonResponse): PersonCard => {
  return {
    id: person.identifier,
    title: person.naam,
    profession: person.beroep,
    // datering is een bereik ("1842–1907") of een los jaar; niet parsen,
    // want parseInt zou het bereik afkappen tot het eerste jaartal
    year: person.datering,
    propertyIds: person.pandidentifiers,
  }
}
</script>
