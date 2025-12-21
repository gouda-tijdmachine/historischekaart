<template>
  <PopupSection title="Adressen door de tijd heen">
    <PopupRelatedList :items="data.adressen">
      <template #item="item">
        <PopupItemsAddress :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopupSection title="Bewoners/eigenaars van dit pand">
    <PopupRelatedList :items="data.personen">
      <template #item="item">
        <PopupItemsPerson :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopupSection title="Historische plaatjes">
    <PopupRelatedList :items="data.fotos">
      <template #item="item">
        <PopupItemsImage :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
</template>

<script setup lang="ts">
defineProps<{
  data: PropertyDetailResponse
}>()
</script>
