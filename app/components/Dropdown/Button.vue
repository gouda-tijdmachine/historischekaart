<template>
  <button
    ref="buttonElement"
    class="dropdown"
    type="button"
    @click="$emit('update:modelValue', !modelValue)"
    @keydown.down.prevent="$emit('update:modelValue', true)"
    @keydown.up.prevent="$emit('update:modelValue', true)"
    @keydown.enter.prevent="$emit('update:modelValue', true)"
    @keydown.space.prevent="$emit('update:modelValue', true)"
  >
    <div class="button-text">
      <DropdownItem
        v-if="item"
        :item="item"
        as-placeholder
      />
      <span v-else>Select…</span>
      <Icon
        class="icon"
        name="lucide:chevron-down"
      />
    </div>
  </button>
</template>

<script setup lang="ts">
const buttonElement = ref<HTMLDivElement>()

defineProps<{
  modelValue: boolean
  item?: Item
}>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

defineExpose({
  focus() {
    buttonElement.value?.focus()
  },
})
</script>

<style lang="scss" scoped>
.dropdown {
  width: 100%;
  display: flex;
  padding-inline: var(--space-3);
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: var(--border-width) solid var(--border-color);
  outline: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    border-color: var(--blue);
  }
}

.button-text {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .icon {
    background-color: var(--border-color);
  }
}
</style>
