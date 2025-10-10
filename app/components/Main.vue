<template>
  <div class="main-area">
    <div class="controls-area">
      <div class="top-area">
        <div class="title-area">
          <TextTitle icon-name="lucide:map">
            Interactieve historische kaart
          </TextTitle>
          <TextLabel>
            Periode en Jaartal: [Franse tijd] {{ currentYear }}
          </TextLabel>
        </div>
        <div class="layer-area">
          <Dropdown
            :items="layers"
            :selected-value="selectedLayerId"
            @update:selected-value="selectedLayerId = $event"
          />
          <TextLabel>
            Attribution: © Gouda Tijdmachine, OpenStreetMap
          </TextLabel>
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
const { selectedLayerId, layers } = storeToRefs(useLayerStore())
/**
 * State & Props
 * TODO: Use real data
 */
const currentYear = ref<number>(1430)
const minYear = ref<number>(1430)
const maxYear = ref<number>(2025)
const step = ref<number>(5)
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

.title-area, .layer-area {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bottom-area {
  grid-area: bottom;
  margin-inline: var(--space-3);
}
</style>
