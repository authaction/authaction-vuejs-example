import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { authService } from '../services/AuthService'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/callback',
      component: { template: '<div>Loading...</div>' },
      beforeEnter: (to, from, next) => {
        authService
          .handleCallback()
          .then(() => next('/'))
          .catch((err) => console.error(err))
      }
    },
    {
      path: '/logout-callback',
      component: { template: '<div>Logging out...</div>' },
      beforeEnter: (to, from, next) => {
        authService
          .handleLogoutCallback()
          .then(() => next('/'))
          .catch((err) => console.error(err))
      }
    }
  ]
})

export default router
