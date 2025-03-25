<template>
  <div class="layout-view">
    <mobile-grid :items="layoutItems" :column="2" @click="handleLayoutClick">
      <template #icon="{ item }">
        <component :is="item.icon" />
      </template>
    </mobile-grid>
  </div>
</template>

<script setup lang="ts">
import { GridOutline, ListOutline, AppsOutline, CardOutline, WaterOutline, GridSharp, MenuOutline } from '@vicons/ionicons5'
import { useRouter } from 'vue-router'
import MobileGrid from '../components/Layout/Grid/Grid.vue'

const router = useRouter()

const layoutItems = [
  {
    text: '列表布局',
    icon: ListOutline,
    path: '/layout/list'
  },
  {
    text: '宫格布局',
    icon: GridOutline,
    path: '/layout/grid'
  },
  {
    text: '卡片布局',
    icon: CardOutline,
    path: '/layout/card'
  },
  {
    text: '瀑布流布局',
    icon: WaterOutline,
    path: '/layout/waterfall'
  },
  {
    text: '索引列表',
    icon: AppsOutline,
    path: '/layout/index-list'
  },
  {
    text: '栅格布局',
    icon: GridSharp,
    path: '/layout/row-col'
  },
  {
    text: '标签页',
    icon: MenuOutline,
    path: '/tabs'
  }
]

const handleLayoutClick = (item: any) => {
  router.push(item.path)
}
</script>

<style lang="scss" scoped>
.layout-view {
  padding: $spacing-md;
}
</style> 