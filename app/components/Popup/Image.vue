<template>
  <PopupSection>
    <div class="thumbnail-area">
      <img
        :src="data.image"
        class="thumbnail"
      >
      <BaseButton
        title="Vergroot"
        icon="lucide:eye"
        @click="lightboxStore.open('Gallery', data)"
      />
    </div>
    <PopupProperties
      :data="data"
      :properties="supportedProperties"
    />
  </PopupSection>

  <PopupSection title="Straten">
    <PopupRelatedList :items="streets">
      <template #item="item">
        <PopupItemsStreet :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>

  <PopupSection title=" Panden te zien op deze afbeelding">
    <PopupRelatedList :items="data.panden">
      <template #item="item">
        <PopupItemsProperty :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const lightboxStore = useLightboxStore()
const props = defineProps<{
  data: ImageDetailResponse
}>()

/**
 * Computed properties
 */
const supportedProperties = computed<string[]>(() => {
  return ['datering', 'vervaardiger']
})

const streets = computed(() => {
  return props.data.straten
})
</script>

<style lang="scss" scoped>
.thumbnail-area {
  position: relative;
  aspect-ratio: 16 / 9;
  min-height: 0;

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .btn {
    position: absolute;
    top: var(--space-2);
    right: var(--space-2);
    width: unset;
    padding: var(--space-1) var(--space-2);
    gap: var(--space-2);
  }
}
</style>
