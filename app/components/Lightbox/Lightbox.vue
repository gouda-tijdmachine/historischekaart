<template>
  <div
    class="lightbox-background"
    @click="lightboxStore.close"
  >
    <div
      class="lightbox-container"
      @click.stop
    >
      <component
        :is="contentComponent"
        :data="data"
        @clear="lightboxStore.close"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const lightboxStore = useLightboxStore()
const { data, type } = storeToRefs(lightboxStore)

const contentComponent = computed(() => {
  switch (type.value) {
    case 'Gallery':
      return resolveComponent('LightboxGallery')
    case 'About':
      return resolveComponent('LightboxAbout')
    default:
      return 'div'
  }
})
</script>

<style lang="scss" scoped>
.lightbox-background {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgb(from var(--off-black) r g b / 0.8);
  display: flex;
  @include flex-center;
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
  max-width: 90vw;
}
</style>
