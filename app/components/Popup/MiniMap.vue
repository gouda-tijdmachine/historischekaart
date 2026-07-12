<template>
  <div class="mini-map-area">
    <LMap
      class="mini-map"
      :center="center"
      :zoom="20"
      :max-zoom="20"
      :use-global-leaflet="false"
      :options="mapOptions"
      @ready="onReady"
    >
      <LTileLayer
        layer-type="base"
        url="https://tileserver.huc.knaw.nl/{z}/{x}/{y}"
        :max-zoom="20"
      />
      <LCircleMarker
        :lat-lng="center"
        :radius="10"
        color="var(--red)"
        fill-color="var(--red)"
        :fill-opacity="1"
        :weight="2"
        :interactive="false"
      />
    </LMap>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  geometry: Feature['geometry']
}>()

// alle interactie en controls uit: de kaart gedraagt zich als een plaatje
const mapOptions = {
  zoomControl: false,
  attributionControl: false,
  dragging: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
  boxZoom: false,
  keyboard: false,
  touchZoom: false,
  tapHold: false,
}

// GeoJSON Point is [lng, lat], Leaflet verwacht [lat, lng]
const center = computed<[number, number]>(() => {
  const [lng, lat] = props.geometry.coordinates as number[]
  return [lat ?? 52.0115, lng ?? 4.7077]
})

const onReady = async (map: any) => {
  // de popup-layout kan na mount nog verschuiven (spinner → content)
  await nextTick()
  map.invalidateSize()
}
</script>

<style lang="scss" scoped>
.mini-map-area {
  aspect-ratio: 16 / 9;
  min-height: 0;
  width: 100%;
  // als plaatje: geen cursor- of scroll-interceptie door de leaflet-container
  pointer-events: none;

  .mini-map {
    width: 100%;
    height: 100%;
  }
}
</style>
