<template>
  <div
    :class="{ 'card-base': true, 'selected': selected }"
  >
    <div class="icon-area">
      <Icon
        :name="iconName"
        class="icon"
      />
    </div>
    <TextTitle class="title-area">
      {{ title }}
    </TextTitle>
    <div class="badge-area">
      <slot name="badges" />
    </div>
    <div class="subtitle-area">
      <slot name="subtitle" />
    </div>
    <div class="meta-area">
      <slot name="meta-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  iconName: string
  selected?: boolean
}>()
</script>

<style lang="scss" scoped>
.card-base {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
  "icon title badge"
  "   . subtitle subtitle"
  "   . meta meta";
  column-gap: var(--space-3);
  min-height: var(--space-18);
  border: var(--border-width) solid var(--border-color);
  padding: var(--space-3);
  cursor: pointer;

  &:hover {
    background: var(--gray-1);
  }

  &.selected {
    border: var(--border-width) solid var(--blue);
    color: var(--blue);
  }
}

.icon-area {
  grid-area: icon;
  display: flex;
  @include flex-center;
}

.title-area {
  grid-area: title;
}

.badge-area {
  grid-area: badge;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--space-1)
}

.subtitle-area {
  grid-area: subtitle;
  min-width: 0;
}

.meta-area {
  grid-area: meta;
  display: flex;
  flex-wrap: nowrap;
  gap: var(--space-3);
}
</style>
