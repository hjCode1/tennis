import { createRouter, createWebHistory } from 'vue-router'
import Rank from '../views/Rank.vue'
import Match from '../views/Match.vue'
import Error from '../views/Error.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'rank',
      component: Rank,
    },
    {
      path: '/match',
      name: 'match',
      component: Match,
    },
    {
      path: '/admin',
      name: 'admin',
      component: Login,
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
