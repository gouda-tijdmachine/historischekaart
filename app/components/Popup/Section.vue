<template>
  <div
    :id="anchorId"
    class="section"
  >
    <h3 v-if="title">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  anchor?: string
}>()

const anchorId = computed(() => {
  return props.anchor ? `section-${props.anchor}` : undefined
})
</script>

<style lang="scss" scoped>
.section {
  @include flex-column;
  @include text-sm;
  color: var(--off-black);
  gap: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: var(--border-width) solid var(--border-color);
  margin-bottom: var(--space-4);
  scroll-margin-top: var(--space-1);

  h3 {
    color: var(--gray-3);
  }
}
</style>
