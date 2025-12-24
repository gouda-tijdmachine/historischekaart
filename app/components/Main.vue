<template>
  <div class="main-area">
    <div class="controls-area">
      <div class="slider-area">
        <Slider
          v-model="currentYear"
          :min="minYear"
          :max="maxYear"
          :step="step"
        />
        <SliderLabels
          v-model="currentYear"
          :min-year="minYear"
          :max-year="maxYear"
        />
      </div>
      <div class="dropdown-area">
        <Dropdown
          :items="layers"
          :selected-value="selectedLayerId"
          @update:selected-value="selectedLayerId = $event"
        />
      </div>
    </div>
    <Map class="map-area" />
  </div>
</template>

<script setup lang="ts">
/**
 * Store Dependencies
 */

const { currentYear } = storeToRefs(useFilterStore())
const { selectedLayerId, layers } = storeToRefs(useLayerStore())

/**
 * State & Props
 * TODO: Determine the minYear and maxYear based on the data
 * TODO: Determine where to put "step"
 */
const minYear = ref<number>(1430)
const maxYear = ref<number>(2025)
const step = ref<number>(10)
</script>

<style lang="scss" scoped>
.main-area {
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  grid-template-areas:
    "controls"
    "map";
}

.controls-area {
  grid-area: controls;
  display: grid;
  grid-template-columns: auto 19rem;
  grid-template-areas: "slider dropdown";
  gap: var(--space-4);
  padding: var(--space-6);
}

.slider-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dropdown-area {
  grid-area: dropdown;
}

.map-area {
  grid-area: map;
}
</style>
