<template>
  <li class="source-item">
    <Icon
      name="lucide:database"
      class="icon"
    />
    <div class="title-area">
      <a
        :href="item.url"
        target="_blank"
        rel="noopener noreferrer"
        class="link"
        :alt="item.naam"
      >
        {{ name }}
      </a>
      <Tag :value="item.datering" />
    </div>
  </li>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any
}>()

const name = computed<string>(() => {
  return props.item.naam_kort || props.item.naam || 'Onbekende naam'
})
</script>

<style lang="scss" scoped>
.source-item {
  display: grid;
  gap: var(--space-2);
  grid-template-columns: var(--space-4) auto;
  grid-template-rows: 1fr;
  grid-template-areas:
    "icon title";
  align-items: center;

  .icon {
    grid-area: icon;
  }

  .title-area {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
