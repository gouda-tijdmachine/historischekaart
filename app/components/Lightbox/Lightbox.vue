<template>
  <div class="lightbox-background">
    <div class="lightbox-container">
      <div class="header">
        <div class="info">
          <h3 class="title">
            {{ title }}
          </h3>
          <span class="extra">
            {{ extra_info }}
          </span>
        </div>
        <div class="buttons">
          <BaseButton
            class="btn-osd icon-lg"
            icon="lucide:zoom-out"
            :disabled="minZoomed"
            @click="zoomOut"
          />
          <span class="percentage">
            {{ zoomPercentage }}
          </span>
          <BaseButton
            class="btn-osd icon-lg"
            icon="lucide:zoom-in"
            :disabled="maxZoomed"
            @click="zoomIn"
          />
          <BaseButton
            class="btn-osd icon-lg"
            icon="lucide:x"
            @click="lightboxStore.data = undefined"
          />
        </div>
      </div>
      <div
        id="osd"
        class="viewer"
      />
      <div class="notion">
        <span v-if="data?.informatie_auteursrechten">Auteurs Rechten: {{ data?.informatie_auteursrechten }}</span>
        <span v-if="data?.bronbronorganisatie">
          Bron:
          <template v-if="data?.url">
            <a
              :href="data?.url"
              target="_blank"
              rel="noopener noreferrer"
              class="link"
            >
              {{ data?.bronbronorganisatie }}
            </a>
          </template>
          <template v-else>
            {{ data?.bronbronorganisatie }}
          </template>
        </span>
        <CardSubtitle>{{ streets.join(', ') }}</CardSubtitle>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Viewer } from 'openseadragon'

/**
 * State & Props
 */
const lightboxStore = useLightboxStore()
const { data } = storeToRefs(lightboxStore)
const viewer = ref<Viewer>()
const zoomFactor = ref<number>(1.0)

/**
 * Computed Properties
 */
const IIIFEndpoint = computed<string>(() => {
  return unref(data)!.iiif_info_json
})

const title = computed<string>(() => {
  return unref(data)!.titel
})

const extra_info = computed<string>(() => {
  const image = unref(data)!
  const extra_info = [image.datering, image.vervaardiger]
  return extra_info.join(' • ')
})

const minZoomed = computed<boolean>(() => {
  return (zoomFactor.value <= 0.5)
})

const maxZoomed = computed<boolean>(() => {
  return (zoomFactor.value >= 3.0)
})

const zoomPercentage = computed<string>(() => {
  return `${zoomFactor.value * 100}%`
})

const streets = computed<string[]>(() => {
  return unref(data)!.straten.map((straat: Record<string, string>) => {
    return straat.naam!
  })
})

/**
 * Methods
 */
const zoomOut = () => {
  if (!minZoomed.value && viewer.value) {
    zoomFactor.value = Math.max(0.5, zoomFactor.value - 0.25)
    const homeZoom = viewer.value.viewport.getHomeZoom()
    viewer.value.viewport.zoomTo(homeZoom * zoomFactor.value, undefined, true)
  }
}

const zoomIn = () => {
  if (!maxZoomed.value && viewer.value) {
    zoomFactor.value = Math.min(3.0, zoomFactor.value + 0.25)
    const homeZoom = viewer.value.viewport.getHomeZoom()
    viewer.value.viewport.zoomTo(homeZoom * zoomFactor.value, undefined, true)
  }
}

/**
 *
 */
onMounted(async () => {
  const OpenSeadragon = (await import('openseadragon')).default

  viewer.value = OpenSeadragon({
    id: 'osd',
    crossOriginPolicy: 'Anonymous',
    showNavigationControl: false,
    preserveViewport: true,
    immediateRender: false,
    sequenceMode: false,
    tileSources: IIIFEndpoint.value,

    // Disable ALL zoom interactions
    zoomPerScroll: 1.0,
    zoomPerClick: 1.0,
    zoomPerSecond: 1.0,
    gestureSettingsTouch: {
      pinchToZoom: false,
      flickEnabled: true,
    },
    gestureSettingsMouse: {
      scrollToZoom: false,
      clickToZoom: false,
      dblClickToZoom: false,
    },

    // Prevent boundary zoom-out behavior
    visibilityRatio: 1.0,
    constrainDuringPan: true,
    minZoomLevel: 0.1,
    maxZoomLevel: 5,
    wrapHorizontal: false,
    wrapVertical: false,
    panHorizontal: true,
    panVertical: true,
  })
})
</script>

<style lang="scss" scoped>
.lightbox-background {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgb(from var(--off-black) r g b / 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: auto;
}

.lightbox-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: "header" "viewer" "notion";
  position: relative;
  background-color: transparent;
  overflow: hidden;
  height: 90vh;
  width: 90vw;
}

.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--gray-1);
  padding: var(--space-4);
  margin-bottom: var(--space-4);

  .info {
    display: flex;
    flex-direction: column;

    .title {
      @include text-ellipsis;
    }

    .extra {
      @include text-sm;
      color: var(--gray-3);
    }
  }

  .buttons {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--space-2);

    .percentage {
      @include text-sm;
      color: var(--gray-3);
    }

    .btn-osd {
      aspect-ratio: 1;
      color: var(--blue);
      background-color: transparent;
      border: var(--border-width) solid var(--blue);
      transition: color 200ms ease;

      &:hover {
        color: var(--gray-1);
        background-color: var(--blue);
      }
    }
  }
}

.viewer {
  grid-area: viewer;
  position: relative;
  width: 100%;
  height: 100%;
  background-color: var(--gray-3);
}

.notion {
  grid-area: notion;
  display: flex;
  flex-direction: column;
  background-color: var(--gray-1);
  padding: var(--space-4);
  margin-top: var(--space-4);
}
</style>
