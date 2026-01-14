<template>
  <div
    id="osd-popover"
    ref="popoverElement"
    class="osd-popover"
    popover="auto"
  >
    <BaseButton
      title="Sluiten"
      class="close-btn"
      popovertargetaction="hide"
      popovertarget="osd-popover"
    >
      Sluiten
    </BaseButton>

    <div class="zoom-buttons">
      <BaseButton
        id="zoom-in-btn"
        icon="lucide:plus"
        class="zoom-btn"
        :disabled="maxZoomed"
      />
      <BaseButton
        id="zoom-out-btn"
        icon="lucide:minus"
        class="zoom-btn"
        :disabled="minZoomed"
      />
    </div>

    <div class="info-footer">
      {{ infoFooterText }}
    </div>

    <div
      id="osd"
      class="viewer"
    />
  </div>
</template>

<script setup lang="ts">
import type { Viewer } from 'openseadragon'

/**
 * State & Props
 */
const viewer = ref<Viewer>()
const popoverElement = ref<HTMLDivElement>()
const minZoomed = ref<boolean>(false)
const maxZoomed = ref<boolean>(false)

const props = defineProps<{
  data?: ImageDetailResponse
}>()

/**
 * Computed properties
 */
const IIIFEndpoint = computed<string>(() => {
  return props.data!.iiif_info_json
})

const infoFooterText = computed<string>(() => {
  return [
    props.data?.titel,
    props.data?.vervaardiger,
    props.data?.datering,
  ]
    .filter(Boolean)
    .join(', ')
})

/**
 * Methods
 */
// Update zoom constraints
const updateZoomConstraints = () => {
  // Fetch the viewer and early exit if doesn't exists.
  const client = unref(viewer)
  if (!client) {
    return
  }

  // Fetch the current zoom level and update constraints
  const currentZoom = client.viewport.getZoom()

  // Disable zoom buttons if we reach min/max zoom levels
  minZoomed.value = currentZoom <= 0.5
  maxZoomed.value = currentZoom >= 3.0
}

const initializeOSD = async () => {
  const OpenSeadragon = (await import('openseadragon')).default

  const client = OpenSeadragon({
    id: 'osd',
    crossOriginPolicy: 'Anonymous',
    preserveViewport: true,
    immediateRender: false,
    sequenceMode: false,
    tileSources: IIIFEndpoint.value,
    gestureSettingsTouch: {
      pinchToZoom: false,
      flickEnabled: true,
    },
    gestureSettingsMouse: {
      clickToZoom: false,
      dblClickToZoom: false,
    },
    visibilityRatio: 1.0,
    constrainDuringPan: true,
    minZoomLevel: 0.5,
    maxZoomLevel: 3,
    wrapHorizontal: false,
    wrapVertical: false,
    panHorizontal: true,
    panVertical: true,
    navigationControlAnchor: OpenSeadragon.ControlAnchor.TOP_LEFT,
    showNavigationControl: true,
    zoomInButton: 'zoom-in-btn',
    zoomOutButton: 'zoom-out-btn',
    showFullPageControl: false,
    showHomeControl: false,
    showRotationControl: false,
  })

  // Add the zoom handler and update the viewer
  client.addHandler('animation-finish', updateZoomConstraints)
  viewer.value = client
}

const cleanupOSD = () => {
  if (viewer.value) {
    viewer.value.destroy()
    viewer.value = undefined
    minZoomed.value = false
    maxZoomed.value = false
  }
}

onMounted(() => {
  if (!popoverElement.value) return

  popoverElement.value.addEventListener('toggle', (event: Event) => {
    const target = event.target as HTMLElement
    const isOpen = target.matches(':popover-open')

    if (isOpen) {
      initializeOSD()
      updateZoomConstraints()
    }
    else {
      cleanupOSD()
    }
  })
})
</script>

<style lang="scss" scoped>
// Fullscreen Popover
.osd-popover {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  padding: 0;
  margin: 0;
  background-color: var(--gray-3);
  display: flex;
  flex-direction: column;
  z-index: 9999;

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:not(:popover-open) {
    display: none;
  }
}

.close-btn {
  position: absolute;
  top: var(--space-3);
  right: 0;
  z-index: 10000;
  width: fit-content;
  padding: var(--space-2) var(--space-3);
}

.zoom-buttons {
  position: absolute;
  left: var(--space-3);
  top: var(--space-3);
  display: flex;
  flex-direction: column;
  z-index: 10000;
  gap: 0;

  .zoom-btn {
    cursor: pointer;
    width: var(--space-8);
    height: var(--space-8);
    background-color: var(--white);
    border: var(--border-width) solid var(--gray-5);
    color: var(--black);
    transition: background-color 200ms ease, color 200ms ease;
    place-items: center;

    &:hover:not(:disabled) {
      background-color: var(--gray-2);
    }

    &:disabled {
      cursor: default;
      color: var(--gray-6);
      background-color: var(--gray-2);
    }

    &:first-child {
      border-bottom: none;
    }
  }
}

.info-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--gray-1);
  padding: var(--space-2) var(--space-3);
  border-top: var(--border-width) solid var(--border-color);
  border-right: var(--border-width) solid var(--border-color);
  max-width: 50%;
  font-size: var(--font-size-sm);
  color: var(--off-black);
  z-index: 10000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.viewer {
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
