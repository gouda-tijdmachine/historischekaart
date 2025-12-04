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
  clamp?: number
}>()
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--space-4);
  white-space: break-spaces;

  .icon {
    color: var(--blue);
  }
}

.value {
  overflow: hidden;
  display: -webkit-box;
  line-clamp: v-bind(clamp);
  -webkit-line-clamp: v-bind(clamp);
  -webkit-box-orient: vertical;
}
</style>
