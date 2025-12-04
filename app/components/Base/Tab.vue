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
          :on-select="() => filterStore.updateSelected(searchType, card.id)"
        />
      </li>
      <li
        v-if="isLoading"
        class="spinner-container"
      >
        <Icon
          name="lucide:loader-2"
          class="spinner"
        />
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

<script setup lang="ts">
/**
 * State & Props
 */
const filterStore = useFilterStore()
const { selectedId } = storeToRefs(filterStore)
const items = ref<Card[]>([])
const totalItems = ref<number>(0)
const isLoading = ref<boolean>(false)

const props = defineProps<{
  searchType: tabType
  placeholder: string
  endpoint: string
  transformFunction: (item: any) => Card
}>()

/**
 * Computed Properties
 */
const hasMore = computed<boolean>(() => {
  return unref(totalItems) > unref(items)?.length
})

/**
 * Methods
 */
const loadMore = async () => {
  isLoading.value = true

  try {
    const loaded = unref(items).length || 0
    const result = await filterStore.fetchSearch(props.endpoint, loaded, 5)

    // Update the total items
    totalItems.value = result.aantal

    // Transform and add new results
    const responseItems = result[props.endpoint]
    if (Array.isArray(responseItems)) {
      const transformedItems = responseItems.map(props.transformFunction)
      items.value.push(...transformedItems)
    }
  }
  finally {
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
  }
}

.spinner-container {
  display: flex;
  justify-content: center;
  padding: var(--space-4);
}

.spinner {
  animation: spin 1s linear infinite;
  color: var(--blue-light);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
