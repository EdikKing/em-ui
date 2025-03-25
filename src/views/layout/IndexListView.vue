<template>
  <div class="index-list-view">
    <mobile-nav-bar title="索引列表" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>基础索引列表</h3>
      <mobile-index-list :groups="indexGroups" @click="handleClick" @index-click="handleIndexClick" />
    </div>

    <div class="demo-section">
      <h3>自定义内容</h3>
      <mobile-index-list :groups="indexGroups" @click="handleClick" @index-click="handleIndexClick">
        <template #item="{ item }">
          <div class="custom-item">
            <img :src="item.avatar" :alt="item.name" class="custom-avatar">
            <div class="custom-info">
              <div class="custom-name">{{ item.name }}</div>
              <div class="custom-phone">{{ item.phone }}</div>
            </div>
          </div>
        </template>
      </mobile-index-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileIndexList from '../../components/Layout/IndexList/IndexList.vue'

const router = useRouter()

const indexGroups = [
  {
    index: 'A',
    items: [
      { name: '阿明', phone: '13800138000', avatar: 'https://picsum.photos/50/50' },
      { name: '阿华', phone: '13800138001', avatar: 'https://picsum.photos/50/50' }
    ]
  },
  {
    index: 'B',
    items: [
      { name: '白明', phone: '13800138002', avatar: 'https://picsum.photos/50/50' },
      { name: '白云', phone: '13800138003', avatar: 'https://picsum.photos/50/50' }
    ]
  },
  {
    index: 'C',
    items: [
      { name: '陈明', phone: '13800138004', avatar: 'https://picsum.photos/50/50' },
      { name: '陈华', phone: '13800138005', avatar: 'https://picsum.photos/50/50' }
    ]
  }
]

const handleClick = (item: any) => {
  console.log('点击了:', item)
}

const handleIndexClick = (index: string) => {
  console.log('点击了索引:', index)
}
</script>

<style lang="scss" scoped>
.index-list-view {
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

  .custom-item {
    display: flex;
    align-items: center;
    gap: $spacing-md;

    .custom-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .custom-info {
      flex: 1;
    }

    .custom-name {
      font-size: $font-size-md;
      color: $text-color;
      margin-bottom: 4px;
    }

    .custom-phone {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }
}
</style> 