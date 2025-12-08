<template>
  <li class="image-item">
    <Icon
      :name="filterStore.iconName('image')"
      class="icon"
    />
    <button
      class="link"
      @click="handleClick"
    >
      {{ item.titel }}
    </button>
  </li>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  item: any
}>()

const handleClick = () => {
  filterStore.updateSelected('image', props.item.identifier, props.item.titel)
}
</script>

<style lang="scss" scoped>
.image-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) auto;
}
</style>
