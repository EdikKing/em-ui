<template>
  <div class="mobile-list">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="mobile-list__item"
      :class="{ 'mobile-list__item--clickable': clickable }"
      @click="handleClick(item, index)"
    >
      <slot name="left" :item="item">
        <div class="mobile-list__title">{{ item.title }}</div>
        <div v-if="item.desc" class="mobile-list__desc">{{ item.desc }}</div>
      </slot>
      <slot name="right" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface ListItem {
  title: string
  desc?: string
  [key: string]: any
}

interface Props {
  items: ListItem[]
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  clickable: false
})

const emit = defineEmits<{
  (e: 'click', item: ListItem, index: number): void
}>()

const handleClick = (item: ListItem, index: number) => {
  if (props.clickable) {
    emit('click', item, index)
  }
}
</script>

<style lang="scss" scoped>
.mobile-list {
  background-color: $white;

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-md;
    border-bottom: 1px solid $border-color;

    &:last-child {
      border-bottom: none;
    }

    &--clickable {
      cursor: pointer;

      &:active {
        background-color: $background-color;
      }
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
}
</style> 