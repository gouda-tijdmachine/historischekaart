<template>
  <div class="section">
    <h3 v-if="title">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<style lang="scss" scoped>
.section {
  @include flex-column;
  @include text-sm;
  color: var(--gray-3);
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-width) solid var(--border-color);
  margin-bottom: var(--space-4);

  h3 {
    color: var(--off-black);
  }
}
</style>
