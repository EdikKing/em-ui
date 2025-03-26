/**
 * 标签页组件
 * 支持标签切换、禁用状态、自定义颜色、滚动等功能
 */
<template>
  <!-- 标签页容器 -->
  <div class="mobile-tabs">
    <!-- 标签导航栏 -->
    <div 
      ref="navRef"
      class="mobile-tabs__nav"
    >
      <!-- 标签项 -->
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
      <!-- 底部滑动条 -->
      <div
        class="mobile-tabs__line"
        :style="lineStyle"
      ></div>
    </div>
    <!-- 内容区域 -->
    <div class="mobile-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide, computed, onMounted, nextTick, watch } from 'vue'
import type { TabPaneProps } from './TabPane.vue'

/**
 * 标签页接口定义
 */
export interface Tab {
  name: string | number    // 标签页的唯一标识
  label: string          // 标签页显示的文本
  disabled?: boolean    // 是否禁用
}

/**
 * 组件属性接口定义
 */
interface Props {
  modelValue?: string | number
  lineWidth?: number | string
  linePosition?: 'left' | 'center' | 'right'
}

// 设置默认属性值
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  lineWidth: 'auto',
  linePosition: 'center'
})

// 定义事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

// 组件状态
const tabs = ref<TabPaneProps[]>([])                    // 标签页列表
const activeTab = ref<HTMLElement | null>(null)          // 当前激活的标签页元素
const navRef = ref<HTMLElement | null>(null)             // 导航栏容器引用

/**
 * 注册标签页
 * 子组件通过 provide/inject 调用此方法注册自己
 */
const registerTab = (tab: TabPaneProps) => {
  tabs.value.push(tab)
}

/**
 * 注销标签页
 * 子组件卸载时调用此方法注销自己
 */
const unregisterTab = (name: string | number) => {
  const index = tabs.value.findIndex(t => t.name === name)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

/**
 * 处理标签页点击事件
 */
const handleTabClick = (tab: TabPaneProps) => {
  if (tab.disabled) return
  emit('update:modelValue', tab.name)
  emit('change', tab.name)
}

/**
 * 计算底部滑动条样式
 * 根据当前激活的标签页位置计算滑动条的位置和宽度
 */
const lineStyle = computed(() => {
  if (!activeTab.value) return {}

  const tabText = activeTab.value.querySelector('.mobile-tabs__tab-text') as HTMLElement
  if (!tabText) return {}

  const tabElement = activeTab.value as HTMLElement
  const textWidth = tabText.offsetWidth

  // 计算滑块宽度
  let width = textWidth
  if (props.lineWidth !== 'auto') {
    const customWidth = typeof props.lineWidth === 'number' ? props.lineWidth : parseInt(props.lineWidth)
    // 如果自定义宽度大于文字宽度，则使用文字宽度
    width = Math.min(customWidth, textWidth)
  }

  // 计算滑块位置
  let transform = 0
  if (props.linePosition === 'left') {
    transform = tabElement.offsetLeft + tabText.offsetLeft
  } else if (props.linePosition === 'center') {
    // 居中时，需要考虑自定义宽度
    transform = tabElement.offsetLeft + (tabElement.offsetWidth - width) / 2
  } else if (props.linePosition === 'right') {
    // 右对齐时，需要考虑自定义宽度
    transform = tabElement.offsetLeft + tabElement.offsetWidth - width - tabText.offsetLeft
  }

  return {
    transform: `translateX(${transform}px)`,
    width: `${width}px`
  }
})

/**
 * 滚动到激活的标签页
 * 当标签页超出可视区域时，自动滚动到可见位置
 */
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

/**
 * 更新底部滑动条位置
 * 当激活的标签页改变时，更新滑动条位置并滚动到可见区域
 */
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

// 组件挂载时初始化
onMounted(() => {
  updateLine()
})

// 提供注册和注销方法给子组件
provide('tabs', {
  registerTab,
  unregisterTab,
  props
})
</script>

<style lang="scss" scoped>
/* 标签页容器样式 */
.mobile-tabs {
  width: 100%;
  -webkit-tap-highlight-color: transparent;
}

/* 标签导航栏样式 */
.mobile-tabs__nav {
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

  /* 隐藏滚动条 */
  &::-webkit-scrollbar {
    display: none;
  }
}

/* 标签项样式 */
.mobile-tabs__tab {
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

  /* 激活状态 */
  &--active {
    color: $primary-color;
    font-weight: 500;
  }

  /* 禁用状态 */
  &--disabled {
    color: $text-color-secondary;
    cursor: not-allowed;
  }
}

/* 标签文本样式 */
.mobile-tabs__tab-text {
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 底部滑动条样式 */
.mobile-tabs__line {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background-color: $primary-color;
  transition: all 0.3s;
}

/* 内容区域样式 */
.mobile-tabs__content {
  position: relative;
  overflow: hidden;
}
</style> 