<template>
  <div class="map-wrapper">
    <LMap
      ref="map"
      :zoom="zoom"
      :min-zoom="minZoom"
      :max-zoom="maxZoom"
      :center="[52.0115, 4.7077]"
      :use-global-leaflet="false"
      :options="{ zoomSnap: 0 }"
    >
      <LTileLayer
        :key="selectedTileLayer.id"
        layer-type="base"
        :url="selectedTileLayer.url"
        :attribution="selectedTileLayer.attribution"
        :title="selectedTileLayer.title"
        :max-zoom="selectedTileLayer.maxZoom || maxZoom"
      />

      <LWmsTileLayer
        v-if="selectedWmsLayer"
        :key="selectedWmsLayer.id"
        :url="selectedWmsLayer.url"
        :layers="selectedWmsLayer.layers"
        :attribution="selectedWmsLayer.attribution"
        :version="selectedWmsLayer.version || '1.1.1'"
        :format="selectedWmsLayer.format || 'image/png'"
        :transparent="selectedWmsLayer.transparent !== false"
        :name="selectedWmsLayer.title"
        :max-zoom="selectedWmsLayer.maxZoom || maxZoom"
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

const zoom = ref(16)
const minZoom = ref(16)
const maxZoom = ref(19)
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
  const mapInstance = map.value?.leafletObject

  if (leaflet && mapInstance) {
    // Reset any other styling
    leaflet.resetStyle()

    // Iterate over object entries and break early
    const layer: any = Object.values(leaflet._layers).find((layer: any) => layer.feature?.properties.identifier === id)

    if (layer) {
      // Store the crrent item
      filterStore.updateSelected('property', id, layer.feature.properties.naam)

      // Move the map to show the active item
      mapInstance.fitBounds(layer.getBounds(), { maxZoom: maxZoom.value, paddingTopLeft: [700, 0] })

      // Set the color of the current item
      layer.setStyle({
        fillOpacity: 1,
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

// Re-apply highlight after geoJsonData reloads
watch(geoJsonData, () => {
  if (selectedId.value) {
    // Wait for next tick to ensure layers are rendered
    nextTick(() => handleActiveState(selectedId.value))
  }
})
</script>

<style lang="scss" scoped>
.map-wrapper {
  position:relative;
  height: 100%;
  width: 100%;
}
</style>
