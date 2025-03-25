<template>
  <div class="mobile-col" :class="[
    `mobile-col--${span}`,
    `mobile-col--offset-${offset}`,
    `mobile-col--order-${order}`,
    {
      'mobile-col--xs': xs,
      'mobile-col--sm': sm,
      'mobile-col--md': md,
      'mobile-col--lg': lg,
      'mobile-col--xl': xl
    },
    {
      'mobile-col--hidden': hidden,
      'mobile-col--hidden-xs': hiddenXs,
      'mobile-col--hidden-sm': hiddenSm,
      'mobile-col--hidden-md': hiddenMd,
      'mobile-col--hidden-lg': hiddenLg,
      'mobile-col--hidden-xl': hiddenXl
    }
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  span?: number
  offset?: number
  order?: number
  xs?: number | { span: number; offset?: number; order?: number }
  sm?: number | { span: number; offset?: number; order?: number }
  md?: number | { span: number; offset?: number; order?: number }
  lg?: number | { span: number; offset?: number; order?: number }
  xl?: number | { span: number; offset?: number; order?: number }
  hidden?: boolean
  hiddenXs?: boolean
  hiddenSm?: boolean
  hiddenMd?: boolean
  hiddenLg?: boolean
  hiddenXl?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  span: 24,
  offset: 0,
  order: 0,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined,
  hidden: false,
  hiddenXs: false,
  hiddenSm: false,
  hiddenMd: false,
  hiddenLg: false,
  hiddenXl: false
})
</script>

<style lang="scss" scoped>
.mobile-col {
  flex: 0 0 auto;
  width: calc(100% / 24 * var(--span, 24));
  margin-left: calc(100% / 24 * var(--offset, 0));
  order: var(--order, 0);
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;

  // 基础栅格
  @for $i from 1 through 24 {
    &--#{$i} {
      --span: #{$i};
    }
  }

  // 偏移量
  @for $i from 1 through 23 {
    &--offset-#{$i} {
      --offset: #{$i};
    }
  }

  // 排序
  @for $i from 1 through 24 {
    &--order-#{$i} {
      --order: #{$i};
    }
  }

  // 响应式栅格
  @mixin responsive($breakpoint) {
    @media screen and (min-width: $breakpoint) {
      @for $i from 1 through 24 {
        &--#{$breakpoint} {
          --span: #{$i};
        }
      }
    }
  }

  // 断点
  $breakpoints: (
    'xs': 0,
    'sm': 576px,
    'md': 768px,
    'lg': 992px,
    'xl': 1200px
  );

  @each $name, $breakpoint in $breakpoints {
    @include responsive($breakpoint);
  }

  // 隐藏
  &--hidden {
    display: none;
  }

  @each $name, $breakpoint in $breakpoints {
    &--hidden-#{$name} {
      @media screen and (min-width: $breakpoint) {
        display: none;
      }
    }
  }
}
</style> 