<template>
  <div class="mobile-card" :class="{ 'mobile-card--shadow': shadow }">
    <div v-if="$slots.header" class="mobile-card__header">
      <slot name="header" />
    </div>
    <div class="mobile-card__body">
      <slot />
    </div>
    <div v-if="$slots.footer" class="mobile-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  shadow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  shadow: true
})
</script>

<style lang="scss" scoped>
.mobile-card {
  background-color: $white;
  border-radius: $border-radius-md;
  overflow: hidden;

  &--shadow {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__header {
    padding: $spacing-md;
    border-bottom: 1px solid $border-color;
  }

  &__body {
    padding: $spacing-md;
  }

  &__footer {
    padding: $spacing-md;
    border-top: 1px solid $border-color;
  }
}
</style> 