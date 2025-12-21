<template>
  <li class="property-item">
    <Icon
      :name="filterStore.iconName('property')"
      class="icon"
    />
    <button
      class="link"
      @click="handleClick"
    >
      {{ name }}
    </button>
  </li>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  item: any
}>()

const name = computed<string>(() => {
  return props.item.naam || 'Pand'
})

const handleClick = () => {
  filterStore.updateSelected('property', props.item.identifier, unref(name))
}
</script>

<style lang="scss" scoped>
.property-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) auto;
  align-items: self-start;
}
</style>
