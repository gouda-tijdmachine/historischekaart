<template>
  <div
    :class="{ 'card-image': true, 'selected': selected }"
  >
    <div class="thumbnail-area">
      <img
        :src="card.thumbnail"
        class="thumbnail"
      >
    </div>
    <div class="icon-area">
      <Icon
        class="icon"
        :name="filterStore.iconName('image')"
      />
      <Tag
        :value="card.year"
        class="red"
      />
    </div>
    <TextClampedTitle
      class="title-area"
      :clamp="5"
    >
      {{ card.title }}
    </TextClampedTitle>
    <div class="subtitle-area">
      <CardSubtitle>{{ streets.join(', ') }}</CardSubtitle>
    </div>
    <div class="selected-area">
      <!-- <TextLabel
        v-if="selected"
        class="selected"
      >
        Geselecteerd
      </TextLabel> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const filterStore = useFilterStore()
const props = defineProps<{
  selected?: boolean
  card: ImageCard
}>()

const streets = computed<string[]>(() => {
  return filterStore.findStreetNamesByID(props.card.streets)
})
</script>

<style lang="scss" scoped>
.card-image {
  border: var(--border-width) solid var(--border-color);
  padding: var(--space-3);
  cursor: pointer;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: min-content var(--space-5) auto var(--space-4) var(--space-2);
  grid-template-areas:
   "thumbnail"
   "icons"
   "title"
   "subtitle"
   "selected";
  row-gap: var(--space-1);
  height: 20rem;

  &:hover {
    background: var(--gray-1);
  }

  &.selected {
    border: var(--border-width) solid var(--blue);
    color: var(--blue);
  }
}

.thumbnail-area {
  grid-area: thumbnail;
  aspect-ratio: 16 / 9;

  .thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.icon-area {
  grid-area: icons;
  display: flex;
  justify-content: space-between;

  .badge {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-wrap: nowrap;
    gap: var(--space-1)
  }
}

.title-area {
  grid-area: title;
  align-items: flex-start;
}

.subtitle-area {
  grid-area: subtitle;
  min-width: 0;
}

.selected-area {
  grid-area: selected;
  display: flex;
  justify-content: flex-end;

  .selected {
    color: var(--blue);
  }
}
</style>
