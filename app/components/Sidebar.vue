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
          popovertarget="about-popover"
          popovertargetaction="toggle"
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
const filterStore = useFilterStore()
const isMobile = useIsMobile()
// bij een deeplink (elke URL met een hash: person/pand/plaatje) start het
// zoekpaneel ingeklapt, zodat de popup en de kaart direct zichtbaar zijn
const heeftDeeplink = Boolean(useRoute().hash)
const isOpen = ref(!isMobile.value && !heeftDeeplink)

watch(isMobile, mobile => isOpen.value = !mobile)

// Op mobiel bedekt het zoekpaneel de kaart, dus ruim het op zodra er iets gekozen is
watch(() => filterStore.selectedId, (id) => {
  if (id && isMobile.value) {
    isOpen.value = false
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 0;
  min-width: 0;
  transition: width 300ms ease-in-out;
  border-right: 1px solid var(--border-color);
  padding: var(--sidebar-padding);

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

  // De content is breder dan de dichtgeklapte sidebar en steekt eroverheen.
  // opacity: 0 vangt nog steeds kliks, dus die moeten hier expliciet uit.
  &:not(.is-open) .sidebar-content {
    pointer-events: none;
  }

  // Op mobiel schuift de sidebar als overlay over de kaart. Schuiven met `left`
  // en niet met `transform`, anders wordt deze sidebar het containing block van
  // de chevron-knop en kan die niet meer buiten de sidebar uitsteken.
  @include mobile {
    position: fixed;
    top: 0;
    bottom: 0;
    left: calc(-1 * var(--max-sidebar-width));
    width: var(--max-sidebar-width);
    // Boven de leaflet-controls (.leaflet-top is 1000), onder .map-popup
    z-index: 1010;
    border-right: none;
    background-color: var(--white);
    transition: left 300ms ease-in-out;

    &.is-open {
      left: 0;
      box-shadow: var(--shadow-1);
    }
  }
}

.sidebar-content {
  height: 100%;
  display: grid;
  grid-template-columns: calc(var(--max-sidebar-width) - 2 * var(--sidebar-padding) - 1px);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "tabs";
  gap: var(--space-4);
  opacity: 0;
  transition: opacity 300ms ease-in-out;

  @include mobile {
    // Zichtbaarheid komt van de left-slide, niet van opacity
    opacity: 1;
  }
}

.header {
  grid-area: header;
  display: grid;
  grid-template-columns: var(--space-8) auto var(--space-8);
  grid-template-rows: 1fr;
  grid-template-areas: "logo title help";
  gap: var(--space-4);
  align-items: center;

  @include mobile {
    grid-template-columns: var(--space-10) minmax(0, 1fr) var(--space-11);
    gap: var(--space-2);
  }
}

.title {
  grid-area: title;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: var(--space-4);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);

  @include mobile {
    // Laat de titel afbreken in plaats van hem af te kappen
    white-space: normal;
    justify-content: flex-start;
  }
}

.logo {
  grid-area: logo;
  display: inline-flex;
  justify-self: flex-start;
  width: var(--space-10);
  height: var(--space-10);
}

.help {
  grid-area: help;
  justify-self: flex-end;
  width: var(--space-8);
  height: var(--space-8);

  @include mobile {
    width: var(--space-11);
    height: var(--space-11);
  }
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

  @include mobile {
    // Rijdt mee met de sidebar: dichtgeklapt steekt de knop aan de linker
    // schermrand uit, uitgeklapt staat hij op de strook kaart rechts. De
    // offset is gelijk aan de breedte, anders valt hij deels buiten beeld.
    right: calc(-1 * var(--space-11));
    width: var(--space-11);
    height: var(--space-11);
    z-index: 1011;
  }
}
</style>
