import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Error from '../views/Error.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rank',
      component: HomeView,
    },
    {
      path: '/member',
      name: 'member',
      component: HomeView,
    },
    {
      path: '/match',
      name: 'match',
      component: HomeView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404',
    },
    {
      path: '/404',
      name: 'error',
      component: Error,
    },
  ],
})

export default router
