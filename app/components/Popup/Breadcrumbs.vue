<template>
  <div class="breadcrumbs">
    <button
      class="breadcrumb"
      @click="filterStore.updateSelected(parent.type, parent.id)"
    >
      <Icon
        name="lucide:arrow-left"
        class="icon"
      />
      <Icon
        :name="filterStore.iconName(parent.type)"
        class="icon"
      />
      {{ parent?.value ?? '-' }}
    </button>
  </div>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
defineProps<{
  parent: Breadcrumb

}>()
</script>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: var(--blue-dark);
  background-color: var(--blue-10);
  padding: var(--space-4);

  .icon {
    color: var(--blue-dark);
    width: var(--space-5);
    height: var(--space-5);
  }
}

.breadcrumb {
  display: grid;
  grid-template-columns: var(--space-5) var(--space-5) 1fr;
  gap: var(--space-2);
  align-items: center;
  padding: var(--space-1);
  white-space: nowrap;
  overflow: hidden;
}
</style>
