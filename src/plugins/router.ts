import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'

import Layouts from '@/layouts/Layout.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/',
    component: Layouts,
    redirect: '/dashboard/index',
    meta: {
      title: '首页',
    },
    name: 'Home',
    children: [
      {
        path: '/dashboard/index',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          hidden: true,
        },
      },
    ],
  },

  {
    path: '/test',
    component: Layouts,
    redirect: '/test/text-1',
    meta: {
      title: '测试页面',
    },
    name: 'Test',
    children: [
      {
        path: '/test/test-1',
        component: () => import('@/views/test/test-1.vue'),
        meta: {
          title: '测试页面-1',
        },
      },

      {
        path: '/test/test-2',
        component: () => import('@/views/test/test-2.vue'),
        meta: {
          title: '测试页面-2',
        },
      },
    ],
  },
  {
    path: '/redirect',
    component: Layouts,
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/redirect/:path(.*)',
        meta: {
          hiddenTabs: true, // 不在tabs中显示
        },
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // { path: '*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  scrollBehavior: () => ({
    y: 0,
  }),
  routes,
})
export default router
