<template>
  <span class="label">
    <slot />
  </span>
</template>

<style lang="scss" scoped>
.label {
  color: var(--gray-3);
  @include text-sm;
}
</style>
