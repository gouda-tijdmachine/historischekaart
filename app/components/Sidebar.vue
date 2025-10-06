<template>
  <div
    class="sidebar"
    :class="{ 'is-open': isOpen }"
  >
    <div class="sidebar-content">
      <div class="title">
        <Icon
          class="icon"
          name="material-symbols:database-outline"
        />
        <span>Zoeken in de Gouda Tijdmachine</span>
      </div>
      <div class="tabs" />
      <div class="search" />
      <div class="results" />
    </div>
    <div
      class="btn"
      @click="isOpen = !isOpen"
    >
      <Icon
        class="icon"
        name="material-symbols:chevron-right"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(true)
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 0;
  min-width: 0;
  transition: width 300ms ease-in-out;
  border-right: 1px solid var(--border-color);

  &.is-open {
    width: var(--max-sidebar-width);

    .btn {
      .icon {
        transform: scaleX(-1);
      }
    }
  }
}

.sidebar-content {
  height: 100dvh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, auto);
  grid-template-areas:
    "title"
    "tabs"
    "search"
    "result";
  gap: var(--space-4);
  overflow: hidden;
  white-space: nowrap;
}

.title {
  grid-area: title;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
}

.tabs {
  grid-area: tabs;
}

.search {
  grid-area: search;
}

.results {
  grid-area: result;
}

.btn {
  position: absolute;
  top: 50%;
  right: calc(-1 * var(--space-4));
  width: var(--space-8);
  height: var(--space-8);
  background-color: var(--gouda-blue-light);
  display: flex;
  justify-content: center;
  align-items: center;

  .icon {
    color: var(--white);
  }
}

.icon {
  display: block;
  color: var(--gouda-blue);
  width: var(--space-8);
  height: var(--space-8);
}
</style>
