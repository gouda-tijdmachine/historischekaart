<template>
  <div class="subtitle">
    <Icon
      name="lucide:map-pin"
      class="map-pin-icon"
    />
    <span class="subtitle-text">
      <slot />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.subtitle {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: var(--space-3);

  .subtitle-text {
    @include text-ellipsis;
    @include text-sm;
    color: var(--gray-3);
  }
}

.map-pin-icon {
  width: var(--space-3);
  height: var(--space-3);
}
</style>
