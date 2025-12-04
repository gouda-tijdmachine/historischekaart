<template>
  <BaseTab
    search-type="person"
    placeholder="Zoek op naam of adres..."
    endpoint="personen"
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
    name: person.naam,
    profession: person.beroep,
    year: parseInt(person.datering, 10),
    propertyIds: person.pandidentifiers,
  }
}
</script>
