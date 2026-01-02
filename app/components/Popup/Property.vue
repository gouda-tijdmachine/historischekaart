<template>
  <template v-if="isEmpty">
    <div class="empty-message">
      <Icon
        :name="filterStore.iconName('property')"
        class="icon"
      />
      <span class="message">Nog geen zoekresultaten</span>
    </div>
  </template>
  <template v-else>
    <PopupSection
      v-if="data.adressen?.length"
      title="Adressen door de tijd heen"
      anchor="adressen"
    >
      <PopupRelatedList
        :items="data.adressen"
      >
        <template #item="item">
          <PopupItemsAddress :item="item" />
        </template>
      </PopupRelatedList>
    </PopupSection>
    <PopupSection
      v-if="data.personen?.length"
      title="Bewoners/eigenaars van dit pand"
      anchor="personen"
    >
      <PopupRelatedList :items="data.personen">
        <template #item="item">
          <PopupItemsPerson :item="item" />
        </template>
      </PopupRelatedList>
    </PopupSection>
    <PopupSection
      v-if="data.fotos?.length"
      title="Historische plaatjes"
      anchor="fotos"
    >
      <PopupRelatedList :items="data.fotos">
        <template #item="item">
          <PopupItemsImage :item="item" />
        </template>
      </PopupRelatedList>
    </PopupSection>
  </template>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  data: PropertyDetailResponse
}>()

const isEmpty = computed<boolean>(() => {
  const total = (props.data.adressen?.length || 0)
    + (props.data.personen?.length || 0)
    + (props.data.fotos?.length || 0)

  return total === 0
})

const anchorSections = computed(() => {
  const sections = []

  if (props.data.adressen?.length) {
    sections.push({ id: 'adressen', label: 'Adressen' })
  }

  if (props.data.personen?.length) {
    sections.push({ id: 'personen', label: 'Bewoners/Eigenaars' })
  }

  if (props.data.fotos?.length) {
    sections.push({ id: 'fotos', label: 'Plaatjes' })
  }

  return sections
})

defineExpose({
  anchorSections,
})
</script>

<style lang="scss" scoped>
  .empty-message {
    @include flex-column;
    @include flex-center;
    height: 100%;
    color: var(--gray-4);
    gap: var(--space-4);

    .icon {
      width: var(--space-12);
      height: var(--space-12);
    }

    .message {
      @include text-lg;
      font-weight: var(--font-weight-medium);
    }
  }
</style>
