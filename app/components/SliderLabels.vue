<template>
  <div class="slider-labels">
    <div
      v-for="(label, index) in sliderLabels"
      :key="label"
      :class="{ label: true, active: index === activeRangeIndex }"
      @click="$emit('update:modelValue', label)"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const labelStep = ref<number>(50)
const props = defineProps<{
  modelValue: number
  minYear: number
  maxYear: number
}>()

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

/**
 * Computed Properties
 */
const minValue = computed<number>(() => {
  const remainder = props.minYear % labelStep.value
  return remainder === 0 ? props.minYear : (props.minYear - remainder + labelStep.value)
})

const maxValue = computed<number>(() => {
  const remainder = props.maxYear % labelStep.value
  return remainder === 0 ? props.maxYear : (props.maxYear - remainder)
})

const leftMargin = computed<number | string>(() => {
  const stepPerPercentage = (props.maxYear - props.minYear) / 100
  const diff = minValue.value - props.minYear
  const value = diff / stepPerPercentage
  return diff > 0 ? `${value}%` : 0
})

const rightMargin = computed<number | string>(() => {
  const stepPerPercentage = (props.maxYear - props.minYear) / 100
  const diff = props.maxYear - maxValue.value
  const value = diff / stepPerPercentage
  return diff > 0 ? `${value}%` : 0
})

const sliderLabels = computed<number[]>(() => {
  const labels = []
  for (let x = minValue.value; x <= maxValue.value; x = x + labelStep.value) {
    labels.push(x)
  }
  return labels
})

const activeRangeIndex = computed(() => {
  return sliderLabels.value
    .map((label, index) => ({
      index,
      distance: Math.abs(label - props.modelValue),
    }))
    .reduce((prev, current) =>
      current.distance < prev.distance ? current : prev,
    ).index
})
</script>

<style lang="scss" scoped>
.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-left: v-bind(leftMargin);
  margin-right: v-bind(rightMargin);

  .label {
    @include text-xs;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-1);
    color: var(--gray-3);
    cursor: pointer;

    &:before {
      content: '';
      width: var(--space-2);
      height: var(--space-2);
      border-radius: var(--radius-full);
      background-color: var(--gray-3);
    }

    &.active {
      color: var(--red);

      &:before {
        background-color: var(--red);
      }
    }
  }
}
</style>
