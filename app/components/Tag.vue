<template>
  <TextLabel class="tag">
    {{ value }}
  </TextLabel>
</template>

<script setup lang="ts">
defineProps<{
  value: string | number
}>()
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--space-5);
  padding-inline: var(--space-2);
  border: var(--border-width) solid var(--border-color);
  white-space: nowrap;
}

.red {
  background-color: var(--gray-2);
  border-color: var(--border-color);
  color: var(--red-dark);
}

.green {
  background-color: var(--green);
  border-color: var(--green);
  color: var(--white);
}
</style>
