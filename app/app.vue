<template>
  <div
    class="grid"
    :inert="showModal"
  >
    <Sidebar class="sidebar" />
    <Main class="main" />
  </div>

  <Lightbox v-if="showModal" />
</template>

<script setup lang="ts">
// Support the lightbox
const lightboxStore = useLightboxStore()
const { showModal, hideOnStartup } = storeToRefs(lightboxStore)

// Initialize the store
await useFilterStore().initializeData()

onMounted(() => {
  if (!hideOnStartup.value) {
    lightboxStore.open('About')
  }
})
</script>

<style lang="scss" scoped>
.grid {
  height: 100dvh;
  margin-inline: auto;
  max-width: var(--max-container-width);
  width: 100%;

  display: grid;
  grid-template-columns: auto minmax(35rem, 1fr);
  grid-template-rows: 100dvh;
  grid-template-areas: "sidebar main";
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}
</style>
