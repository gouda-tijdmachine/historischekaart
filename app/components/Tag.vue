<template>
  <TextLabel class="tag">
    {{ value }}
  </TextLabel>
</template>

<script setup lang="ts">
defineProps<{
  value: string
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
}

.red {
  background-color: var(--red);
  border-color: var(--red);
  color: var(--white);
}

.green {
  background-color: var(--green);
  border-color: var(--green);
  color: var(--white);
}
</style>
