<template>
  <div class="title">
    <Icon
      v-if="iconName"
      class="icon"
      :name="iconName"
    />
    <span class="value">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconName?: string
}>()
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--space-4);

  .icon {
    color: var(--blue);
  }
}
</style>
