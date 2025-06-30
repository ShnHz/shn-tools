import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// 导入路由
import routes from './router/routes'

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（浏览器前进/后退按钮）
    if (savedPosition) {
      return savedPosition
    }
    
    // 从工具页面返回首页时，使用锚点定位到之前点击的工具
    if (to.name === 'Home' && from.name === 'Tool') {
      const lastClickedTool = sessionStorage.getItem('lastClickedTool')
      if (lastClickedTool) {
        return new Promise((resolve) => {
          // 确保DOM完全渲染后再定位
          setTimeout(() => {
            const element = document.getElementById(`tool-${lastClickedTool}`)
            if (element) {
              const rect = element.getBoundingClientRect()
              const scrollTop = window.pageYOffset + rect.top - 100 // 向上偏移100px留出空间
              resolve({ top: scrollTop, behavior: 'smooth' })
            } else {
              resolve({ top: 0 })
            }
          }, 100)
        })
      }
    }
    
    // 跳转到工具页面时，滚动到顶部
    if (to.name === 'Tool') {
      return { top: 0, behavior: 'smooth' }
    }
    
    // 默认行为
    return { top: 0 }
  }
})

// 创建 Pinia 实例
const pinia = createPinia()

// 创建应用
const app = createApp(App)

// 使用插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app') 