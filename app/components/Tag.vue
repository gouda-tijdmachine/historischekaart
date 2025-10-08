<template>
  <div class="tag text-sm">
    {{ value }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string
}>()
</script>

<style lang="scss" scoped>
.tag {
  padding: 0.125rem 0.5rem;
  border: var(--border-width) solid var(--border-color);
  border-radius: var(--radius-2);
  max-height: var(--space-6);
}
</style>
