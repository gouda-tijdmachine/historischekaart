<template>
  <div class="person-tab">
    <div class="controls">
      [search input]
      [dropdown 1] [dropdown 1]
      [button]
    </div>
    <ul class="results">
      <li
        v-for="(card, index) in cards"
        :key="index"
      >
        <CardPerson
          :card="card"
          :selected="selectedId === card.id"
          @click="handleClick(card)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const selectedId = ref<string>()
const cards = ref<PersonCard[]>([
  {
    id: '1',
    name: 'Gerrit Corneliszoon',
    year: 1701,
    address: 'Wijk A No. 23',
    buildingId: 'building-1',
    relation: 'huurder',
    source: 'Belastingregister',
  },
  {
    id: '2',
    name: 'Neeltje van der Pol',
    year: 1705,
    address: 'Westhaven 18',
    buildingId: 'building-2',
    relation: 'persoon',
    source: 'Lidmatenboek',
  },
  {
    id: '3',
    name: 'Adriaan de Vries',
    year: 1712,
    address: 'Kleiweg 28-30',
    buildingId: 'building-2',
    relation: 'eigenaar',
    source: 'Kadaster',
    notes: 'Eigenaar volgens vroege kadastrale aantekeningen',
  },
  {
    id: '4',
    name: 'Grietje Hendriksdochter',
    year: 1718,
    address: 'Nieuwe Gouwe 45',
    buildingId: 'building-3',
    relation: 'persoon',
    source: 'Doopboek',
  },
  {
    id: '5',
    name: 'Cornelis van Houten',
    year: 1725,
    address: 'Wijk C No. 8',
    buildingId: 'building-4',
    relation: 'huurder',
    source: 'Gilderegister',
  },
])

const handleClick = (card: PersonCard) => {
  selectedId.value = card.id
}
</script>

<style lang="scss" scoped>
.property-tab {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.results {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
