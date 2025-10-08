<template>
  <div class="main-area">
    <div class="controls-area">
      <div class="top-area">
        <div class="title-area">
          <TitleText icon-name="material-symbols:map-outline">
            Interactieve historische kaart
          </TitleText>
          <span class="text-sm">
            Periode en Jaartal: [Franse tijd] {{ currentYear }}
          </span>
        </div>
        <div class="layer-area">
          <Dropdown
            class="layer-selector"
            :items="items"
            :selected-value="selectedValue"
            @update:selected-value="selectedValue = $event"
          />
          <span class="text-sm">
            Attribution: © Gouda Tijdmachine, OpenStreetMap
          </span>
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
          :current-year="currentYear"
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
 * State & Props
 * TODO: Use real data
 */
const currentYear = ref<number>(1430)
const minYear = ref<number>(1430)
const maxYear = ref<number>(2025)
const step = ref<number>(5)

const selectedValue = ref<string | undefined>('kadaster-1832')
const items = ref<Item[]>([
  {
    id: 'moderne-kaarten',
    title: 'Moderne kaarten',
    type: 'label',
  },
  {
    id: 'google-roadmap',
    title: 'Google Roadmap',
    type: 'item',
    subtitle: 'Hedendaagse wegenkaart',
    icon: 'lucide-map',
    tag: '2024',
  },
  {
    id: 'openstreetmap',
    title: 'OpenStreetMap',
    type: 'item',
    subtitle: 'Open-source kaart',
    icon: 'lucide-map',
    tag: '2024',
  },
  {
    id: 'mapbox-light',
    title: 'Mapbox Light',
    type: 'item',
    subtitle: 'Lichte moderne kaart',
    icon: 'lucide-map',
    tag: '2024',
  },
  {
    id: 'historische-kaarten',
    title: 'Historische kaarten',
    type: 'label',
  },
  {
    id: 'kadaster-1832',
    title: 'Kadaster 1832',
    type: 'item',
    subtitle: 'Eerste kadastrale opname',
    icon: 'lucide-building',
    tag: '1832',
  },
  {
    id: 'bonneblad-1865',
    title: 'Bonneblad 1865',
    type: 'item',
    subtitle: 'Topografische kaart 19e eeuw',
    icon: 'lucide-calendar',
    tag: '1865',
  },
  {
    id: 'luchtfotos',
    title: 'Luchtfotos\'s',
    type: 'label',
  },
  {
    id: 'luchtfoto-2024',
    title: 'Luchtfoto 2024',
    type: 'item',
    subtitle: 'Recente luchtopname',
    icon: 'lucide-camera',
    tag: '2024',
  },
  {
    id: 'luchtfoto-2010',
    title: 'Luchtfoto 2010',
    type: 'item',
    subtitle: 'Luchtopname begin 21e eeuw',
    icon: 'lucide-camera',
    tag: '2010',
  },
  {
    id: 'luchtfoto-1990',
    title: 'Luchtfoto 1990',
    type: 'item',
    subtitle: 'Luchtopname eind 20e eeuw',
    icon: 'lucide-camera',
    tag: '1990',
  },
  {
    id: 'luchtfoto-1977',
    title: 'Luchtfoto 1977',
    type: 'item',
    subtitle: 'Vroegste beschikbare luchtfoto',
    icon: 'lucide-camera',
    tag: '1977',
  },
])

watch(selectedValue, (newValue) => {
  console.warn('App!', newValue)
})
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

.layer-selector {
  width: var(--layer-selector-width);
}

.bottom-area {
  grid-area: bottom;
  margin-inline: var(--space-3);
}
</style>
