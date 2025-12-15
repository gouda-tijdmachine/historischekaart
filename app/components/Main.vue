<template>
  <div class="main-area">
    <div class="controls-area">
      <div class="top-area">
        <div class="title-area">
          <TextTitle icon-name="lucide:map">
            Interactieve historische kaart
          </TextTitle>
          <div class="label-wrapper">
            <TextLabel>
              Periode en Jaartal:
            </TextLabel>
            <Tag
              :value="currentHistoricalPeriod"
              class="red"
            />
            <TextLabel>
              {{ currentYear }}
            </TextLabel>
          </div>
        </div>
        <div class="dropdown-area">
          <Dropdown
            :items="layers"
            :selected-value="selectedLayerId"
            @update:selected-value="selectedLayerId = $event"
          />
          <TextLabel>
            Attribution: © Gouda Tijdmachine, OpenStreetMap
          </TextLabel>
          <BaseButton
            icon="lucide:circle-question-mark"
            class="icon-lg"
          />
        </div>
      </div>
      <div class="bottom-area">
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
    </div>
    <Map class="map-area" />
  </div>
</template>

<script setup lang="ts">
/**
 * Store Dependencies
 */
const { currentYear, currentHistoricalPeriod } = storeToRefs(useFilterStore())
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
  padding: var(--space-6);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "top"
    "bottom";
  gap: var(--space-4)

}

.map-area {
  grid-area: map;
}

.top-area {
  grid-area: top;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.dropdown-area {
  display: grid;
  grid-template-columns: minmax(23rem, 1fr) var(--space-8);
  grid-template-areas:
    "dropdown icon"
    "label .";
    align-items: center;
  gap: var(--space-1);

  .dropdown-container {
    grid-area: dropdown;
  }

  .label {
    grid-area: label;
  }

  .btn {
    grid-area: icon;
    aspect-ratio: 1;
  }
}

.bottom-area {
  grid-area: bottom;
  margin-inline: var(--space-3);
}

.label-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--space-1);
}
</style>
