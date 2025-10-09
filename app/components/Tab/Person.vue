<template>
  <div class="person-tab">
    <ControlsSearch
      type="person"
      placeholder="Zoek op naam of adres..."
    />
    <ul class="results">
      <li
        v-for="(card, index) in people"
        :key="index"
      >
        <CardPerson
          :card="card"
          :selected="selectedPersonId === card.id"
          @click="selectedPersonId = card.id"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const { people, selectedPersonId } = storeToRefs(usePersonStore())
</script>

<style lang="scss" scoped>
.person-tab {
  @include flex-column;
  gap: var(--space-4);
}

.results {
  @include flex-column;
  gap: var(--space-2);
}
</style>
