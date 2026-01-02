<template>
  <div
    id="about-popover"
    class="about-popover"
    popover="auto"
  >
    <div class="header">
      <TextTitle
        icon-name="lucide:circle-question-mark"
        class="title"
      >
        Hulp bij Gouda Tijdmachine
      </TextTitle>
      <p class="subtitle">
        Ontdek hoe u de interactieve historische kaart gebruikt om door de tijd te reizen
      </p>
      <label class="checkbox">
        <input
          v-model="hideOnStartup"
          type="checkbox"
        >
        Niet meer laten zien
      </label>
      <BaseButton
        class="icon-lg close-btn"
        icon="lucide:x"
        popovertarget="about-popover"
        popovertargetaction="hide"
      />
    </div>

    <div class="viewer">
      <PopupSection title="Wat is de Gouda Tijdmachine?">
        <div class="content">
          <div class="description">
            <p>Gouda Tijdmachine is een interactieve historische kaart waarmee u door de tijd kunt reizen om de ontwikkeling van Gouda te ontdekken.</p>
            <p>U kunt zoeken naar historische personen, de geschiedenis van panden bekijken en foto's uit het verleden verkennen.</p>
            <p>Gebruik de tijdlijn bovenaan om een specifiek jaar of periode te selecteren. De kaart toont dan alleen de informatie die relevant is voor die tijd.</p>
          </div>
        </div>
      </PopupSection>

      <PopupSection title="Kaartlagen en bronnen">
        <div class="content">
          <div class="description">
            <p>Via het dropdown-menu rechtsboven de kaart kunt u verschillende kaartlagen selecteren om verschillende perspectieven te krijgen:</p>
          </div>
        </div>
        <PopupRelatedList :items="layers">
          <template #item="item">
            <PopupItemsExplanation :item="item" />
          </template>
        </PopupRelatedList>
      </PopupSection>

      <PopupSection title="Zoeken en navigeren">
        <div class="content">
          <div class="description">
            <p>Aan de linkerkant van het scherm bevindt zich een uitschuifbaar paneel met drie tabbladen voor verschillende zoekopties:</p>
          </div>
        </div>
        <PopupRelatedList :items="searchOptions">
          <template #item="item">
            <PopupItemsExplanation :item="item" />
          </template>
        </PopupRelatedList>
      </PopupSection>

      <PopupSection title="Tips voor gebruik">
        <PopupRelatedList :items="tips">
          <template #item="item">
            <PopupItemsExplanation :item="item" />
          </template>
        </PopupRelatedList>
      </PopupSection>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const config = useRuntimeConfig()

const hideOnStartup = computed<boolean>({
  get() {
    return localStorage.getItem(config.public.hideAboutKey) === 'true'
  },
  set(val: boolean) {
    localStorage.setItem(config.public.hideAboutKey, String(val))
  },
})

/**
 * Data
 */
const layers = [
  {
    id: 'historical-maps',
    title: 'Historische kaarten',
    description: 'originele kadastrale en topografische kaarten uit verschillende perioden',
    type: 'item',
  },
  {
    id: 'aerial-photos',
    title: 'Luchtfoto\'s',
    description: 'historische luchtopnames van 1977 tot 2024',
    type: 'item',
  },
  {
    id: 'modern-map',
    title: 'Moderne kaart',
    description: 'hedendaagse OpenStreetMap voor oriëntatie',
    type: 'item',
  },
] satisfies Item[]

const searchOptions = [
  {
    id: 'properties',
    title: 'Panden',
    description: 'bekijk de geschiedenis van specifieke gebouwen en hun bewoners',
    type: 'item',
  },
  {
    id: 'persons',
    title: 'Personen',
    description: 'zoek historische bewoners en ontdek waar zij woonden',
    type: 'item',
  },
  {
    id: 'photos',
    title: 'Plaatjes',
    description: 'verken historische beelden van straten en gebeurtenissen',
    type: 'item',
  },
] satisfies Item[]

const tips = [
  {
    id: 'begin-breed',
    title: 'Begin breed',
    description: 'Start met een ruime tijdspanne en verfijn vervolgens naar specifieke jaren',
    type: 'item',
  },
  {
    id: 'combineer-zoektermen',
    title: 'Combineer zoektermen',
    description: 'Gebruik meerdere filters samen voor gerichte resultaten',
    type: 'item',
  },
  {
    id: 'wissel-kaartlagen',
    title: 'Wissel kaartlagen',
    description: 'Bekijk verschillende perspectieven voor een volledig beeld',
    type: 'item',
  },
] satisfies Item[]
</script>

<style lang="scss" scoped>
.about-popover {
  position: fixed;
  max-width: 90vw;
  height: 90vh;
  border: none;
  padding: 0;
  margin: 0;
  background-color: var(--white);
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas: "header" "viewer";
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--radius-4);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.8);
  }

  &:not(:popover-open) {
    display: none;
  }
}

.header {
  grid-area: header;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "title icon"
    "subtitle subtitle"
    "action .";
  align-items: start;
  gap: var(--space-2);
  background-color: var(--white);
  padding: var(--space-4);
  border-bottom: var(--border-width) solid var(--border-color);

  .title {
    grid-area: title;
  }

  .close-btn {
    grid-area: icon;
    padding: 0;
    width: var(--space-8);
    height: var(--space-8);
  }

  .checkbox {
    grid-area: action;
  }

  .subtitle {
    @include text-sm;
    grid-area: subtitle;
    color: var(--gray-3);
    margin: 0;
  }
}

.viewer {
  grid-area: viewer;
  position: relative;
  width: 100%;
  height: 100%;
  padding: var(--space-4);
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
