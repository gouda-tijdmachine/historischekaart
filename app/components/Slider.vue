<template>
  <input
    type="range"
    :min="min"
    :max="max"
    :value="modelValue"
    :step="step"
    class="slider"
    @input="handleInput"
  >
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue?: number | string
  min?: number | string
  max?: number | string
  step?: number | string
}>(), {
  modelValue: 50,
  min: 0,
  max: 100,
  step: 1,
})

// Define emits
const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

// Handle input with proper type safety
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) {
    emit('update:modelValue', Number(target.value))
  }
}
</script>

<style lang="scss" scoped>
.slider {
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: none;
  width: 100%;
  height: var(--space-4);
  background: var(--gray-2);
  border-radius: var(--radius-4);
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: var(--space-4);
  height: var(--space-4);
  border-radius: var(--radius-full);
  background: var(--red);
  cursor: pointer;

  &:hover {
    outline: var(--space-1) solid var(--red-light);
  }
}

.slider::-moz-range-thumb {
  width: var(--space-4);
  height: var(--space-4);
  border-radius: var(--radius-2);
  background: var(--red);
  cursor: pointer;
}
</style>
