<template>
  <CardBase
    :title="card.name"
    :selected="selected"
    icon-name="lucide:user"
  >
    <template #subtitle>
      <CardSubtitle>
        {{ card.address }}
      </CardSubtitle>
    </template>

    <template #meta-content>
      <CardMeta>
        {{ card.relation }}
      </CardMeta>
      <CardMeta>
        {{ card.source }}
      </CardMeta>
    </template>

    <template #badges>
      <Tag :value="card.year" />
      <!-- TODO: Figure out what to do with this -->
      <div class="map-status">
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
defineProps<{
  selected?: boolean
  card: PersonCard
}>()
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
  color: #d22e25;
  font-weight: var(--font-weight-medium);
}
</style>
