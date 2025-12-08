<template>
  <li class="address-item">
    <Icon
      :name="useFilterStore().iconName('property')"
      class="icon"
    />
    <div class="title-area">
      <span class="name">{{ item.naam }}</span>
      <Tag :value="item.datering" />
    </div>
    <div class="neighbourhood-area">
      <span
        v-if="item.wijk"
        class="neighbourhood"
      >
        {{ item.wijk }}
      </span>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  item: any
}>()
</script>

<style lang="scss" scoped>
.address-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "icon title"
    ". neighbourhood";
  row-gap: 0;
  align-items: center;

  .icon {
    grid-area: icon;
  }

  .title-area {
    grid-area: title;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .neighbourhood-area {
    grid-area: neighbourhood;
  }
}
</style>
