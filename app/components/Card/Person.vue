<template>
  <CardBase
    :title="card.title"
    :selected="selected"
    :icon-name="filterStore.iconName('person')"
  >
    <template #meta-content>
      <CardMeta>
        {{ card.profession }}
      </CardMeta>
    </template>

    <template #badges>
      <Tag
        :value="card.year"
        class="red"
      />
    </template>
  </CardBase>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
defineProps<{
  selected?: boolean
  card: PersonCard
}>()
</script>
