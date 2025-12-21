<template>
  <div
    class="sidebar"
    :class="{ 'is-open': isOpen }"
  >
    <div class="sidebar-content">
      <div class="title">
        <a
          href="https://www.goudatijdmachine.nl/"
          target="gtm"
        ><img
          src="/logo.svg"
          alt="Beeldmerk Gouda Tijdmachine"
          class="logo"
        ></a>
        <span class="value">
          Zoeken in de Gouda Tijdmachine
        </span>
      </div>
      <Tabs
        class="tabs"
        :tabs="tabConfig"
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
    <div
      class="btn"
      @click="isOpen = !isOpen"
    >
      <Icon
        class="icon-lg"
        name="lucide:chevron-right"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(true)

const tabConfig: Tab[] = [
  { id: 'property', label: 'Panden', icon: 'lucide:home' },
  { id: 'person', label: 'Personen', icon: 'lucide:user' },
  { id: 'image', label: 'Plaatjes', icon: 'lucide:image' },
]
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

    .btn {
      .icon-lg {
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
    "title"
    "tabs";
  gap: var(--space-4);
  opacity: 0;
  transition: opacity 300ms ease-in-out;
}

.title {
  grid-area: title;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--space-4);

  .logo {
    width: 1.5rem;
    height: 1.5rem;
    flex-shrink: 0;
  }

  .value {
    white-space: break-spaces;
  }
}

.tabs {
  grid-area: tabs;
  min-height: 0;
}

.btn {
  position: absolute;
  top: 50%;
  right: calc(-1 * var(--space-4));
  width: var(--space-8);
  height: var(--space-8);
  background-color: var(--blue);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 401; // Higher than leaflet map

  .icon-lg {
    color: var(--white);
  }

  &:hover {
    background-color: var(--red);
  }
}
</style>
