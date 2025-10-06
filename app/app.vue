<template>
  <div class="grid">
    <div class="sidebar" />
    <div class="main" />
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.grid {
  height: 100dvh;
  margin-inline: auto;
  max-width: var(--max-container-width);
  width: 100%;
  background-color: var(--background);

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "sidebar main";
}

.sidebar {
  grid-area: sidebar;
}

.main {
  grid-area: main;
}
</style>
