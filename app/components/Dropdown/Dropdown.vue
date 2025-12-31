<template>
  <div
    v-click-outside="close"
    class="dropdown-container"
  >
    <DropdownButton
      ref="buttonRef"
      v-model="open"
      :item="selectedItem"
    />

    <DropdownPopup
      v-if="open"
      ref="popupRef"
      :model-value="selectedValue"
      :items="items"
      :has-filter="hasFilter"
      :filter-placeholder="filterPlaceholder"
      @update:model-value="$emit('update:selectedValue', $event)"
      @close="close"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * State & props
 */
const open = ref(false)
const buttonRef = ref<any>(null)
const popupRef = ref<any>(null)

const props = defineProps<{
  selectedValue?: string
  items: Item[]
  hasFilter?: boolean
  filterPlaceholder?: string
}>()

defineEmits<{
  (e: 'update:selectedValue', value: string): void
}>()

/**
 * Computed properties
 */
const selectedItem = computed<Item | undefined>(() => {
  return props.items.find((item: Item) => item.id == props.selectedValue)
})

/**
 * Methods
 */
const close = () => {
  open.value = false
}

/**
 * Watchers
 */
watch(open, (isOpen) => {
  if (isOpen) {
    nextTick(() => {
      popupRef.value?.focus()
    })
  }
  else {
    nextTick(() => {
      buttonRef.value?.focus()
    })
  }
})
</script>

<style lang="scss" scoped>
.dropdown-container {
  position: relative;
}
</style>
