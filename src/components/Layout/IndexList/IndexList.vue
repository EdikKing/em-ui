<template>
  <div class="mobile-index-list">
    <div class="mobile-index-list__content">
      <div
        v-for="(group, groupIndex) in groups"
        :key="groupIndex"
        class="mobile-index-list__group"
      >
        <div class="mobile-index-list__index">{{ group.index }}</div>
        <div
          v-for="(item, itemIndex) in group.items"
          :key="itemIndex"
          class="mobile-index-list__item"
          @click="handleClick(item, groupIndex, itemIndex)"
        >
          <slot name="item" :item="item">
            <div class="mobile-index-list__title">{{ item.title }}</div>
            <div v-if="item.desc" class="mobile-index-list__desc">{{ item.desc }}</div>
          </slot>
        </div>
      </div>
    </div>
    <div class="mobile-index-list__sidebar">
      <div
        v-for="(group, index) in groups"
        :key="index"
        class="mobile-index-list__sidebar-item"
        @click="handleIndexClick(group.index)"
      >
        {{ group.index }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface IndexItem {
  title: string
  desc?: string
  [key: string]: any
}

interface IndexGroup {
  index: string
  items: IndexItem[]
}

interface Props {
  groups: IndexGroup[]
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'click', item: IndexItem, groupIndex: number, itemIndex: number): void
  (e: 'index-click', index: string): void
}>()

const handleClick = (item: IndexItem, groupIndex: number, itemIndex: number) => {
  emit('click', item, groupIndex, itemIndex)
}

const handleIndexClick = (index: string) => {
  emit('index-click', index)
}
</script>

<style lang="scss" scoped>
.mobile-index-list {
  position: relative;
  height: 100%;
  background-color: $white;

  &__content {
    height: 100%;
    overflow-y: auto;
  }

  &__group {
    padding: $spacing-md;
  }

  &__index {
    padding: $spacing-sm 0;
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }

  &__item {
    padding: $spacing-md;
    background-color: $white;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }
  }

  &__title {
    font-size: $font-size-md;
    color: $text-color;
    line-height: 1.5;
  }

  &__desc {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    line-height: 1.5;
    margin-top: 4px;
  }

  &__sidebar {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: $spacing-sm;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: $border-radius-md;
    z-index: 1;
  }

  &__sidebar-item {
    padding: 2px 4px;
    font-size: $font-size-sm;
    color: $white;
    text-align: center;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }
}
</style> 