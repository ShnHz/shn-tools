import type { RouteRecordRaw } from 'vue-router'

// 懒加载页面组件
const HomePage = () => import('@/views/HomePage.vue')
const ToolPage = () => import('@/views/ToolPage.vue')

/**
 * 路由配置
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'SHN工具箱 - 100个实用小工具'
    }
  },
  {
    path: '/tool/:toolId',
    name: 'Tool',
    component: ToolPage,
    meta: {
      title: '工具'
    },
    props: true
  },
  {
    // 404 页面重定向到首页
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export default routes 