<template>
  <div class="row-col-view">
    <mobile-nav-bar title="栅格布局" show-back @back="router.back()" />
    
    <div class="demo-section">
      <h3>基础栅格</h3>
      <mobile-row>
        <mobile-col :span="6">
          <div class="demo-col">6</div>
        </mobile-col>
        <mobile-col :span="6">
          <div class="demo-col">6</div>
        </mobile-col>
        <mobile-col :span="6">
          <div class="demo-col">6</div>
        </mobile-col>
        <mobile-col :span="6">
          <div class="demo-col">6</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>带间距的栅格</h3>
      <mobile-row gutter="medium">
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>带偏移的栅格</h3>
      <mobile-row>
        <mobile-col :span="6" :offset="6">
          <div class="demo-col">6 offset 6</div>
        </mobile-col>
        <mobile-col :span="6" :offset="6">
          <div class="demo-col">6 offset 6</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>响应式栅格</h3>
      <mobile-row gutter="medium">
        <mobile-col :span="24" :sm="12" :md="8" :lg="6">
          <div class="demo-col">响应式</div>
        </mobile-col>
        <mobile-col :span="24" :sm="12" :md="8" :lg="6">
          <div class="demo-col">响应式</div>
        </mobile-col>
        <mobile-col :span="24" :sm="12" :md="8" :lg="6">
          <div class="demo-col">响应式</div>
        </mobile-col>
        <mobile-col :span="24" :sm="12" :md="8" :lg="6">
          <div class="demo-col">响应式</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>自动换行</h3>
      <mobile-row wrap gutter="medium">
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
        <mobile-col :span="8">
          <div class="demo-col">8</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>对齐方式</h3>
      <mobile-row align="center" justify="space-between" gutter="medium">
        <mobile-col :span="6">
          <div class="demo-col demo-col--tall">6</div>
        </mobile-col>
        <mobile-col :span="6">
          <div class="demo-col">6</div>
        </mobile-col>
        <mobile-col :span="6">
          <div class="demo-col demo-col--tall">6</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>隐藏列</h3>
      <mobile-row gutter="medium">
        <mobile-col :span="8" :hidden-sm="true">
          <div class="demo-col">隐藏于 sm</div>
        </mobile-col>
        <mobile-col :span="8" :hidden-md="true">
          <div class="demo-col">隐藏于 md</div>
        </mobile-col>
        <mobile-col :span="8" :hidden-lg="true">
          <div class="demo-col">隐藏于 lg</div>
        </mobile-col>
      </mobile-row>
    </div>

    <div class="demo-section">
      <h3>混合布局</h3>
      <mobile-row gutter="medium">
        <mobile-col :span="24" :md="16">
          <div class="demo-col demo-col--primary">主内容区</div>
        </mobile-col>
        <mobile-col :span="24" :md="8">
          <div class="demo-col demo-col--secondary">侧边栏</div>
        </mobile-col>
      </mobile-row>
      <mobile-row gutter="medium" class="mt-4">
        <mobile-col :span="24" :sm="12" :md="8">
          <div class="demo-col demo-col--success">卡片 1</div>
        </mobile-col>
        <mobile-col :span="24" :sm="12" :md="8">
          <div class="demo-col demo-col--warning">卡片 2</div>
        </mobile-col>
        <mobile-col :span="24" :sm="12" :md="8">
          <div class="demo-col demo-col--danger">卡片 3</div>
        </mobile-col>
      </mobile-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import MobileNavBar from '../../components/NavBar/NavBar.vue'
import MobileRow from '../../components/Layout/Row/Row.vue'
import MobileCol from '../../components/Layout/Col/Col.vue'

const router = useRouter()
</script>

<style lang="scss" scoped>
.row-col-view {
  .demo-section {
    margin: $spacing-md;
    padding: $spacing-md;
    background-color: $white;
    border-radius: $border-radius-md;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    h3 {
      margin-bottom: $spacing-md;
      color: $text-color;
      font-size: $font-size-lg;
      font-weight: 500;
    }
  }

  .demo-col {
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: $primary-color;
    color: $white;
    border-radius: $border-radius-sm;
    transition: all 0.3s ease-in-out;
    font-weight: 500;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &--tall {
      height: 60px;
      line-height: 60px;
    }

    &--primary {
      background-color: $primary-color;
    }

    &--secondary {
      background-color: $text-color-secondary;
    }

    &--success {
      background-color: $success-color;
    }

    &--warning {
      background-color: $warning-color;
    }

    &--danger {
      background-color: $danger-color;
    }
  }

  .mt-4 {
    margin-top: $spacing-md;
  }
}
</style> 