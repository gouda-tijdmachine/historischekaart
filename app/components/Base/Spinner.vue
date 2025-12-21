<template>
  <div class="spinner-container">
    <Icon
      name="lucide:loader-2"
      class="spinner"
    />
  </div>
</template>

<style lang="scss" scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  padding: var(--space-4);
}

.spinner {
  animation: spin 1s linear infinite;
  color: var(--blue);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
