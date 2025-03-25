<template>
  <div class="mobile-row" :class="[
    `mobile-row--${gutter}`,
    `mobile-row--${align}`,
    `mobile-row--${justify}`,
    { 'mobile-row--wrap': wrap }
  ]">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  gutter?: 'none' | 'small' | 'medium' | 'large'
  wrap?: boolean
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
}

const props = withDefaults(defineProps<Props>(), {
  gutter: 'none',
  wrap: false,
  align: 'start',
  justify: 'start'
})
</script>

<style lang="scss" scoped>
.mobile-row {
  display: flex;
  width: 100%;
  box-sizing: border-box;

  &--wrap {
    flex-wrap: wrap;
  }

  &--none {
    gap: 0;
  }

  &--small {
    gap: $spacing-sm;
  }

  &--medium {
    gap: $spacing-md;
  }

  &--large {
    gap: $spacing-lg;
  }

  &--start {
    align-items: flex-start;
  }

  &--center {
    align-items: center;
  }

  &--end {
    align-items: flex-end;
  }

  &--stretch {
    align-items: stretch;
  }

  &--baseline {
    align-items: baseline;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-evenly {
    justify-content: space-evenly;
  }
}
</style> 