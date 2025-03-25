import { createRouter, createWebHistory } from 'vue-router'
import LayoutView from '../views/LayoutView.vue'
import ListView from '../views/layout/ListView.vue'
import GridView from '../views/layout/GridView.vue'
import CardView from '../views/layout/CardView.vue'
import WaterfallView from '../views/layout/WaterfallView.vue'
import IndexListView from '../views/layout/IndexListView.vue'
import RowColView from '../views/layout/RowColView.vue'
import TabsView from '../views/TabsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/layout',
      name: 'layout',
      component: LayoutView
    },
    {
      path: '/layout/list',
      name: 'list',
      component: ListView
    },
    {
      path: '/layout/grid',
      name: 'grid',
      component: GridView
    },
    {
      path: '/layout/card',
      name: 'card',
      component: CardView
    },
    {
      path: '/layout/waterfall',
      name: 'waterfall',
      component: WaterfallView
    },
    {
      path: '/layout/index-list',
      name: 'index-list',
      component: IndexListView
    },
    {
      path: '/layout/row-col',
      name: 'row-col',
      component: RowColView
    },
    {
      path: '/tabs',
      name: 'tabs',
      component: TabsView
    }
  ]
})

export default router 