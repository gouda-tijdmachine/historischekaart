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
        ref="geojson"
        :geojson="geojsonData"
        :options="geojsonOptions"
      />
    </LMap>

    <!-- Custom Popup Panel -->
    <!-- Temporary disabled - until stores are fixed -->
    <!-- <MapPopup
      v-if="selectedPropertyId"
      :id="selectedPropertyId"
      @close="selectedPropertyId = undefined"
    /> -->
  </div>
</template>

<script setup lang="ts">
const layerStore = useLayerStore()
const filterStore = useFilterStore()
const propertyStore = usePropertyStore()
const { selectedTileLayer, selectedWmsLayer } = storeToRefs(layerStore)
const { currentYear } = storeToRefs(filterStore)
const { selectedPropertyId } = storeToRefs(propertyStore)

const zoom = ref(17)
const minZoom = ref(16)
const maxZoom = ref(17)
const map = ref()
const geojson = ref()

// GeoJSON data - you can load this from a file or API
const geojsonData = ref<FeatureCollection>()

// GeoJSON styling options
const geojsonOptions = {
  onEachFeature: (feature: Feature, layer: any) => {
    layer.on('click', (_: any) => {
      handleActiveState(feature.properties.identifier)
    })

    layer.on('mouseout', (_: any) => {
      if (feature.properties.identifier !== selectedPropertyId.value) {
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
      selectedPropertyId.value = id

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
  geojsonData.value = await useCallApi(`pandgeometrieen/${newValue}`)
}, { immediate: true })

watch(selectedPropertyId, (newValue) => {
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
