<template>
  <div class="grid-view">
    <mobile-nav-bar title="宫格布局" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>2列宫格</h3>
      <mobile-grid :items="gridItems" :column="2" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>3列宫格</h3>
      <mobile-grid :items="gridItems" :column="3" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>4列宫格</h3>
      <mobile-grid :items="gridItems" :column="4" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>5列宫格</h3>
      <mobile-grid :items="gridItems" :column="5" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>自定义内容</h3>
      <mobile-grid :items="gridItems" :column="3" @click="handleClick">
        <template #icon="{ item }">
          <div class="custom-icon">
            <component :is="item.icon" />
            <div class="custom-badge" v-if="item.badge">{{ item.badge }}</div>
          </div>
        </template>
      </mobile-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileGrid from '../../components/Layout/Grid/Grid.vue'
import { 
  HomeOutline, 
  SearchOutline, 
  AddCircleOutline, 
  PersonOutline,
  SettingsOutline,
  HeartOutline,
  StarOutline,
  ChatbubbleOutline,
  NotificationsOutline,
  CartOutline
} from '@vicons/ionicons5'

const router = useRouter()

const gridItems = [
  { text: '首页', icon: HomeOutline },
  { text: '搜索', icon: SearchOutline },
  { text: '发布', icon: AddCircleOutline },
  { text: '我的', icon: PersonOutline },
  { text: '设置', icon: SettingsOutline },
  { text: '收藏', icon: HeartOutline },
  { text: '关注', icon: StarOutline },
  { text: '消息', icon: ChatbubbleOutline, badge: '99+' },
  { text: '通知', icon: NotificationsOutline, badge: '新' },
  { text: '购物车', icon: CartOutline }
]

const handleClick = (item: any) => {
  console.log('点击了:', item)
}
</script>

<style lang="scss" scoped>
.grid-view {
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

  .custom-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;

    .custom-badge {
      position: absolute;
      top: -6px;
      right: -6px;
      min-width: 16px;
      height: 16px;
      padding: 0 4px;
      font-size: $font-size-xs;
      line-height: 16px;
      text-align: center;
      color: $white;
      background-color: $danger-color;
      border-radius: 8px;
    }
  }
}
</style> 