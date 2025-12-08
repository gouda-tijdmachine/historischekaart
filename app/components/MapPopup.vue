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

    <div class="content">
      <BaseSpinner v-if="isLoading" />
      <component
        :is="contentComponent"
        v-else
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

defineEmits<{
  (e: 'close'): void
}>()

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
  max-width: 50%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4);
  border-bottom: var(--border-width) solid var(--border-color);

  .title {
    @include text-lg;
  }

  .close-button {
    display: flex;
    justify-content: center;
    align-items: center;
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

.property-row {
  display: flex;
  margin-bottom: var(--space-2);

  &:last-child {
    margin-bottom: 0;
  }
}

.property-key {
  font-weight: var(--font-weight-medium);
  color: var(--grey);
  min-width: 100px;
  margin-right: var(--space-2);
}

.property-value {
  word-break: break-word;
}
</style>
