<template>
  <div class="popup-filter">
    <Icon
      name="lucide:search"
      class="icon"
    />
    <input
      ref="filterElement"
      name="filter"
      :value="modelValue"
      type="text"
      class="search"
      :placeholder="filterPlaceholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      @click.stop
    >
    <button
      v-if="modelValue?.length"
      class="reset"
      @click="$emit('update:modelValue', '')"
    >
      <Icon
        name="lucide:x"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
const filterElement = ref<HTMLInputElement>()

// Expose a focus method for parent
defineExpose({
  focus() {
    filterElement.value?.focus()
  },
})

withDefaults(defineProps<{
  modelValue?: string
  filterPlaceholder?: string
}>(), {
  filterPlaceholder: 'Filter...',
})

defineEmits(['update:modelValue'])

/**
 * Lifecycle methods
 */
onMounted(() => {
  filterElement.value?.focus()
})
</script>

<style lang="scss" scoped>
.popup-filter {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: var(--space-4) auto auto;
  grid-template-areas: "icon search reset";
  gap: var(--space-1);
  padding: var(--space-2);
  align-items: center;
}

.icon {
  grid-area: icon;
}

.search {
  grid-area: search;
}

.reset {
  grid-area: reset;
  display: grid;
  place-items: center;
}
</style>
