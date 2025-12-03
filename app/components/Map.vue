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
        v-if="geojsonData"
        :geojson="geojsonData"
        :options="geojsonOptions"
      />
    </LMap>

    <!-- Custom Popup Panel -->
    <MapPopup
      v-if="selectedItem"
      :item="selectedItem"
      @close="selectedItem = undefined"
    />
  </div>
</template>

<script setup lang="ts">
const layerStore = useLayerStore()
const filterStore = useFilterStore()
const propertyStore = usePropertyStore()
const { selectedTileLayer, selectedWmsLayer } = storeToRefs(layerStore)
const { currentYear } = storeToRefs(filterStore)
const { selectedPropertyId } = storeToRefs(propertyStore)

const zoom = ref(15)
const minZoom = ref(15)
const maxZoom = ref(17)
const selectedItem = ref<Feature>()

// GeoJSON data - you can load this from a file or API
const geojsonData = ref<FeatureCollection>()

// GeoJSON styling options
const geojsonOptions = {
  style: {
    color: '#ff0000',
    weight: 2,
    opacity: 0.8,
    fillColor: '#ff0000',
    fillOpacity: 0.3,
  },
  onEachFeature: (feature: Feature, layer: any) => {
    // Add click handler for custom popup
    layer.on('click', (e: any) => {
      // Set the selected Item to the current feature
      selectedItem.value = feature

      // Prevent map click event
      e.originalEvent.stopPropagation()
    })
  },
}

/**
 * Watchers
 */
watch(currentYear, async (newValue) => {
  geojsonData.value = await useCallApi(`pandgeometrieen/${newValue}`)
}, { immediate: true })

watch(selectedPropertyId, (newValue) => {
  const features = unref(geojsonData)?.features
  const feature = features?.find((feature: Feature) => feature.properties.identifier === newValue)
  selectedItem.value = feature
})
</script>

<style lang="scss" scoped>
.map-wrapper {
  position:relative;
  height: 100%;
  width: 100%;
}
</style>
