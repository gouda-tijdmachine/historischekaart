<template>
  <li class="user-item">
    <Icon
      :name="filterStore.iconName('person')"
      class="icon"
    />
    <div class="details">
      <button
        class="link"
        @click="handleClick"
      >
        {{ item.naam }}
      </button>
      {{ item.beroep ? `, ${item.beroep}` : '' }}
    </div>
    <Tag
      :value="item.datering"
      class="red"
    />
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
  grid-template-columns: var(--space-4) auto min-content;
  grid-template-areas: "icon title tag";
  align-items: center;

  .details {
    grid-area: title;
    display: flex;
  }

  .icon {
    grid-area: icon;
  }

  .tag {
    grid-area: tag;
  }
}
</style>
