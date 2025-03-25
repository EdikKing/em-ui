<template>
  <div class="mobile-tabs">
    <div 
      ref="navRef"
      class="mobile-tabs__nav"
    >
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="mobile-tabs__tab"
        :class="{
          'mobile-tabs__tab--active': modelValue === tab.name,
          'mobile-tabs__tab--disabled': tab.disabled
        }"
        @click="handleTabClick(tab)"
      >
        <span class="mobile-tabs__tab-text">{{ tab.label }}</span>
      </div>
      <div
        class="mobile-tabs__line"
        :style="lineStyle"
      ></div>
    </div>
    <div class="mobile-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, onMounted, nextTick, watch } from 'vue'

export interface Tab {
  name: string | number
  label: string
  disabled?: boolean
}

interface Props {
  modelValue: string | number
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: '#1989fa'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', tab: Tab): void
}>()

const tabs = ref<Tab[]>([])
const activeTab = ref<HTMLElement>()
const navRef = ref<HTMLElement>()

// 注册 tab
const registerTab = (tab: Tab) => {
  tabs.value.push(tab)
}

// 注销 tab
const unregisterTab = (tab: Tab) => {
  const index = tabs.value.findIndex(t => t.name === tab.name)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

// 点击 tab
const handleTabClick = (tab: Tab) => {
  if (tab.disabled) return
  emit('update:modelValue', tab.name)
  emit('change', tab)
}

// 计算下划线样式
const lineStyle = computed(() => {
  if (!activeTab.value) return {}
  const tabText = activeTab.value.querySelector('.mobile-tabs__tab-text') as HTMLElement
  if (!tabText) return {}
  
  const { offsetLeft, offsetWidth } = tabText
  const tabLeft = activeTab.value.offsetLeft
  return {
    transform: `translateX(${tabLeft + offsetLeft}px)`,
    width: `${offsetWidth}px`,
    backgroundColor: props.color
  }
})

// 滚动到激活的标签页
const scrollToActiveTab = async () => {
  await nextTick()
  if (!activeTab.value || !navRef.value) return

  const nav = navRef.value
  const activeTabElement = activeTab.value
  const navWidth = nav.offsetWidth
  const tabWidth = activeTabElement.offsetWidth
  const offsetLeft = activeTabElement.offsetLeft
  const scrollLeft = nav.scrollLeft

  let targetScrollLeft = scrollLeft

  // 如果标签页在可视区域右侧之外
  if (offsetLeft - scrollLeft + tabWidth > navWidth) {
    targetScrollLeft = offsetLeft - navWidth + tabWidth
  }
  // 如果标签页在可视区域左侧之外
  else if (offsetLeft < scrollLeft) {
    targetScrollLeft = offsetLeft
  }

  nav.scrollTo({
    left: targetScrollLeft,
    behavior: 'smooth'
  })
}

// 更新下划线位置
const updateLine = async () => {
  await nextTick()
  const activeTabIndex = tabs.value.findIndex(tab => tab.name === props.modelValue)
  if (activeTabIndex === -1) return
  
  const tabElements = navRef.value?.querySelectorAll('.mobile-tabs__tab')
  if (tabElements?.[activeTabIndex]) {
    activeTab.value = tabElements[activeTabIndex] as HTMLElement
    scrollToActiveTab()
  }
}

// 监听激活项变化
watch(() => props.modelValue, updateLine)

onMounted(updateLine)

// 提供注册和注销方法给子组件
provide('tabs', {
  registerTab,
  unregisterTab,
  props
})
</script>

<style lang="scss" scoped>
.mobile-tabs {
  width: 100%;
  -webkit-tap-highlight-color: transparent;

  &__nav {
    position: relative;
    display: flex;
    width: 100%;
    height: 44px;
    background-color: $white;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    border-bottom: 1px solid $border-color;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__tab {
    position: relative;
    flex: 1;
    min-width: 88px;
    padding: 0 $spacing-md;
    font-size: $font-size-md;
    line-height: 44px;
    color: $text-color;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;

    &--active {
      color: $primary-color;
      font-weight: 500;
    }

    &--disabled {
      color: $text-color-secondary;
      cursor: not-allowed;
    }
  }

  &__tab-text {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__line {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: $primary-color;
    transition: all 0.3s;
  }

  &__content {
    position: relative;
    overflow: hidden;
  }
}
</style> 