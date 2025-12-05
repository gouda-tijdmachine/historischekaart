<template>
  <div class="address" />
  <div class="notes" />
  <div class="related">
    <h3>Gerelateerde informatie</h3>
    <PopupRelatedList
      icon="lucide:users"
      title="Uitgelichte personen"
      :items="data.personen"
    >
      <template #item="{ identifier, naam, datering, beroep }">
        <li class="item user">
          <Icon
            name="lucide:user"
            class="icon"
          />
          <button
            class="btn-link"
            @click="filterStore.updateSelected('person', identifier, naam)"
          >
            {{ naam }}
          </button>
          <span class="details">({{ datering }}{{ beroep ? `, ${beroep}` : '' }})</span>
        </li>
      </template>
    </PopupRelatedList>
    <PopupRelatedList
      icon="lucide:image"
      title="Historische foto's"
      :items="data.fotos"
    >
      <template #item="{ identifier, titel }">
        <li class="item image">
          <Icon
            name="lucide:image"
            class="icon"
          />
          <button
            class="btn-link"
            @click="filterStore.updateSelected('image', identifier, titel)"
          >
            {{ titel }}
          </button>
        </li>
      </template>
    </PopupRelatedList>
  </div>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
defineProps<{
  data: PropertyDetailResponse
}>()
</script>

<style lang="scss" scoped>
.address {
  height: 5rem;
  border-bottom: var(--border-width) solid var(--border-color);
  margin-bottom: var(--space-4);
}

.notes {
  height: 5rem;
  border-bottom: var(--border-width) solid var(--border-color);
  margin-bottom: var(--space-4);
}

.related {
  @include flex-column;
  @include text-sm;
  color: var(--gray-3);
  gap: var(--space-3);
}

.item {
  display: grid;
  gap: var(--space-2);

  &.user {
    grid-template-columns: var(--space-4) auto auto;

    .details {
      text-align: end;
    }
  }

  &.image {
    grid-template-columns: var(--space-4) auto;
  }

  .btn-link {
    padding: 0;
    background: transparent;
    border: none;
    color: var(--blue);
    cursor: pointer;
    text-align: start;

    &:hover {
      color: var(--red);
      text-decoration: underline;
    }
  }
}
</style>
