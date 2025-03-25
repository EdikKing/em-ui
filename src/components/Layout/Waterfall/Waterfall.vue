/**
 * 瀑布流组件
 * 支持动态列数、图片懒加载、加载状态显示等功能
 * 自动根据内容高度分配项目到最短的列
 */
<template>
  <!-- 瀑布流容器 -->
  <div class="mobile-waterfall" ref="container">
    <!-- 列容器 -->
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="mobile-waterfall__column"
      :style="{ width: `${100 / columnCount}%` }"
    >
      <!-- 项目容器 -->
      <div
        v-for="(item, index) in column"
        :key="item.id || index"
        class="mobile-waterfall__item"
        @click="handleClick(item, index)"
      >
        <!-- 自定义插槽，允许外部自定义项目内容 -->
        <slot name="item" :item="item">
          <!-- 默认项目内容 -->
          <div class="mobile-waterfall__image-wrapper">
            <!-- 图片，使用懒加载 -->
            <img
              v-lazy="item.image"
              :alt="item.title"
              class="mobile-waterfall__image"
              @load="handleImageLoad(item)"
              @error="handleImageError(item)"
            >
            <!-- 加载状态显示 -->
            <div v-if="item.loading" class="mobile-waterfall__loading">
              <div class="mobile-waterfall__loading-spinner"></div>
            </div>
          </div>
          <!-- 项目信息 -->
          <div class="mobile-waterfall__info">
            <div class="mobile-waterfall__title">{{ item.title }}</div>
            <div v-if="item.desc" class="mobile-waterfall__desc">{{ item.desc }}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

/**
 * 瀑布流项目接口定义
 */
interface WaterfallItem {
  id?: string | number      // 项目唯一标识
  title: string            // 项目标题
  image: string           // 图片地址
  desc?: string          // 项目描述
  loading?: boolean      // 加载状态
  error?: boolean       // 错误状态
  height?: number      // 项目高度
  [key: string]: any   // 其他自定义属性
}

/**
 * 组件属性接口定义
 */
interface Props {
  items: WaterfallItem[]    // 项目数据列表
  column?: 2 | 3 | 4       // 列数，支持2-4列
  gutter?: number          // 列间距
}

// 设置默认属性值
const props = withDefaults(defineProps<Props>(), {
  column: 2,
  gutter: 16
})

// 定义事件
const emit = defineEmits<{
  (e: 'click', item: WaterfallItem, index: number): void
}>()

// 组件引用
const container = ref<HTMLElement | null>(null)
// 计算列数
const columnCount = computed(() => props.column)
// 列数据
const columns = ref<WaterfallItem[][]>([])

/**
 * 初始化列数组
 * 根据列数创建对应数量的空数组
 */
const initColumns = () => {
  columns.value = Array.from({ length: columnCount.value }, () => [])
}

/**
 * 重新分配项目到列
 * 将项目分配到高度最短的列中
 */
const redistributeItems = () => {
  initColumns()
  props.items.forEach(item => {
    // 找出当前高度最短的列
    const shortestColumn = columns.value.reduce((prev, curr) => 
      prev.length <= curr.length ? prev : curr
    )
    shortestColumn.push(item)
  })
}

/**
 * 处理图片加载完成事件
 * 更新项目状态并重新计算布局
 */
const handleImageLoad = (item: WaterfallItem) => {
  item.loading = false
  item.error = false
  // 获取实际图片高度
  const img = new Image()
  img.src = item.image
  img.onload = () => {
    item.height = img.height
    // 重新计算布局
    redistributeItems()
  }
}

/**
 * 处理图片加载错误事件
 */
const handleImageError = (item: WaterfallItem) => {
  item.loading = false
  item.error = true
}

/**
 * 处理项目点击事件
 */
const handleClick = (item: WaterfallItem, index: number) => {
  emit('click', item, index)
}

// 监听项目数据变化，重新计算布局
watch(() => props.items, () => {
  redistributeItems()
}, { deep: true })

// 监听列数变化，重新计算布局
watch(() => props.column, () => {
  redistributeItems()
})

// 组件挂载时初始化
onMounted(() => {
  initColumns()
  redistributeItems()
})

// 组件卸载时清理数据
onUnmounted(() => {
  columns.value = []
})
</script>

<style lang="scss" scoped>
/* 瀑布流容器样式 */
.mobile-waterfall {
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 $spacing-md;
  box-sizing: border-box;
}

/* 列容器样式 */
.mobile-waterfall__column {
  padding: 0 $spacing-sm;
  box-sizing: border-box;
}

/* 项目容器样式 */
.mobile-waterfall__item {
  background-color: $white;
  border-radius: $border-radius-md;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: $spacing-md;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  &:active {
    opacity: 0.8;
  }
}

/* 图片容器样式 */
.mobile-waterfall__image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%; // 1:1 宽高比
  overflow: hidden;
}

/* 图片样式 */
.mobile-waterfall__image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

/* 加载状态容器样式 */
.mobile-waterfall__loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}

/* 加载动画样式 */
.mobile-waterfall__loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid $primary-color;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* 项目信息样式 */
.mobile-waterfall__info {
  padding: $spacing-md;
}

/* 标题样式 */
.mobile-waterfall__title {
  font-size: $font-size-md;
  color: $text-color;
  line-height: 1.5;
  margin-bottom: 4px;
}

/* 描述文本样式 */
.mobile-waterfall__desc {
  font-size: $font-size-sm;
  color: $text-color-secondary;
  line-height: 1.5;
}

/* 加载动画关键帧 */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 