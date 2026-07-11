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
      v-if="datering"
      :value="datering"
      class="red"
    />
  </li>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  item: any
}>()

// de datering van een persoonsreconstructie kan een reeks vermeldingsjaren
// zijn ("1880, 1895, 1896, 1897"); compact weergeven als "1880–1897"
const datering = computed(() => {
  const jaren = [...new Set(
    String(props.item.datering ?? '')
      .split(', ')
      .map(d => d.replace(/^(\d{4})-\d{2}(-\d{2})?$/, '$1'))
      .filter(Boolean),
  )]
  if (jaren.length > 1) {
    return `${jaren[0]}–${jaren[jaren.length - 1]}`
  }
  return jaren[0] ?? ''
})

const handleClick = () => {
  filterStore.updateSelected('person', props.item.identifier)
}
</script>

<style lang="scss" scoped>
.user-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) minmax(0, 1fr) min-content;
  grid-template-areas: "icon title tag";
  align-items: center;

  .details {
    grid-area: title;
    display: flex;
    min-width: 0;
  }

  .icon {
    grid-area: icon;
  }

  .tag {
    grid-area: tag;
  }
}
</style>
