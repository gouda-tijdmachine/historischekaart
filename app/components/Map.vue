<template>
  <div class="map-wrapper">
    <LMap
      ref="map"
      :zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="[52.0115, 4.7077]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        :key="selectedTileLayer.id"
        layer-type="base"
        :url="selectedTileLayer.url"
        :attribution="selectedTileLayer.attribution"
        :title="selectedTileLayer.title"
      />

      <LWmsTileLayer
        v-if="selectedWmsLayer"
        :key="selectedWmsLayer.id"
        :url="selectedWmsLayer.url"
        :layers="selectedWmsLayer.layers"
        :attribution="selectedWmsLayer.attribution"
        :format="selectedWmsLayer.format || 'image/png'"
        :transparent="selectedWmsLayer.transparent !== false"
        :name="selectedWmsLayer.title"
      />

      <LGeoJson
        v-if="geoJsonData"
        ref="geojson"
        :geojson="geoJsonData"
        :options="geojsonOptions"
      />
    </LMap>

    <!-- Custom Popup Panel -->
    <MapPopup
      v-if="selectedId"
      @close="filterStore.resetSelected"
    />
  </div>
</template>

<script setup lang="ts">
const layerStore = useLayerStore()
const filterStore = useFilterStore()
const { selectedTileLayer, selectedWmsLayer } = storeToRefs(layerStore)
const { currentYear, geoJsonData, selectedId } = storeToRefs(filterStore)

const zoom = ref(17)
const minZoom = ref(16)
const maxZoom = ref(17)
const map = ref()
const geojson = ref()

// GeoJSON styling options
const geojsonOptions = {
  onEachFeature: (feature: Feature, layer: any) => {
    layer.on('click', (_: any) => {
      handleActiveState(feature.properties.identifier)
    })

    layer.on('mouseout', (_: any) => {
      if (feature.properties.identifier !== selectedId.value) {
        layer.setStyle({
          fillOpacity: 0.2,
        })
      }
    })

    layer.on('mouseover', (_: any) => {
      layer.setStyle({
        fillOpacity: 1,
      })
    })
  },
}

/**
 * Methods
 */
const handleActiveState = (id: any) => {
  const leaflet = geojson.value?.leafletObject
  if (leaflet) {
    // Reset any other styling
    leaflet.resetStyle()

    // Iterate over object entries and break early
    const layer: any = Object.values(leaflet._layers).find((layer: any) => layer.feature?.properties.identifier === id)

    if (layer) {
      // Store the crrent item
      filterStore.updateSelected('property', id, layer.feature.properties.naam)

      // Set the color of the current item
      layer.setStyle({
        color: 'var(--red)',
      })
    }
  }
}

/**
 * Watchers
 */
watch(currentYear, async (newValue) => {
  filterStore.fetchGeoJson(newValue)
}, { immediate: true })

watch(selectedId, (newValue) => {
  handleActiveState(newValue)
})
</script>

<style lang="scss" scoped>
.map-wrapper {
  position:relative;
  height: 100%;
  width: 100%;
}
</style>
