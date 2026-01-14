<template>
  <PopupSection anchor="details">
    <div class="thumbnail-area">
      <img
        :src="data.image"
        class="thumbnail"
      >
      <BaseButton
        title="Vergroot"
        icon="lucide:eye"
        popovertarget="osd-popover"
        popovertargetaction="toggle"
        @click="setPopoverData"
      />
    </div>
    <PopupProperties
      :data="data"
      :properties="supportedProperties"
    />
  </PopupSection>

  <PopupSection
    title="Straten"
    anchor="straten"
  >
    <PopupRelatedList :items="streets">
      <template #item="item">
        <PopupItemsStreet :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>

  <PopupSection
    title="Panden te zien op deze afbeelding"
    anchor="panden"
  >
    <PopupRelatedList :items="data.panden">
      <template #item="item">
        <PopupItemsProperty :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>

  <PopupSection
    v-if="data.fotos_dichtbij?.length"
    title="Foto's dichtbij"
    anchor="fotos"
  >
    <PopupRelatedList
      :items="data.fotos_dichtbij"
      use-div
      class="image-grid"
    >
      <template #item="item">
        <BaseImageButton
          v-if="item.thumbnail"
          :image="item.thumbnail"
          popovertarget="osd-popover"
          popovertargetaction="toggle"
          @click="setPopoverData(item)"
        />
      </template>
    </PopupRelatedList>
  </PopupSection>
  <PopoverImageViewer :data="imageData" />
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const props = defineProps<{
  data: ImageDetailResponse
}>()

const imageData = ref<ImageDetailResponse>()

/**
 * Computed properties
 */
const supportedProperties = computed<string[]>(() => {
  return ['datering', 'vervaardiger', 'bronbronorganisatie', 'informatie_auteursrechten']
})

const streets = computed(() => {
  return props.data.straten
})

const anchorSections = computed(() => {
  return [
    { id: 'details', label: 'Details' },
    { id: 'straten', label: 'Straten' },
    { id: 'panden', label: 'Panden' },
  ]
})

defineExpose({
  anchorSections,
})

const setPopoverData = (item?: CloseByImageResponse) => {
  imageData.value = (item ?? props.data) as ImageDetailResponse
}
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

.image-grid {
  :deep(.items) {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
  }
}
</style>
