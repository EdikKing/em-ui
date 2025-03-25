<template>
  <div
    class="mobile-tab-pane"
    v-show="isActive"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  name: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

interface TabsContext {
  registerTab: (tab: Props) => void
  unregisterTab: (tab: Props) => void
  props: {
    modelValue: string | number
  }
}

const tabs = inject('tabs') as TabsContext

const isActive = computed(() => tabs.props.modelValue === props.name)

onMounted(() => {
  tabs.registerTab({
    name: props.name,
    label: props.label,
    disabled: props.disabled
  })
})

onUnmounted(() => {
  tabs.unregisterTab({
    name: props.name,
    label: props.label,
    disabled: props.disabled
  })
})
</script>

<style lang="scss" scoped>
.mobile-tab-pane {
  padding: $spacing-md;
}
</style> 