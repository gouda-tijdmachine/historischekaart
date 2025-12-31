<template>
  <div class="tab">
    <ControlsSearch
      :type="searchType"
      :placeholder="placeholder"
      :street-id="streetId"
      :period-id="periodId"
      :search-term="searchTerm"
      @search="loadMore"
      @update="updateSearchState"
    />
    <ul :class="['results', searchType === 'image' ? 'images' : 'cards', noResults ? 'no-results' : '']">
      <li
        v-if="noResults"
        class="empty-message"
      >
        <Icon
          :name="filterStore.iconName(searchType)"
          class="icon"
        />
        <span class="message">Nog geen zoekresultaten</span>
        <span class="hint">Gebruik de zoekbalk of filters om te beginnen</span>
      </li>
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
          title="Toon meer resultaten"
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
const noResults = ref<boolean>(true)

// Search terms
const searchTerm = ref<string>('')
const streetId = ref<string>('all')
const periodId = ref<string>('all')

const props = defineProps<{
  searchType: tabType
  placeholder: string
  transformFunction: (item: TResponse) => TCard
}>()

/**
 * Methods
 */
const loadMore = async (reset: boolean = false) => {
  isLoading.value = true
  noResults.value = false

  // If options is filled, reset the items and totalItems
  if (reset) {
    items.value = []
    totalItems.value = 0
  }

  // Create the params
  const params = {
    limit: 10,
    offset: unref(items).length || 0,
    searchTerm: unref(searchTerm),
    streetId: unref(streetId),
    periodId: unref(periodId),
  }

  try {
    const result = await filterStore.fetchSearch(props.searchType, params)
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
  catch {
    noResults.value = true
  }
  finally {
    hasMore.value = totalItems.value > (items.value || []).length
    isLoading.value = false
  }
}

const updateSearchState = (propName: string, value: string) => {
  const map: Record<string, Ref<string>> = {
    searchTerm,
    streetId,
    periodId,
  }
  if (map[propName]) {
    map[propName].value = value
  }
}
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
  scrollbar-width: thin;

  .empty-message {
    @include flex-column;
    @include flex-center;
    color: var(--gray-4);
    gap: var(--space-4);

    .icon {
      width: var(--space-12);
      height: var(--space-12);
    }

    .message {
      @include text-lg;
      font-weight: var(--font-weight-medium);
    }

    .hint {
      @include text-sm;
    }
  }

  .load-more {
    margin-top: auto;
  }

  &.no-results {
    @include flex-column;
    align-items: center;
    justify-content: center;
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

    &.no-results {
      grid-template-columns: 1fr;
    }
  }
}
</style>
