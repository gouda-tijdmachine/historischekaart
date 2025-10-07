<template>
  <div class="tabs-container">
    <div class="tab-headers">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-header', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <Icon
          :name="tab.icon"
          class="icon"
        />
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <template
        v-for="tab in tabs"
        :key="tab.id"
      >
        <slot
          v-if="activeTab === tab.id"
          :name="tab.id"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * State & Props
 */
const activeTab = ref<string>()

const props = defineProps<{
  tabs: Tab[]
}>()

/**
 * Lifecycle methods
 */
onMounted(() => {
  if (props.tabs?.length > 0) {
    activeTab.value = props.tabs[0]!.id
  }
})
</script>

<style scoped>
.tabs-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  width: 100%;
}

.tab-headers {
  display: grid;
  width: 100%;
  height: var(--space-12);
  padding: var(--space-1);
  grid-template-rows: 1fr;
  grid-template-columns: repeat(v-bind('props.tabs.length'), minmax(0, 1fr));
  border-radius: var(--radius-1);
  background-color: var(--gray-1);
}

.tab-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-2);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  .icon {
    width: var(--space-4);
    height: var(--space-4);
  }
}

.tab-header.active {
  background: var(--white);
}
</style>
