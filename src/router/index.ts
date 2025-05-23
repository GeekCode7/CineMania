import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: () => import('../views/MovieView.vue'),
  },
  {
    path: '/contacto',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
