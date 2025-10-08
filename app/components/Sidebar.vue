<template>
  <div
    class="sidebar"
    :class="{ 'is-open': isOpen }"
  >
    <div class="sidebar-content">
      <TextTitle
        class="title"
        icon-name="material-symbols:database-outline"
      >
        Zoeken in de Gouda Tijdmachine
      </TextTitle>
      <Tabs
        class="tabs"
        :tabs="tabConfig"
      >
        <template #house>
          <HouseTab />
        </template>

        <template #person>
          <PersonTab />
        </template>

        <template #image>
          <ImageTab />
        </template>
      </Tabs>
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

const tabConfig: Tab[] = [
  { id: 'house', label: 'Panden', icon: 'lucide:home' },
  { id: 'person', label: 'Personen', icon: 'octicon:people-24' },
  { id: 'image', label: 'Foto\'s', icon: 'jam:picture' },
]
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 0;
  min-width: 0;
  transition: width 300ms ease-in-out;
  border-right: 1px solid var(--border-color);
  padding: var(--space-6) var(--space-6) 0 var(--space-6);

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
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "title"
    "tabs";
  gap: var(--space-4);
  overflow: hidden;
  white-space: nowrap;
}

.title {
  grid-area: title;
}

.tabs {
  grid-area: tabs;
}

.btn {
  position: absolute;
  top: 50%;
  right: calc(-1 * var(--space-4));
  width: var(--space-8);
  height: var(--space-8);
  background-color: var(--blue-light);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 401; // Higher than leaflet map

  .icon {
    color: var(--white);
  }
}
</style>
