<template>
  <div class="mobile-tab-bar" :class="{ 'mobile-tab-bar--fixed': fixed }">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mobile-tab-bar__item"
      :class="{ 'mobile-tab-bar__item--active': modelValue === index }"
      @click="handleClick(index)"
    >
      <slot name="icon" :item="item">
        <component :is="item.icon" class="mobile-tab-bar__icon" />
      </slot>
      <div class="mobile-tab-bar__text">{{ item.text }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

interface TabItem {
  text: string
  icon: any
  [key: string]: any
}

interface Props {
  items: TabItem[]
  modelValue: number
  fixed?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  fixed: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const handleClick = (index: number) => {
  emit('update:modelValue', index)
}
</script>

<style lang="scss" scoped>
.mobile-tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 50px;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: $white;
  border-top: 1px solid $border-color;
  -webkit-tap-highlight-color: transparent;

  &--fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  &__item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $text-color-secondary;
    cursor: pointer;
    transition: all 0.3s;

    &--active {
      color: $primary-color;
    }
  }

  &__icon {
    width: 24px;
    height: 24px;
    margin-bottom: 2px;
    color: inherit;
  }

  &__text {
    font-size: $font-size-xs;
    line-height: 1;
    color: inherit;
  }
}
</style> 