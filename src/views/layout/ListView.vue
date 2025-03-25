<template>
  <div class="list-view">
    <mobile-nav-bar title="列表布局" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>基础列表</h3>
      <mobile-list :items="basicItems" />
    </div>

    <div class="demo-section">
      <h3>可点击列表</h3>
      <mobile-list :items="clickableItems" clickable @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>自定义右侧内容</h3>
      <mobile-list :items="customItems">
        <template #right="{ item }">
          <span class="custom-right">{{ item.right }}</span>
        </template>
      </mobile-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileList from '../../components/Layout/List/List.vue'

const router = useRouter()

const basicItems = [
  { title: '标题1', desc: '描述文本1' },
  { title: '标题2', desc: '描述文本2' },
  { title: '标题3', desc: '描述文本3' }
]

const clickableItems = [
  { title: '可点击项1', desc: '点击查看详情' },
  { title: '可点击项2', desc: '点击查看详情' },
  { title: '可点击项3', desc: '点击查看详情' }
]

const customItems = [
  { title: '自定义项1', right: '99+' },
  { title: '自定义项2', right: '新' },
  { title: '自定义项3', right: '已读' }
]

const handleClick = (item: any) => {
  console.log('点击了:', item)
}
</script>

<style lang="scss" scoped>
.list-view {
  .demo-section {
    margin: $spacing-md;
    padding: $spacing-md;
    background-color: $white;
    border-radius: $border-radius-md;

    h3 {
      margin-bottom: $spacing-md;
      color: $text-color;
    }
  }

  .custom-right {
    color: $primary-color;
    font-weight: bold;
  }
}
</style> 