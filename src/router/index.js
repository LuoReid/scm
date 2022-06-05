// https://next.router.vuejs.org/zh/guide/advanced/dynamic-routing.html
import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'

import Layout from '@/layout/index.vue'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      icon: 'el-icon-s-home',
      noCache: true,
      roles: ['admin']
    }
  },
  {
    path: '/404',
    component: () => import('@/views/page/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/page/error-page/401.vue'),
    hidden: true
  },
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
]

const layoutRoutes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      title: '驾驶舱',
      icon: 'home',
      noCache: true,
      roles: ['admin']
    }
  },
  {
    path: '/projects/new',
    name: 'ProjectsNew',
    component: () => import('@/views/project/ProjectNew.vue'),
    meta: {
      title: '下单',
      icon: 'fun',
      roles: ['admin']
    },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('@/views/project/ProjectList.vue'),
    meta: {
      title: '项目',
      icon: 'example',
      roles: ['admin']
    },
  },
  {
    path: '/page',
    name: 'Page',
    component: Layout,
    redirect: '/demo/map/baidu',
    meta: {
      title: '页面',
      icon: 'shop'
    },
    children: [
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/page/user/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'user',
          noCache: true
        }
      },
    ]
  },
  {
    path: '/icon',
    name: 'Icons',
    meta: {
      title: 'Icon',
      icon: 'example',
      roles: ['admin']
    },
    component: () => import('@/views/demo/icons/index.vue'),
  },
  {
    path: '/external-link',
    name: 'ExternalLink',
    path: 'https://github.com/mvpyb/vite-element-plus-admin',
    meta: {
      title: '外链',
      icon: 'links'
    }
  },
]

export const asyncRoutes = [{
  path: '/',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard',
  children: [...layoutRoutes]
}]

const createRouters = createRouter({
  // history : createWebHashHistory( '/' ), // base 当成参数传递了
  history: createWebHistory('./'), // base 当成参数传递了
  routes: constantRoutes.concat(asyncRoutes),
  scrollBehavior: () => ({ left: 0, top: 0 }) //  return 期望滚动到哪个的位置
})

//
const router = createRouters

export function resetRouter() {
  const WHITE_NAME_LIST = ['Login']
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name && !WHITE_NAME_LIST.includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export default router
