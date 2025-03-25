<template>
  <div class="mobile-nav-bar" :class="{ 'mobile-nav-bar--fixed': fixed }">
    <div class="mobile-nav-bar__left" @click="handleLeftClick">
      <slot name="left">
        <span v-if="showBack" class="mobile-nav-bar__back">
          <i class="mobile-nav-bar__back-icon"></i>
          返回
        </span>
      </slot>
    </div>
    <div class="mobile-nav-bar__title">
      <slot>{{ title }}</slot>
    </div>
    <div class="mobile-nav-bar__right" @click="handleRightClick">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  fixed?: boolean
  showBack?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  fixed: false,
  showBack: false
})

const emit = defineEmits<{
  (e: 'back'): void
  (e: 'right-click'): void
}>()

const handleLeftClick = () => {
  if (props.showBack) {
    emit('back')
  }
}

const handleRightClick = () => {
  emit('right-click')
}
</script>

<style lang="scss" scoped>
.mobile-nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 $spacing-md;
  background-color: $white;
  border-bottom: 1px solid $border-color;
  -webkit-tap-highlight-color: transparent;

  &--fixed {
    position: fixed;
  }

  &__left {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: $font-size-md;
    color: $text-color;
  }

  &__title {
    flex: 2;
    text-align: center;
    font-size: $font-size-lg;
    font-weight: 500;
    color: $text-color;
  }

  &__right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: $font-size-md;
    color: $text-color;
  }

  &__back {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  &__back-icon {
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 4px;
    border-left: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: rotate(45deg);
  }
}
</style> 