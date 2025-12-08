<template>
  <div class="list">
    <div
      v-if="title"
      class="header"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="icon"
      />
      <span>{{ title }}</span>
    </div>
    <component
      :is="useDiv ? 'div' : 'ul'"
      class="items"
    >
      <template
        v-for="item in items"
        :key="item.identifier"
      >
        <slot
          name="item"
          v-bind="item"
        />
      </template>
    </component>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: any[]
  icon?: string
  title?: string
  useDiv?: boolean
}>()
</script>

<style lang="scss" scoped>
.list {
  display: grid;
  grid-template-rows: min-content auto;
  grid-template-areas: "header" "content";
  gap: var(--space-2);

  .header {
    grid-area: header;
    display: grid;
    grid-template-columns: var(--space-4) auto;
    align-items: center;
    gap: var(--space-2);
  }

  .items {
    grid-area: content;
    display: grid;
    grid-row: 1fr;
    gap: var(--space-2);
  }
}
</style>
