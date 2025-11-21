<template>
  <div class="grid">
    <Sidebar class="sidebar" />
    <Main class="main" />
  </div>
</template>

<script setup lang="ts">
const store = useFilterStore()
await store.fetchData()
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
