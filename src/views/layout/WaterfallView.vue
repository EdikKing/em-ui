<template>
  <div class="waterfall-view">
    <mobile-nav-bar title="瀑布流布局" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>2列瀑布流</h3>
      <p class="demo-desc">基础2列瀑布流布局，自动根据内容高度分配</p>
      <mobile-waterfall :items="waterfallItems" :column="2" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>3列瀑布流</h3>
      <p class="demo-desc">3列瀑布流布局，适合展示更多内容</p>
      <mobile-waterfall :items="waterfallItems" :column="3" @click="handleClick" />
    </div>

    <div class="demo-section">
      <h3>自定义内容</h3>
      <p class="demo-desc">使用插槽自定义每个项目的内容和样式</p>
      <mobile-waterfall :items="waterfallItems" :column="2" @click="handleClick">
        <template #item="{ item }">
          <div class="custom-item">
            <div class="custom-image-wrapper">
              <img :src="item.image" :alt="item.title" class="custom-image">
              <div v-if="item.loading" class="custom-loading">
                <div class="custom-loading-spinner"></div>
              </div>
            </div>
            <div class="custom-info">
              <div class="custom-title">{{ item.title }}</div>
              <div class="custom-desc">{{ item.desc }}</div>
              <div class="custom-price">¥{{ item.price }}</div>
            </div>
          </div>
        </template>
      </mobile-waterfall>
    </div>

    <div class="demo-section">
      <h3>动态加载</h3>
      <p class="demo-desc">模拟动态加载更多数据</p>
      <mobile-waterfall :items="dynamicItems" :column="2" @click="handleClick" />
      <div class="load-more">
        <button class="load-more-btn" @click="loadMore">加载更多</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileWaterfall from '../../components/Layout/Waterfall/Waterfall.vue'

const router = useRouter()

// 基础数据
const waterfallItems = [
  {
    id: 1,
    title: '商品1',
    image: 'https://picsum.photos/300/500',
    desc: '商品描述1',
    price: 99.99
  },
  {
    id: 2,
    title: '商品2',
    image: 'https://picsum.photos/300/200',
    desc: '商品描述2',
    price: 199.99
  },
  {
    id: 3,
    title: '商品3',
    image: 'https://picsum.photos/300/400',
    desc: '商品描述3',
    price: 299.99
  },
  {
    id: 4,
    title: '商品4',
    image: 'https://picsum.photos/300/300',
    desc: '商品描述4',
    price: 399.99
  },
  {
    id: 5,
    title: '商品5',
    image: 'https://picsum.photos/300/600',
    desc: '商品描述5',
    price: 499.99
  },
  {
    id: 6,
    title: '商品6',
    image: 'https://picsum.photos/300/250',
    desc: '商品描述6',
    price: 599.99
  },
  {
    id: 7,
    title: '商品7',
    image: 'https://picsum.photos/300/450',
    desc: '商品描述7',
    price: 699.99
  },
  {
    id: 8,
    title: '商品8',
    image: 'https://picsum.photos/300/350',
    desc: '商品描述8',
    price: 799.99
  }
]

// 动态加载数据
const dynamicItems = ref(waterfallItems.slice(0, 4))
let currentPage = 1

const loadMore = () => {
  currentPage++
  const start = (currentPage - 1) * 4
  const end = start + 4
  const newItems = waterfallItems.slice(start, end)
  dynamicItems.value = [...dynamicItems.value, ...newItems]
}

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
      margin-bottom: $spacing-sm;
      color: $text-color;
    }

    .demo-desc {
      margin-bottom: $spacing-md;
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }

  .custom-item {
    .custom-image-wrapper {
      position: relative;
      width: 100%;
      padding-top: 100%;
      overflow: hidden;
    }

    .custom-image {
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

    .custom-loading {
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

    .custom-loading-spinner {
      width: 24px;
      height: 24px;
      border: 3px solid $primary-color;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
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

  .load-more {
    margin: $spacing-md;
    text-align: center;

    .load-more-btn {
      padding: $spacing-sm $spacing-lg;
      font-size: $font-size-md;
      color: $white;
      background-color: $primary-color;
      border: none;
      border-radius: $border-radius-md;
      cursor: pointer;

      &:active {
        opacity: 0.8;
      }
    }
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 