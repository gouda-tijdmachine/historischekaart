<template>
  <component
    :is="as"
    :class="{ item: true, [item.type.toLocaleLowerCase()]: true, active: isActive, placeholder: asPlaceholder }"
  >
    <div class="item-content">
      <div
        v-if="item.icon"
        class="icon-area"
      >
        <Icon
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
        <TextLabel v-if="item.subtitle && !asPlaceholder">
          {{ item.subtitle }}
        </TextLabel>
      </div>
      <div
        v-if="isSelected"
        class="checked"
      >
        <Icon
          name="lucide:check"
          class="icon"
        />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  item: Item
  as?: 'div' | 'li'
  isActive?: boolean
  isSelected?: boolean
  asPlaceholder?: boolean
}>(), {
  selected: false,
  isActive: false,
  isSelected: false,
  as: 'div',
})
</script>

<style lang="scss" scoped>
.item {
  margin: var(--border-width);
  border: none;
  outline: none;
  cursor: pointer;

  &.active {
    background-color: var(--gray-1);
  }

  &:hover:not(.placeholder) {
    background-color: var(--gray-1);
  }

  .item-content {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr auto;
    grid-template-areas: "content checked";
    gap: var(--space-1);
    padding: var(--space-2);

    .content-area {
      grid-area: content;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .title {
        @include text-xs;
        display: flex;
        flex-wrap: nowrap;
        gap: var(--space-2)
      }
    }

    .checked {
      grid-area: checked;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}

/**
 * Styling for displaying an item or selected item
 */
.layer {
  .item-content {
    grid-template-columns: var(--space-4) 1fr auto;
    grid-template-areas: "icon content checked";
    padding: var(--space-2) var(--space-3);

    .content-area {
      .title {
        @include text-sm;
      }
    }
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
}

/**
 * Styling a group label
 */
.group {
  border-bottom: var(--border-width) solid var(--border-color);

  .title {
    @include text-sm;
    color: var(--gray-3);
  }
}
</style>
