<template>
  <div class="map-popup">
    <div class="header">
      <TextTitle
        :icon-name="filterStore.iconName(filterStore.selectedType!)"
        class="title"
      >
        {{ filterStore.selectedTitle }}
      </TextTitle>
      <button
        class="close-button"
        @click="$emit('close')"
      >
        <Icon name="lucide:x" />
      </button>
    </div>

    <PopupAnchorBar
      v-if="!isLoading && anchorSections.length"
      :sections="anchorSections"
    />

    <div class="content">
      <BaseSpinner v-if="isLoading" />
      <component
        :is="contentComponent"
        v-else
        ref="contentRef"
        :data="data"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const { selectedId } = storeToRefs(filterStore)
const data = ref()
const isLoading = ref<boolean>(true)
const contentRef = ref()

defineEmits<{
  (e: 'close'): void
}>()

const anchorSections = computed(() => {
  return contentRef.value?.anchorSections || []
})

const contentComponent = computed(() => {
  switch (filterStore.selectedType) {
    case 'property':
      return resolveComponent('PopupProperty')
    case 'image':
      return resolveComponent('PopupImage')
    case 'person':
      return resolveComponent('PopupPerson')
    default:
      return 'div'
  }
})

watch(selectedId, async () => {
  try {
    isLoading.value = true
    data.value = await filterStore.fetchDetails()
  }
  finally {
    isLoading.value = false
  }
}, { immediate: true })
</script>

<style lang="scss" scoped>
.map-popup {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  bottom: var(--space-4);
  border: var(--border-width) solid var(--border-width);
  box-shadow: var(--shadow-1);
  z-index: 1000;
  overflow-y: auto;
  width: 50%;
}

.header {
  display: flex;
  align-items: self-start;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: var(--border-width) solid var(--border-color);

  .title {
    @include text-lg;
  }

  .close-button {
    display: flex;
    @include flex-center;
    width: var(--space-8);
    height: var(--space-8);

    &:hover {
      background-color: var(--gray-1);
    }
  }
}

.content {
  @include flex-column;
  flex: 1;
  padding: var(--space-4);
  overflow-y: auto;
}
</style>
