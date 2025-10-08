<template>
  <div
    ref="popupElement"
    tabindex="0"
    class="popup"
    @keydown.escape.prevent="$emit('close')"
    @keydown.enter.prevent="selectActiveItem"
    @keydown.space.prevent="selectActiveItem"
    @keydown.down.prevent="next"
    @keydown.up.prevent="prev"
    @keydown.stop
    @click.stop
  >
    <ul>
      <DropdownItem
        v-for="(item, index) in items"
        :id="`item-${index}`"
        :key="index"
        :is-active="isActive(index)"
        :item="item"
        as="li"
        @mouseenter="mouseEnter(index, item)"
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

const props = defineProps<{
  modelValue?: string
  items: Item[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'close'): void
}>()

defineExpose({
  focus() {
    popupElement.value?.focus()
  },
})

/**
 * Computed properties
 */
const validIndexes = computed<number[]>(() => {
  return props.items
    .map((item, idx) => item.type !== 'label' ? idx : -1)
    .filter(idx => idx !== -1)
})

/**
 * Methods
 */
const isActive = (index: number) => {
  return (props.items[index]!.id === props.modelValue || index === activeIndex.value)
}

const mouseEnter = (index: number, item: Item): void => {
  if (item.type !== 'label') {
    activeIndex.value = index
  }
}

const mouseClick = (index: number, item: Item) => {
  if (item.type !== 'label') {
    activeIndex.value = index
    emit('update:modelValue', item.id)
    emit('close')
  }
}

const selectActiveItem = () => {
  const item = props.items[activeIndex.value]
  if (item) {
    emit('update:modelValue', item.id)
    emit('close')
  }
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
</script>

<style lang="scss" scoped>
.popup {
  position: absolute;
  z-index: 401;
  margin-top: var(--space-1);
  width: inherit;
  overflow: auto;
  border: var(--border-with) solid var(--border-color);
  background: var(--white);
  box-shadow: var(--shadow-1);

  &:focus-visible {
    outline: var(--border-width) solid var(--blue);
  }
}
</style>
