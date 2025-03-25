<template>
  <div
    class="mobile-tab-bar__item"
    :class="{ 'mobile-tab-bar__item--active': modelValue === name }"
    @click="handleClick"
  >
    <component :is="icon" class="mobile-tab-bar__icon" />
    <span class="mobile-tab-bar__text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  icon: string
  text: string
  modelValue: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const handleClick = () => {
  emit('update:modelValue', props.name)
}
</script>

<style lang="scss" scoped>
.mobile-tab-bar__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 0;
  color: $text-color-secondary;
  font-size: $font-size-sm;

  &--active {
    color: $primary-color;
  }
}

.mobile-tab-bar__icon {
  width: 24px;
  height: 24px;
  margin-bottom: 2px;
}

.mobile-tab-bar__text {
  line-height: 1;
}
</style> 