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
    </LMap>
  </div>
</template>

<script setup lang="ts">
const zoom = ref(15)
</script>

<style lang="scss" scoped>
.map-wrapper {
  height: 100%;
  width: 100%;
}
</style>
