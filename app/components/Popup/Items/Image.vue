<template>
  <li class="image-item">
    <Icon
      :name="filterStore.iconName('image')"
      class="icon"
    />
    <div class="title-area">
      <button
        class="link"
        @click="handleClick"
      >
        {{ item.titel }}
      </button>
      <Tag
        :value="item.datering"
        class="red"
      />
    </div>
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
  grid-template-areas: "icon title";
  align-items: self-start;

  .icon {
    grid-area: icon;
  }

  .title-area {
    grid-area: title;
    display: flex;
    justify-content: space-between;
    align-items: self-start;
  }
}
</style>
