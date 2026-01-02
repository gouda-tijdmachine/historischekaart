<template>
  <button
    class="btn"
    @click="$emit('click')"
  >
    <Icon
      v-if="icon"
      :class="iconLarge ? 'icon-lg' : 'icon'"
      :name="icon"
    />
    {{ title }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  icon?: string
  iconLarge?: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.btn {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-4);
  padding-block: var(--space-2);
  width: 100%;
  color: var(--white);
  background-color: var(--blue);

  &:hover {
    background-color: var(--red);
  }

  &:active {
    background-color: var(--red-dark);
  }

  &.btn--small {
    @include text-sm;
    padding: var(--space-1) var(--space-4);
    width: min-content;
  }
}
</style>
