<template>
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
    <BaseButton
      class="icon-lg"
      icon="lucide:x"
      @click="$emit('clear')"
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
</template>

<script setup lang="ts">
defineProps<{
  data?: unknown
}>()

defineEmits<{
  clear: []
}>()

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
.header {
  grid-area: header;
  display: grid;
  grid-template-columns: auto var(--space-8);
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "title icon"
    "subtitle subtitle";
  align-items: center;
  background-color: var(--white);
  padding: var(--space-4);

  .title {
    grid-area: title;
  }

  .icon-lg {
    grid-area: icon;
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
}

.content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
</style>
