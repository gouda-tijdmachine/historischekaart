<template>
  <div class="map-popup">
    <div class="header">
      <TextTitle
        icon-name="lucide-house"
        class="title"
      >
        {{ item.properties.title }}
      </TextTitle>
      <button
        class="close-button"
        @click="$emit('close')"
      >
        <Icon name="lucide:x" />
      </button>
    </div>

    <div class="content">
      <!-- TODO: Fix this! -->
      <div
        v-for="(value, key) in item.properties"
        :key="key"
        class="property-row"
      >
        <span class="property-key">{{ key }}:</span>
        <span class="property-value">{{ value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  item: Feature
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style lang="scss" scoped>
.map-popup {
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
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
