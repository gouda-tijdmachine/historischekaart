<template>
  <li class="source-item">
    <Icon
      name="lucide:map-pin"
      class="icon"
    />
    <div class="title-area">
      {{ name }}
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any
}>()

const name = computed<string>(() => {
  return props.item.naam || 'Onbekende Straat'
})
</script>

<style lang="scss" scoped>
.source-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) auto;
  grid-template-rows: 1fr;
  grid-template-areas:
    "icon title";
  align-items: center;

  .icon {
    grid-area: icon;
  }

  .title-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
