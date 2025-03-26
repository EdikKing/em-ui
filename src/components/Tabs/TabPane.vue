<template>
  <div
    v-show="active"
    class="mobile-tab-pane"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'

export interface TabPaneProps {
  name: string | number
  label: string
  disabled?: boolean
}

const props = withDefaults(defineProps<TabPaneProps>(), {
  disabled: false
})

const tabs = inject('tabs') as {
  registerTab: (tab: TabPaneProps) => void
  unregisterTab: (name: string | number) => void
  modelValue: string | number
}

const active = computed(() => tabs.modelValue === props.name)

onMounted(() => {
  tabs.registerTab(props)
})

onBeforeUnmount(() => {
  tabs.unregisterTab(props.name)
})
</script>

<style lang="scss" scoped>
.mobile-tab-pane {
  width: 100%;
}
</style> 