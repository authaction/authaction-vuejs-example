import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/claims',
      name: 'claims',
      component: () => import('../views/ClaimsView.vue'),
    },
    {
      path: '/callback',
      component: () => import('../views/CallbackView.vue'),
    },
  ],
})

export default router
