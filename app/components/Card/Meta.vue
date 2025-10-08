<template>
  <TextLabel class="info">
    <slot />
  </TextLabel>
</template>

<style lang="scss" scoped>
.info::before {
  content: "•";
  margin-right: var(--space-3);
}
</style>
