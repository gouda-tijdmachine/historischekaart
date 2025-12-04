<template>
  <CardBase
    :title="card.name"
    :selected="selected"
    icon-name="lucide:user"
  >
    <template #meta-content>
      <CardMeta>
        {{ card.profession }}
      </CardMeta>
    </template>

    <template #badges>
      <Tag :value="card.year" />
      <div
        v-if="onMap"
        class="map-status"
      >
        <Icon
          name="lucide:house"
          class="map-icon"
        />
        <span class="map-text">Op kaart</span>
      </div>
    </template>
  </CardBase>
</template>

<script setup lang="ts">
const props = defineProps<{
  selected?: boolean
  card: PersonCard
}>()

/**
 * Computed Properties
 */
const onMap = computed<boolean>(() => {
  return !!useFilterStore().geoJsonData?.features.find((feature: Feature) => props.card.propertyIds.includes(feature.properties.identifier))
})
</script>

<style lang="scss" scoped>
.map-status {
  font-size: 0.625rem;
  color: var(--muted-foreground);
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.map-icon {
  flex-shrink: 0;
  width: var(--space-3);
  height: var(--space-3);
}

.map-text {
  color: var(--red);
  font-weight: var(--font-weight-medium);
}
</style>
