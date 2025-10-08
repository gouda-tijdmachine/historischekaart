<template>
  <component
    :is="as"
    :class="{ [item.type.toLocaleLowerCase()]: true, active: isActive, selected: selected }"
  >
    <template v-if="isLabel">
      <span class="text-md">{{ item.title }}</span>
    </template>
    <template v-else>
      <div class="item-content">
        <div class="icon-area">
          <Icon
            v-if="item.icon"
            :name="item.icon"
            class="icon"
          />
        </div>
        <div class="content-area">
          <div class="title">
            {{ item.title }}
            <Tag
              v-if="item.tag"
              :value="item.tag"
            />
          </div>
          <div
            v-if="item.subtitle && !selected"
            class="text-sm"
          >
            {{ item.subtitle }}
          </div>
        </div>
      </div>
    </template>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  item: Item
  as?: 'div' | 'li'
  isActive?: boolean
  selected?: boolean
}>(), {
  selected: false,
  isActive: false,
  as: 'div',
})

const isLabel = computed<boolean>(() => {
  return props.item.type === 'label'
})
</script>

<style lang="scss" scoped>
/**
 * Styling for displaying an item or selected item
 */
.item {
  margin: var(--border-width);
  border: none;
  outline: none;
  cursor: pointer;

  &.active {
    background-color: var(--gray-1);
  }

  &:hover:not(.selected) {
    background-color: var(--gray-1);
  }

  .item-content {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    grid-template-areas: "icon content";
    gap: var(--space-1);
    padding: var(--space-2) var(--space-3);
  }

  .icon-area {
    grid-area: icon;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      width: var(--space-4);
      height: var(--space-4);
    }
  }

  .content-area {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .title {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--space-2)
  }
}

/**
 * Styling a group label
 */
.label {
  padding: var(--space-2);
  border-bottom: var(--border-width) solid var(--border-color);
  color: var(--gray-3);
}
</style>
