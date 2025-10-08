<template>
  <div class="controls-search">
    <div class="input-area" />
    <Dropdown
      class="street-area"
      :items="streets"
      :selected-value="selectedStreet"
      @update:selected-value="selectedStreet = $event"
    />
    <Dropdown
      class="period-area"
      :items="periods"
      :selected-value="selectedPeriod"
      @update:selected-value="selectedPeriod = $event"
    />
    <div class="button-area" />
  </div>
</template>

<script setup lang="ts">
const selectedStreet = ref<string | undefined>('all')
const streets = ref([
  {
    id: 'all',
    title: 'Alle Straten',
    type: 'item',
  },
  {
    id: 'item-1',
    title: 'Markt',
    type: 'item',
  },
  {
    id: 'item-2',
    title: 'Achter de Kerk',
    type: 'item',
  },
  {
    id: 'item-3',
    title: 'NieuwHaven',
    type: 'item',
  },
  {
    id: 'item-4',
    title: 'Spieringstraat',
    type: 'item',
  },
  {
    id: 'item-5',
    title: 'Lange Groenendaal',
    type: 'item',
  },
  {
    id: 'item-6',
    title: 'Nieuwstraat',
    type: 'item',
  },
  {
    id: 'item-7',
    title: 'Oosthaven',
    type: 'item',
  },
  {
    id: 'item-8',
    title: 'Nieuwe Gouwe',
    type: 'item',
  },
  {
    id: 'item-9',
    title: 'Turfsingel',
    type: 'item',
  },
  {
    id: 'item-10',
    title: 'Blekerssingel',
    type: 'item',
  },
  {
    id: 'item-11',
    title: 'Korte Groenendaal',
    type: 'item',
  },
  {
    id: 'item-12',
    title: 'Westhaven',
    type: 'item',
  },
  {
    id: 'item-13',
    title: 'Kleiweg',
    type: 'item',
  },
  {
    id: 'item-14',
    title: 'Korte Tiendeweg',
    type: 'item',
  },
])

const selectedPeriod = ref<string | undefined>('all')
const periods = ref([
  {
    id: 'all',
    title: 'Alle perioden',
    type: 'item',
  },
  {
    id: '1400-1600',
    title: 'Middeleeuwen/Renaissance (1400-1600)',
    type: 'item',
  },
  {
    id: '1600-1700',
    title: '17e eeuw (1600-1700)',
    type: 'item',
  },
  {
    id: '1700-1800',
    title: '18e eeuw (1700-1800)',
    type: 'item',
  },
  {
    id: '1800-1850',
    title: 'Vroeg 19e eeuw (1800-1850)',
    type: 'item',
  },
  {
    id: '1850-1900',
    title: 'Laat 19e eeuw (1850-1900)',
    type: 'item',
  },
  {
    id: '1900-1950',
    title: 'Vroeg 20e eeuw (1900-1950)',
    type: 'item',
  },
])
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
}

.input-area {
  grid-area: input;
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
}
</style>
