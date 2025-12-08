<template>
  <li class="user-item">
    <Icon
      :name="filterStore.iconName('person')"
      class="icon"
    />
    <button
      class="link"
      @click="handleClick"
    >
      {{ item.naam }}
    </button>
    <span class="details">({{ item.datering }}{{ item.beroep ? `, ${item.beroep}` : '' }})</span>
  </li>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  item: any
}>()

const handleClick = () => {
  filterStore.updateSelected('person', props.item.identifier, props.item.naam)
}
</script>

<style lang="scss" scoped>
.user-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) auto auto;

  .details {
    text-align: end;
  }
}
</style>
