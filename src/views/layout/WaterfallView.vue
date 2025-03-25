<template>
  <div class="waterfall-view">
    <mobile-nav-bar title="瀑布流布局" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>2列瀑布流</h3>
      <mobile-waterfall :items="waterfallItems" :column="2" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>3列瀑布流</h3>
      <mobile-waterfall :items="waterfallItems" :column="3" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>自定义内容</h3>
      <mobile-waterfall :items="waterfallItems" :column="2" @click="handleClick">
        <template #item="{ item }">
          <div class="custom-item">
            <img :src="item.image" :alt="item.title" class="custom-image">
            <div class="custom-info">
              <div class="custom-title">{{ item.title }}</div>
              <div class="custom-desc">{{ item.desc }}</div>
              <div class="custom-price">¥{{ item.price }}</div>
            </div>
          </div>
        </template>
      </mobile-waterfall>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileWaterfall from '../../components/Layout/Waterfall/Waterfall.vue'

const router = useRouter()

const waterfallItems = [
  {
    title: '商品1',
    image: 'https://picsum.photos/300/400',
    desc: '商品描述1',
    price: 99.99
  },
  {
    title: '商品2',
    image: 'https://picsum.photos/300/300',
    desc: '商品描述2',
    price: 199.99
  },
  {
    title: '商品3',
    image: 'https://picsum.photos/300/350',
    desc: '商品描述3',
    price: 299.99
  },
  {
    title: '商品4',
    image: 'https://picsum.photos/300/450',
    desc: '商品描述4',
    price: 399.99
  },
  {
    title: '商品5',
    image: 'https://picsum.photos/300/320',
    desc: '商品描述5',
    price: 499.99
  },
  {
    title: '商品6',
    image: 'https://picsum.photos/300/380',
    desc: '商品描述6',
    price: 599.99
  }
]

const handleClick = (item: any) => {
  console.log('点击了:', item)
}
</script>

<style lang="scss" scoped>
.waterfall-view {
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
    .custom-image {
      width: 100%;
      height: auto;
      display: block;
    }

    .custom-info {
      padding: $spacing-md;
    }

    .custom-title {
      font-size: $font-size-md;
      color: $text-color;
      margin-bottom: 4px;
    }

    .custom-desc {
      font-size: $font-size-sm;
      color: $text-color-secondary;
      margin-bottom: 8px;
    }

    .custom-price {
      font-size: $font-size-lg;
      color: $primary-color;
      font-weight: bold;
    }
  }
}
</style> 