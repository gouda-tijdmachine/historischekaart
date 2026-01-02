<template>
  <nav class="anchor-bar">
    <BaseButton
      v-for="section in sections"
      :key="section.id"
      class="btn--small"
      :title="section.label"
      @click="scrollToSection(section.id)"
    />
  </nav>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
interface AnchorSection {
  id: string
  label: string
}

defineProps<{
  sections: AnchorSection[]
}>()

/**
 * Methods
 */
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(`section-${sectionId}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style lang="scss" scoped>
.anchor-bar {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--white);
  border-bottom: var(--border-width) solid var(--border-color);
  overflow: hidden;
}
</style>
