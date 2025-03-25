<template>
  <div class="mobile-grid" :class="`mobile-grid--${column}`">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mobile-grid__item"
      @click="handleClick(item, index)"
    >
      <slot name="icon" :item="item">
        <component :is="item.icon" class="mobile-grid__icon" />
      </slot>
      <div class="mobile-grid__text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface GridItem {
  text: string
  icon: any
  [key: string]: any
}

interface Props {
  items: GridItem[]
  column?: 2 | 3 | 4 | 5
}

const props = withDefaults(defineProps<Props>(), {
  column: 4
})

const emit = defineEmits<{
  (e: 'click', item: GridItem, index: number): void
}>()

const handleClick = (item: GridItem, index: number) => {
  emit('click', item, index)
}
</script>

<style lang="scss" scoped>
.mobile-grid {
  display: grid;
  gap: $spacing-md;
  padding: $spacing-md;

  &--2 {
    grid-template-columns: repeat(2, 1fr);
  }

  &--3 {
    grid-template-columns: repeat(3, 1fr);
  }

  &--4 {
    grid-template-columns: repeat(4, 1fr);
  }

  &--5 {
    grid-template-columns: repeat(5, 1fr);
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: $spacing-md;
    background-color: $white;
    border-radius: $border-radius-md;
    cursor: pointer;

    &:active {
      background-color: $background-color;
    }
  }

  &__icon {
    width: 32px;
    height: 32px;
    margin-bottom: $spacing-sm;
    color: $primary-color;
  }

  &__text {
    font-size: $font-size-sm;
    color: $text-color;
    text-align: center;
  }
}
</style> 