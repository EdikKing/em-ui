<template>
  <div class="mobile-waterfall" :class="`mobile-waterfall--${column}`">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mobile-waterfall__item"
      @click="handleClick(item, index)"
    >
      <slot name="item" :item="item">
        <img :src="item.image" :alt="item.title" class="mobile-waterfall__image">
        <div class="mobile-waterfall__info">
          <div class="mobile-waterfall__title">{{ item.title }}</div>
          <div v-if="item.desc" class="mobile-waterfall__desc">{{ item.desc }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WaterfallItem {
  title: string
  image: string
  desc?: string
  [key: string]: any
}

interface Props {
  items: WaterfallItem[]
  column?: 2 | 3 | 4
}

const props = withDefaults(defineProps<Props>(), {
  column: 2
})

const emit = defineEmits<{
  (e: 'click', item: WaterfallItem, index: number): void
}>()

const handleClick = (item: WaterfallItem, index: number) => {
  emit('click', item, index)
}
</script>

<style lang="scss" scoped>
.mobile-waterfall {
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

  &__item {
    background-color: $white;
    border-radius: $border-radius-md;
    overflow: hidden;
    cursor: pointer;

    &:active {
      opacity: 0.8;
    }
  }

  &__image {
    width: 100%;
    height: auto;
    display: block;
  }

  &__info {
    padding: $spacing-md;
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
}
</style> 