<template>
  <div
    ref="popupElement"
    tabindex="0"
    class="popup"
    @keydown.escape.prevent="$emit('close')"
    @keydown.enter.prevent="selectActiveItem"
    @keydown.space.prevent="selectActiveItem"
    @keydown.tab.prevent="selectActiveItem"
    @keydown.down.prevent="next"
    @keydown.up.prevent="prev"
    @keydown.stop
    @click.stop
  >
    <DropdownFilter
      v-if="hasFilter"
      ref="filterRef"
      v-model="filter"
      :filter-placeholder="filterPlaceholder"
    />
    <ul class="results">
      <DropdownItem
        v-for="(item, index) in filteredItems"
        :id="`item-${index}`"
        :key="index"
        :is-active="isActive(index)"
        :is-selected="modelValue === item.id"
        :item="item"
        as="li"
        @mousedown.prevent
        @click="mouseClick(index, item)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const popupElement = ref<HTMLDivElement>()
const activeIndex = ref(-1)
const filter = ref('')
const filterRef = ref()

const props = withDefaults(defineProps<{
  modelValue?: string
  items: Item[]
  hasFilter?: boolean
  filterPlaceholder?: string
}>(), {
  hasFilter: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'close'): void
}>()

defineExpose({
  focus() {
    if (props.hasFilter) {
      filterRef.value?.focus()
    }
    else {
      popupElement.value?.focus()
    }
  },
})

/**
 * Computed properties
 */
const validIndexes = computed<number[]>(() => {
  return filteredItems.value
    .map((item, idx) => item.type !== 'label' ? idx : -1)
    .filter(idx => idx !== -1)
})

const filteredItems = computed<Item[]>(() => {
  if (props.hasFilter && filter.value?.length) {
    const searchTerm = filter.value.toLowerCase()
    return props.items.filter((value: Item) => {
      return value.title.toLowerCase().includes(searchTerm)
    })
  }
  return props.items
})

/**
 * Methods
 */
const isActive = (index: number) => {
  return (filteredItems.value[index]!.id === props.modelValue || index === activeIndex.value)
}

const mouseClick = (index: number, item: Item) => {
  if (item.type !== 'label') {
    activeIndex.value = index
    emit('update:modelValue', item.id)
    emit('close')
  }
}

const selectActiveItem = () => {
  const item = filteredItems.value[activeIndex.value]
  if (item) {
    emit('update:modelValue', item.id)
  }
  emit('close')
}

const next = () => {
  const indexes = unref(validIndexes)
  const currentActiveIdx = indexes.indexOf(activeIndex.value)
  activeIndex.value = (currentActiveIdx === -1 || currentActiveIdx === indexes.length - 1) ? indexes[0]! : indexes[currentActiveIdx + 1]!
}

const prev = () => {
  const indexes = unref(validIndexes)
  const currentActiveIdx = indexes.indexOf(activeIndex.value)
  activeIndex.value = (currentActiveIdx === -1 || currentActiveIdx === 0) ? indexes[indexes.length - 1]! : indexes[currentActiveIdx - 1]!
}

/**
 * Watchers
 */
watch(filteredItems, () => {
  activeIndex.value = 0
})

watch(activeIndex, (newIndex) => {
  nextTick(() => {
    const el = document.getElementById(`item-${newIndex}`)
    if (el) el.scrollIntoView({ block: 'center' })
  })
})

/**
 * Lifecycle methods
 */
onMounted(() => {
  if (activeIndex.value === -1 && props.modelValue) {
    const items = unref(filteredItems)
    const foundIndex = items.findIndex(item => item.id === props.modelValue)
    if (foundIndex !== -1) {
      activeIndex.value = foundIndex
    }
  }
})
</script>

<style lang="scss" scoped>
.popup {
  --popup-height: 50dvh;
  --search-input: var(--space-11);

  position: absolute;
  top: 100%;
  right: 0;
  left: 0;
  z-index: 401;
  max-height: calc(var(--popup-height) + var(--search-input));
  margin-top: var(--space-1);
  border: var(--border-width) solid var(--border-color);
  outline: none;
  background: var(--white);
  box-shadow: var(--shadow-1);
  font-size: var(--font-size-sm);

  &:focus-visible {
    border-color: var(--blue);
  }

  .results {
    max-height: var(--popup-height);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>
