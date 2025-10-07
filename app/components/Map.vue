<template>
  <div class="map-wrapper">
    <LMap
      ref="map"
      :zoom="zoom"
      :center="[52.0115, 4.7077]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />

      <LWmsTileLayer
        url="https://gis.gouda.nl/geoserver/CHRASTER/wms"
        :layers="'Jacob_van_Deventer'"
        attribution="<a href='https://gis.gouda.nl'>Gemeente Gouda</a>"
        :format="'image/png'"
        :transparent="true"
        name="Jacob_van_Deventer"
      />

      <LGeoJson
        v-if="geojsonData"
        :geojson="geojsonData"
        :options="geojsonOptions"
      />
    </LMap>
  </div>
</template>

<script setup lang="ts">
const zoom = ref(15)

// GeoJSON data - you can load this from a file or API
const geojsonData = ref(null)

// GeoJSON styling options
const geojsonOptions = {
  style: {
    color: '#ff0000',
    weight: 2,
    opacity: 0.8,
    fillColor: '#ff0000',
    fillOpacity: 0.3,
  },
  onEachFeature: (feature: any, layer: any) => {
    // Add popups or other interactions here
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(feature.properties.name)
    }
  },
}

// Load GeoJSON data (example)
onMounted(async () => {
  try {
    // Replace with your actual GeoJSON source
    const response = await fetch('https://www.goudatijdmachine.nl/geojson/2')
    geojsonData.value = await response.json()
  }
  catch (error) {
    console.error('Error loading GeoJSON:', error)
  }
})
</script>

<style lang="scss" scoped>
.map-wrapper {
  height: 100%;
  width: 100%;
}
</style>
