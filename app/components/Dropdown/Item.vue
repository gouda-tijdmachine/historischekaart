<template>
  <component
    :is="as"
    :class="{ [item.type.toLocaleLowerCase()]: true, active: isActive, selected: selected }"
  >
    <template v-if="isGroup">
      <span class="label">{{ item.title }}</span>
    </template>

    <template v-else-if="isItem">
      <span class="label">{{ item.title }}</span>
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
          <TextLabel v-if="item.subtitle && !selected">
            {{ item.subtitle }}
          </TextLabel>
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

const isGroup = computed<boolean>(() => {
  return props.item.type === 'group'
})

const isItem = computed<boolean>(() => {
  return props.item.type === 'item'
})
</script>

<style lang="scss" scoped>
/**
 * Styling for displaying an item or selected item
 */
.layer {
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
.group {
  padding: var(--space-2);
  border-bottom: var(--border-width) solid var(--border-color);

  .label {
    color: var(--gray-3);
    @include text-sm;
  }
}

/**
 * Styling a simple item
 */
.item {
  padding: var(--space-2);
  margin: var(--border-width);
  border: none;
  outline: none;
  cursor: pointer;

  .label {
    @include text-sm;
  }

  &.active {
    background-color: var(--gray-1);
  }

  &:hover:not(.selected) {
    background-color: var(--gray-1);
  }
}
</style>
