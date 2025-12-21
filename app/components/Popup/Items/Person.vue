<template>
  <li class="user-item">
    <Icon
      :name="filterStore.iconName('person')"
      class="icon"
    />
    <div class="title-area">
      <span class="name"><span><a
        class="link"
        @click="handleClick"
      >
        {{ item.naam }}
      </a>{{ item.beroep ? `, ${item.beroep}` : '' }}</span></span>
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
  filterStore.updateSelected('person', props.item.identifier, props.item.naam)
}
</script>

<style lang="scss" scoped>
.user-item {
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
