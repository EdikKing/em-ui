<template>
  <div class="tabs-view">
    <mobile-nav-bar 
      title="标签页" 
      show-back 
      @back="router.back()" 
    />
    
    <div class="demo-section">
      <h3>基础标签页</h3>
      <mobile-tabs v-model="activeTab1">
        <mobile-tab-pane name="1" label="标签1">
          <div class="content">标签1的内容</div>
        </mobile-tab-pane>
        <mobile-tab-pane name="2" label="标签2">
          <div class="content">标签2的内容</div>
        </mobile-tab-pane>
        <mobile-tab-pane name="3" label="标签3">
          <div class="content">标签3的内容</div>
        </mobile-tab-pane>
      </mobile-tabs>
    </div>

    <div class="demo-section">
      <h3>禁用标签</h3>
      <mobile-tabs v-model="activeTab2">
        <mobile-tab-pane name="1" label="标签1">
          <div class="content">标签1的内容</div>
        </mobile-tab-pane>
        <mobile-tab-pane name="2" label="标签2" disabled>
          <div class="content">标签2的内容</div>
        </mobile-tab-pane>
        <mobile-tab-pane name="3" label="标签3">
          <div class="content">标签3的内容</div>
        </mobile-tab-pane>
      </mobile-tabs>
    </div>

    <div class="demo-section">
      <h3>滚动标签页</h3>
      <mobile-tabs v-model="activeTab4">
        <mobile-tab-pane
          v-for="i in 10"
          :key="i"
          :name="i.toString()"
          :label="`标签${i}`"
        >
          <div class="content">标签{{ i }}的内容</div>
        </mobile-tab-pane>
      </mobile-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MobileNavBar from '../components/NavBar/NavBar.vue'
import MobileTabs from '../components/Tabs/Tabs.vue'
import MobileTabPane from '../components/Tabs/TabPane.vue'

const router = useRouter()

const activeTab1 = ref('1')
const activeTab2 = ref('1')
const activeTab4 = ref('1')
</script>

<style lang="scss" scoped>
.tabs-view {
  // background-color: #ebedf0;
  .demo-section {
    // margin: $spacing-md;
    // padding: $spacing-md;
    // background-color: $white;
    // border-radius: $border-radius-md;
    // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

    h3 {
      margin-bottom: $spacing-md;
      color: $text-color;
      font-size: $font-size-lg;
      font-weight: 500;
      padding-left: 20px;
      padding-top: 10px;
    }
  }

  .content {
    padding: $spacing-md;
    text-align: center;
    color: $text-color;
    font-size: $font-size-md;
  }

  .custom-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: $spacing-xs 0;

    &__icon {
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
      background-color: currentColor;
      mask-size: cover;

      &.icon-home {
        mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTAgMjB2LTZoNHY2aDV2LThoM0wxMiAzIDIgMTJoM3Y4eiIvPjwvc3ZnPg==');
      }

      &.icon-like {
        mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMjEuMzVsLTEuNDUtMS4zMkM1LjQgMTUuMzYgMiAxMi4yOCAyIDguNSAyIDUuNDIgNC40MiAzIDcuNSAzYzEuNzQgMCAzLjQxLjgxIDQuNSAyLjA5QzEzLjA5IDMuODEgMTQuNzYgMyAxNi41IDMgMTkuNTggMyAyMiA1LjQyIDIyIDguNWMwIDMuNzgtMy40IDYuODYtOC41NSAxMS41M0wxMiAyMS4zNXoiLz48L3N2Zz4=');
      }

      &.icon-user {
        mask-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+PC9zdmc+');
      }
    }

    &__text {
      font-size: $font-size-sm;
      line-height: 1.2;
    }
  }
}
</style> 