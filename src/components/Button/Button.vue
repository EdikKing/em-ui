<template>
  <button
    class="mobile-button"
    :class="[
      `mobile-button--${type}`,
      `mobile-button--${size}`,
      { 'mobile-button--block': block }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'medium' | 'large'
  block?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'medium',
  block: false,
  disabled: false
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.mobile-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 $spacing-md;
  border: 1px solid transparent;
  border-radius: $border-radius-md;
  font-size: $font-size-md;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.3s;

  &--block {
    display: flex;
    width: 100%;
  }

  &--small {
    height: 32px;
    font-size: $font-size-sm;
  }

  &--medium {
    height: 40px;
    font-size: $font-size-md;
  }

  &--large {
    height: 48px;
    font-size: $font-size-lg;
  }

  &--default {
    background-color: $white;
    border-color: $border-color;
    color: $text-color;

    &:active {
      background-color: $background-color;
    }

    &:disabled {
      background-color: $background-color;
      border-color: $border-color;
      color: $text-color-secondary;
      cursor: not-allowed;
    }
  }

  &--primary {
    background-color: $primary-color;
    border-color: $primary-color;
    color: $white;

    &:active {
      opacity: 0.8;
    }

    &:disabled {
      background-color: rgba($primary-color, 0.5);
      border-color: rgba($primary-color, 0.5);
      color: $white;
      cursor: not-allowed;
    }
  }

  &--success {
    background-color: $success-color;
    border-color: $success-color;
    color: $white;

    &:active {
      opacity: 0.8;
    }

    &:disabled {
      background-color: rgba($success-color, 0.5);
      border-color: rgba($success-color, 0.5);
      color: $white;
      cursor: not-allowed;
    }
  }

  &--warning {
    background-color: $warning-color;
    border-color: $warning-color;
    color: $white;

    &:active {
      opacity: 0.8;
    }

    &:disabled {
      background-color: rgba($warning-color, 0.5);
      border-color: rgba($warning-color, 0.5);
      color: $white;
      cursor: not-allowed;
    }
  }

  &--danger {
    background-color: $danger-color;
    border-color: $danger-color;
    color: $white;

    &:active {
      opacity: 0.8;
    }

    &:disabled {
      background-color: rgba($danger-color, 0.5);
      border-color: rgba($danger-color, 0.5);
      color: $white;
      cursor: not-allowed;
    }
  }
}
</style> 