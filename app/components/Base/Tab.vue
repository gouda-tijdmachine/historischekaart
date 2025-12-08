<template>
  <div class="tab">
    <ControlsSearch
      :type="searchType"
      :placeholder="placeholder"
    />
    <ul :class="['results', searchType === 'image' ? 'images' : 'cards']">
      <li
        v-for="(card, index) in items"
        :key="index"
      >
        <slot
          name="card"
          :card="card"
          :selected="selectedId === card.id"
          :on-select="() => filterStore.updateSelected(searchType, card.id, card.title)"
        />
      </li>
      <li v-if="isLoading">
        <BaseSpinner />
      </li>
      <li
        v-else-if="hasMore"
        class="load-more"
      >
        <BaseButton
          title="Load more"
          @click="loadMore"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="TCard extends Card = Card, TResponse extends Response = Response">
/**
 * State & Props
 */
const filterStore = useFilterStore()
const { selectedId } = storeToRefs(filterStore)
const items = shallowRef<TCard[]>([])
const totalItems = ref<number>(0)
const isLoading = ref<boolean>(false)
const hasMore = ref<boolean>(false)

const props = defineProps<{
  searchType: tabType
  placeholder: string
  transformFunction: (item: TResponse) => TCard
}>()

/**
 * Methods
 */
const loadMore = async () => {
  isLoading.value = true

  try {
    const loaded = unref(items).length || 0
    const result = await filterStore.fetchSearch(props.searchType, loaded, 5)
    for (const key in result) {
      // If the key is aantal, update totalItems
      if (key === 'aantal') {
        totalItems.value = result.aantal
      }

      // Check if we have another property that is an array, use that as itemz
      else if (Array.isArray(result[key])) {
        result[key].forEach((item: TResponse) => {
          items.value.push(props.transformFunction(item))
        })
      }
    }
  }
  finally {
    hasMore.value = totalItems.value > (items.value || []).length
    isLoading.value = false
  }
}

/**
 * Lifecycle
 */
onMounted(async () => {
  await loadMore()
})
</script>

<style lang="scss" scoped>
.tab {
  @include flex-column;
  gap: var(--space-4);
  height: 100%;
}

.results {
  flex: 1;
  overflow-y: auto;
  max-height: 100%;
  gap: var(--space-2);

  .load-more {
    margin-top: auto;
  }

  &.cards {
    @include flex-column;
  }

  &.images {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(auto-fill, var(--image-card-size));

    .load-more {
      grid-column: span 2;
    }

    li:has(.spinner-container) {
      grid-column: span 2;
    }
  }
}
</style>
