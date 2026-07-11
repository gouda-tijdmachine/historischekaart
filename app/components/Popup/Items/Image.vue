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
        :value="datering"
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

// exacte datums (krantenknipsels, "1915-01-04" of "1915-01") alleen als
// jaartal tonen; perioden als "1860-1870" blijven ongemoeid
const datering = computed(() => {
  return String(props.item.datering ?? '').replace(/^(\d{4})-\d{2}(-\d{2})?$/, '$1')
})

const handleClick = () => {
  filterStore.updateSelected('image', props.item.identifier)
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
