<template>
  <template v-if="isEmpty">
    <span class="empty-text">Nog geen informatie</span>
    <a
      class="empty-cta"
      href="https://www.goudatijdmachine.nl/help-je-mee/"
      target="gtm"
    >Help je mee?!</a>
  </template>
  <template v-else>
    <PopupSection
      v-if="data.adressen?.length"
      title="Adressen door de tijd heen"
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
const props = defineProps<{
  data: PropertyDetailResponse
}>()

const isEmpty = computed<boolean>(() => {
  const total = (props.data.adressen?.length || 0)
    + (props.data.personen?.length || 0)
    + (props.data.fotos?.length || 0)

  return total === 0
})
</script>

<style lang="scss" scoped>
  .empty-text {
    color: var(--red);
    text-align: center;
  }
  .empty-cta {
    text-align: center;
    margin-top: var(--space-4);
    color: var(--blue);
    font-weight: var(--font-weight-semibold);
  }
</style>
