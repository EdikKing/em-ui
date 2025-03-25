<template>
  <div class="card-view">
    <mobile-nav-bar title="卡片布局" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>基础卡片</h3>
      <mobile-card>
        <div>这是卡片内容</div>
      </mobile-card>
    </div>

    <div class="demo-section">
      <h3>带标题的卡片</h3>
      <mobile-card>
        <template #header>
          <div class="card-header">
            <span>卡片标题</span>
            <span class="more">更多</span>
          </div>
        </template>
        <div>这是卡片内容</div>
      </mobile-card>
    </div>

    <div class="demo-section">
      <h3>带底部按钮的卡片</h3>
      <mobile-card>
        <div>这是卡片内容</div>
        <template #footer>
          <div class="card-footer">
            <button class="btn">取消</button>
            <button class="btn btn-primary">确定</button>
          </div>
        </template>
      </mobile-card>
    </div>

    <div class="demo-section">
      <h3>无阴影卡片</h3>
      <mobile-card :shadow="false">
        <div>这是无阴影的卡片内容</div>
      </mobile-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileCard from '../../components/Layout/Card/Card.vue'

const router = useRouter()
</script>

<style lang="scss" scoped>
.card-view {
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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .more {
      color: $primary-color;
      font-size: $font-size-sm;
    }
  }

  .card-footer {
    display: flex;
    justify-content: flex-end;
    gap: $spacing-md;

    .btn {
      padding: 6px 16px;
      border: 1px solid $border-color;
      border-radius: $border-radius-sm;
      background-color: $white;
      color: $text-color;
      font-size: $font-size-sm;

      &-primary {
        background-color: $primary-color;
        border-color: $primary-color;
        color: $white;
      }
    }
  }
}
</style> 