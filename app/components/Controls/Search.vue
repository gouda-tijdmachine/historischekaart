<template>
  <div :class="{ 'controls-search': true, [type.toLowerCase()]: true }">
    <div class="input-area">
      <input
        type="text"
        class="search-input"
        :placeholder="placeholder"
        :value="searchTerm"
        @input="searchTerm = ($event.target as HTMLInputElement)?.value ?? ''"
      >
    </div>
    <Dropdown
      class="street-area"
      :items="streets"
      :selected-value="streetId"
      @update:selected-value="streetId = $event"
    />
    <Dropdown
      class="period-area"
      :items="periods"
      :selected-value="periodId"
      @update:selected-value="periodId = $event"
    />
    <div class="button-area">
      <BaseButton
        title="Zoeken"
        icon="lucide:search"
        @click="$emit('search', { searchTerm, streetId, periodId })"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Store Dependencies
 */
const store = useFilterStore()

const searchTerm = ref<string>('')
const streetId = ref<string>('all')
const periodId = ref<string>('all')

/**
 * State
 */
const { streets, periods } = storeToRefs(store)

// TODO: Define interface for Streets, Periods
withDefaults(defineProps<{
  type: tabType
  placeholder?: string
}>(), {
  placeholder: 'Zoekterm invoeren...',
})

defineEmits<{
  search: [{ searchTerm?: string, streetId?: string, periodId?: string }]
}>()
</script>

<style lang="scss" scoped>
.controls-search {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas:
  "input input"
  "street period"
  "button button";
  gap: var(--space-2);
}

.input-area {
  grid-area: input;

  .search-input {
    display: flex;
    align-items: center;
    align-self: stretch;
    height: var(--space-9);
    width: 100%;
    padding: var(--space-1) var(--space-3);
    border: var(--border-width) solid var(--border-color);
  }
}

.street-area {
  grid-area: street;
  width: 100%;
}

.period-area {
  grid-area: period;
  width: 100%;
}
.button-area {
  grid-area: button;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-2);
}
</style>
