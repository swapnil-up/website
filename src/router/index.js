import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import ArticlePage from '../views/ArticlePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutPage.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/AllArticlesPage.vue'),
    },
    {
      path: '/articles/:filename',
      name: 'ArticlePage',
      component: ArticlePage,
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/TagsPage.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router
