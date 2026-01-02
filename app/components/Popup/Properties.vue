<template>
  <template
    v-for="property in properties"
    :key="property"
  >
    <div
      v-if="data[property]"
      class="property"
    >
      <span>{{ labelFor(property) }}:</span>
      <a
        v-if="isUrl(data[property])"
        :href="data[property]"
        target="_blank"
        rel="noopener noreferrer"
        class="link"
      >
        {{ data[property] }}
      </a>
      <Tag
        v-else-if="isYear(property)"

        :value="data.datering"
        class="red"
      />
      <span v-else>{{ data[property] }}</span>
    </div>
  </template>
</template>

<script setup lang="ts">
defineProps<{
  data: any
  properties: string[]
}>()

const isUrl = (value: string): boolean => {
  try {
    new URL(value)
    return true
  }
  catch {
    return false
  }
}

const isYear = (property: string) => {
  return ['datering'].includes(property)
}

const labelFor = (label: string): string => {
  const config = useRuntimeConfig()
  const str = (config.public.labelExceptions as Record<string, string>)?.[label]
  return str ? str : label.charAt(0).toUpperCase() + label.slice(1)
}
</script>

<style lang="scss" scoped>
.property {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.link {
  padding: 0;
  background: transparent;
  border: none;
  color: var(--blue);
  cursor: pointer;
  text-align: start;
  text-decoration: none;

  &:hover {
    color: var(--red);
    text-decoration: underline;
  }
}
</style>
