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
      @close="selectedItem = null"
    />
  </div>
</template>

<script setup lang="ts">
const layerStore = useLayerStore()
const { selectedTileLayer, selectedWmsLayer } = storeToRefs(layerStore)

const zoom = ref(15)
const minZoom = ref(15)
const maxZoom = ref(17)
const selectedItem = ref<Feature>(null)

// GeoJSON data - you can load this from a file or API
const geojsonData = ref<featureCollection>(null)

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

// Load GeoJSON data (example)
onMounted(async () => {
  try {
    // List of GeoJSON URLs to fetch
    const urls = [
      // 'https://www.goudatijdmachine.nl/omeka/files/datasets/panden_1830.geojson', // Panden
      // 'https://www.goudatijdmachine.nl/geojson/92169', // Gebouwen
      // 'https://www.goudatijdmachine.nl/geojson/45964', // Wijken
      // 'https://www.goudatijdmachine.nl/geojson/2', // Streets
    ]

    // Fetch all GeoJSON files in parallel
    if (urls.length) {
      const responses = await Promise.all(urls.map(url => fetch(url)))
      const geojsons = await Promise.all(responses.map(res => res.json()))
      const merged = {
        type: 'FeatureCollection',
        features: geojsons.flatMap(gj => gj.features || []),
      }

      geojsonData.value = merged
    }
  }
  catch (error) {
    console.error('Error loading GeoJSON:', error)
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
