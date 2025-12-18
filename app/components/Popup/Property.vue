<template>
  <PopupSection title="Adresvermeldingen">
    <PopupRelatedList :items="data.adressen">
      <template #item="item">
        <PopupItemsAddress :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopupSection title="Uitgelichte personen">
    <PopupRelatedList :items="data.personen">
      <template #item="item">
        <PopupItemsPerson :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopupSection title="Historische foto's">
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
