<template>
  <BaseTab
    search-type="image"
    placeholder="Zoek op titel, beschrijving, straat of pand..."
    :transform-function="transform"
  >
    <template #card="{ card, selected, onSelect }">
      <CardImage
        :card="card"
        :selected="selected"
        @click="onSelect"
      />
    </template>
  </BaseTab>
</template>

<script setup lang="ts">
const transform = (image: ImageResponse): ImageCard => {
  return {
    id: image.identifier!,
    title: image.titel!,
    thumbnail: image.thumbnail,
    author: image.vervaardiger,
    year: parseInt(image.datering, 10),
    source: image.bronorganisatie,
    streets: (image.straten ?? []).map((street: StreetResponse) => street.identifier),
    propertyIds: image.pandidentifiers,
  }
}
</script>
