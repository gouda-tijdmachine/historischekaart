<template>
  <div
    class="sidebar"
    :class="{ 'is-open': isOpen }"
  >
    <div class="sidebar-content">
      <div class="header">
        <a
          href="https://www.goudatijdmachine.nl/"
          class="logo"
          target="gtm"
        >
          <img
            src="/logo.svg"
            alt="Beeldmerk Gouda Tijdmachine"
          >
        </a>
        <TextTitle class="title">
          Zoeken in de Gouda Tijdmachine
        </TextTitle>
        <BaseButton
          icon="ic:baseline-question-mark"
          class="help"
          @click="lightboxStore.open('About')"
        />
      </div>
      <Tabs
        class="tabs"
        :tabs="filterStore.tabConfig"
      >
        <template #property>
          <TabProperty />
        </template>

        <template #person>
          <TabPerson />
        </template>

        <template #image>
          <TabImage />
        </template>
      </Tabs>
    </div>
    <BaseButton
      icon="lucide:chevron-right"
      class="slider"
      icon-large
      @click="isOpen = !isOpen"
    />
  </div>
</template>

<script setup lang="ts">
const lightboxStore = useLightboxStore()
const filterStore = useFilterStore()
const isOpen = ref(true)
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 0;
  min-width: 0;
  transition: width 300ms ease-in-out;
  border-right: 1px solid var(--border-color);
  padding: var(--space-6);

  &.is-open {
    width: var(--max-sidebar-width);

    .sidebar-content {
      opacity: 1;
    }

    .slider {
      :deep(.icon-lg) {
        transform: scaleX(-1);
      }
    }
  }
}

.sidebar-content {
  height: 100%;
  display: grid;
  grid-template-columns: calc(var(--max-sidebar-width) - 2 * var(--space-6) - 1px);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "tabs";
  gap: var(--space-4);
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}

.header {
  grid-area: header;
  display: grid;
  grid-template-columns: var(--space-6) auto var(--space-8);
  grid-template-rows: 1fr;
  grid-template-areas: "logo title help";
  gap: var(--space-4);
  align-items: center;
}

.title {
  grid-area: title;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--space-4);
}

.logo {
  grid-area: logo;
  display: inline-flex;
  justify-self: flex-start;
  width: var(--space-6);
  height: var(--space-6);
}

.help {
  grid-area: help;
  justify-self: flex-end;
  width: var(--space-8);
  height: var(--space-8);
}

.tabs {
  grid-area: tabs;
  min-height: 0;
}

.slider {
  position: absolute;
  top: 50%;
  right: calc(-1 * var(--space-4));
  width: var(--space-8);
  height: var(--space-8);
  z-index: 401; // Higher than leaflet map
}
</style>
