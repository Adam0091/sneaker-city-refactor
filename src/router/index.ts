import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BasketView from '@/views/BasketView.vue'
import { routePath } from '@/constants/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: routePath.home.path,
    component: HomeView
  },
  {
    path: routePath.category.path,
    component: HomeView
  },
  {
    path: routePath.basket.path,
    component: BasketView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
