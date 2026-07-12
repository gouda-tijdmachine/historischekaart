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
        @ready="onGeoJsonReady"
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
const { currentYear, geoJsonData, selectedId, additionalHighlights } = storeToRefs(filterStore)
const isMobile = useIsMobile()

const zoom = ref(16)
const minZoom = ref(16)
const maxZoom = ref(19)
const map = ref()
const geojson = ref()
const geoJsonLayer = ref()

// GeoJSON styling options
const geojsonOptions = {
  style: (_feature: any) => ({
    color: 'var(--blue)',
    fillColor: 'var(--blue)',
    fillOpacity: 0.2,
    weight: 2,
  }),
  onEachFeature: (feature: Feature, layer: any) => {
    layer.on('click', (_: any) => {
      filterStore.updateSelected('property', feature.properties.identifier)
    })

    layer.on('mouseout', (_: any) => {
      if (feature.properties.identifier !== selectedId.value) {
        layer.setStyle({
          color: 'var(--blue)',
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
 * Computed Properties
 */
const mapLayerReady = computed(() => {
  return !!map.value?.leafletObject && !!geoJsonLayer.value
})

/**
 * Methods
 */
const onGeoJsonReady = (layer: any) => {
  geoJsonLayer.value = layer
}

const handleActiveState = (id: any) => {
  const leaflet = geojson.value?.leafletObject
  const mapInstance = map.value?.leafletObject

  if (leaflet && mapInstance) {
    // Reset any other styling
    leaflet.resetStyle()

    // Get the identifiers from any additional layers we need to highlight
    const ids = additionalHighlights.value?.map((highlight: { identifier: string }) => highlight.identifier)

    // Find the layers we need to activate
    const layers: any = Object.values(leaflet._layers).filter((layer: any) => [id, ...ids].includes(layer.feature?.properties.identifier))

    if (Array.isArray(layers) && layers.length) {
      // Reserve room for the popup panel on the left. On mobile it covers the
      // whole map, so there is nothing to move the item out from under.
      const containerWidth = mapInstance.getContainer().clientWidth
      const padLeft = isMobile.value
        ? 0
        : Math.min(containerWidth * 0.5 + 32, containerWidth * 0.6)

      layers.forEach((layer: any) => {
        if (layer.feature?.properties.identifier === id) {
          // Move the map to show the active selected item
          mapInstance.fitBounds(layer.getBounds(), { maxZoom: maxZoom.value, paddingTopLeft: [padLeft, 0] })
        }

        // Set the color of the current item
        layer.setStyle({
          fillOpacity: 1,
          color: 'var(--red)',
        })
      })

      // Bij een persoon- of plaatje-selectie is de selectie zelf geen
      // kaartlaag: zoom dan naar de gezamenlijke bounds van de
      // gerelateerde panden (de highlights)
      const zelf = layers.some((layer: any) => layer.feature?.properties.identifier === id)
      if (!zelf) {
        const bounds = layers[0].getBounds()
        layers.slice(1).forEach((layer: any) => bounds.extend(layer.getBounds()))
        mapInstance.fitBounds(bounds, { maxZoom: maxZoom.value, paddingTopLeft: [padLeft, 0] })
      }
    }
  }
}

// Leaflet merkt zelf alleen window-resizes op, niet het smaller/breder worden
// van de container door het in-/uitklappen van het zoekpaneel; zonder dit
// drijft een gefit pand uit het zichtbare kaartdeel. Debounce wacht de
// 300ms-sidebar-transitie af.
let resizeTimer: ReturnType<typeof setTimeout> | undefined
const resizeObserver = new ResizeObserver(() => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    const mapInstance = map.value?.leafletObject
    if (!mapInstance) {
      return
    }
    mapInstance.invalidateSize()
    if (selectedId.value) {
      handleActiveState(selectedId.value)
    }
  }, 150)
})

onBeforeUnmount(() => {
  clearTimeout(resizeTimer)
  resizeObserver.disconnect()
})

/**
 * Watchers
 */
watch(mapLayerReady, (ready) => {
  if (ready) {
    resizeObserver.disconnect()
    resizeObserver.observe(map.value.leafletObject.getContainer())
  }
})

watch(currentYear, async (newValue) => {
  filterStore.fetchGeoJson(newValue)
}, { immediate: true })

watch(
  [selectedId, mapLayerReady, additionalHighlights],
  async ([selectedId, newLayer]) => {
    if (selectedId && newLayer) {
      handleActiveState(selectedId)
    }
  },
)
</script>

<style lang="scss" scoped>
.map-wrapper {
  position:relative;
  height: 100%;
  width: 100%;
}
</style>
