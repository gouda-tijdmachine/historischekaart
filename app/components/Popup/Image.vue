<template>
  <PopupSection>
    <div class="thumbnail-area">
      <img
        :src="data.thumbnail"
        class="thumbnail"
      >
      <BaseButton
        title="Vergroot"
        icon="lucide:eye"
        @click="open"
      />
    </div>
    <PopupProperties
      :data="data"
      :properties="supportedProperties"
    />
  </PopupSection>

  <PopupSection title="Locaties">
    <PopupRelatedList :items="streets">
      <template #item="item">
        <PopupItemsStreet :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>

  <PopupSection title="Gerelateerde Panden">
    <PopupRelatedList :items="panden">
      <template #item="item">
        <PopupItemsProperty :item="item" />
      </template>
    </PopupRelatedList>
  </PopupSection>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  data: ImageDetailResponse
}>()

const supportedProperties = computed<string[]>(() => {
  return ['datering', 'vervaardiger']
})

const streets = computed(() => {
  return props.data.straten
})

const panden = computed(() => {
  return props.data.pandidentifiers.map((id: string, index: number) => {
    return {
      identifier: id,
      naam: `Pand #${index + 1}`,
    }
  })
})

const open = () => {
  filterStore.selectedImage = props.data
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
</style>
