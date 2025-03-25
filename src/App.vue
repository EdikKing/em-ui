<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import MobileNavBar from './components/NavBar/NavBar.vue'
import MobileTabBar from './components/TabBar/TabBar.vue'
import { HomeOutline, GridOutline, ListOutline, PersonOutline } from '@vicons/ionicons5'

const router = useRouter()
const activeTab = ref(0)

const tabItems = [
  { text: '首页', icon: HomeOutline, path: '/' },
  { text: '布局', icon: GridOutline, path: '/layout' },
  { text: '组件', icon: ListOutline, path: '/tabs' },
  { text: '我的', icon: PersonOutline, path: '/user' }
]

watch(activeTab, (newValue) => {
  router.push(tabItems[newValue].path)
})
</script>

<template>
  <div class="app">
    <div class="top">
      <mobile-nav-bar title="移动端组件库" />
    </div>
    <div class="body">
      <router-view></router-view>
    </div>
    <div class="nav">
      <mobile-tab-bar v-model="activeTab" :items="tabItems" />
    </div>
  </div>
</template>

<style lang="scss">
.app {
  height: 100vh;
  background-color: $background-color;
  display: flex;
  flex-direction: column;
  .top {
    height: 44px;
    display: flex;
  }
  .body {
    flex: 1;
    overflow: auto;
  }
  .nav {
    height: 50px;
    display: flex;
  }
}
</style>
