<template>
  <li class="explanation-item">
    <span class="title">{{ item.title }}</span>
    <span class="description">{{ item.description }}</span>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  item: any
}>()
</script>

<style lang="scss" scoped>
.explanation-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);

  .title {
    font-weight: var(--font-weight-semibold);
  }
}
</style>
