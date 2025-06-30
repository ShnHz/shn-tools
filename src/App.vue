<template>
  <div class="min-h-screen bg-background text-foreground">
    <!-- 现代化导航栏 -->
    <header
      class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div class="container mx-auto">
        <div class="flex h-16 items-center justify-between px-4">
          <!-- Logo 和品牌 -->
          <router-link
            to="/"
            class="flex items-center space-x-3 group"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-all duration-200"
            >
              <Wrench class="h-5 w-5" />
            </div>
            <div class="hidden sm:block">
              <h1 class="text-xl font-bold text-gradient">SHN工具箱</h1>
              <p class="text-xs text-muted-foreground">100+ 开发工具集合</p>
            </div>
          </router-link>

          <!-- 右侧操作区 -->
          <div class="flex items-center space-x-2">
            <!-- 主题切换按钮 -->
            <button
              @click="toggleTheme"
              class="inline-flex items-center justify-center h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative overflow-hidden group"
              :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              ></div>
              <Sun
                v-if="isDark"
                class="h-4 w-4 relative z-10 transition-transform duration-200 group-hover:rotate-12"
              />
              <Moon
                v-else
                class="h-4 w-4 relative z-10 transition-transform duration-200 group-hover:-rotate-12"
              />
            </button>

            <!-- GitHub 链接 -->
            <a
              href="https://github.com/ShnHz/shn-tools"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center h-10 w-10 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring relative overflow-hidden group"
              title="查看源码"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              ></div>
              <Github
                class="h-4 w-4 relative z-10 transition-transform duration-200 group-hover:scale-110"
              />
            </a>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="min-h-screen">
      <div class="container mx-auto px-4 py-8">
        <router-view />
      </div>
    </main>

    <!-- 现代化页脚 -->
    <footer
      class="relative border-t border-border/40 bg-gradient-to-br from-muted/30 to-muted/10 backdrop-blur-sm"
    >
      <!-- 装饰性背景元素 -->
      <div
        class="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03]"
      ></div>

      <div class="container mx-auto px-4 py-12 relative">
        <!-- 主要页脚内容 -->
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <!-- 品牌介绍 -->
          <div class="space-y-4">
            <div class="flex items-center space-x-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground shadow-sm"
              >
                <Wrench class="h-4 w-4" />
              </div>
              <h3 class="text-lg font-semibold">SHN工具箱</h3>
            </div>

            <div class="flex space-x-2">
              <a
                href="#"
                class="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-secondary hover:bg-accent transition-all duration-200 hover:scale-110"
              >
                <Github class="h-4 w-4" />
              </a>
              <a
                href="#"
                class="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-secondary hover:bg-accent transition-all duration-200 hover:scale-110"
              >
                <Twitter class="h-4 w-4" />
              </a>
            </div>
          </div>

          <!-- 工具分类 -->
          <div class="space-y-4">
            <h4
              class="text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <Sparkles class="h-4 w-4 text-primary" />
              热门分类
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <button
                  @click="navigateToCategory('text')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span class="text-xs">🔤</span> 文本处理
                </button>
              </li>
              <li>
                <button
                  @click="navigateToCategory('color')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span class="text-xs">🎨</span> 颜色设计
                </button>
              </li>
              <li>
                <button
                  @click="navigateToCategory('encode')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span class="text-xs">🔐</span> 编码加密
                </button>
              </li>
              <li>
                <button
                  @click="navigateToCategory('data')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                >
                  <span class="text-xs">📊</span> 数据处理
                </button>
              </li>
            </ul>
          </div>

          <!-- 热门工具 -->
          <div class="space-y-4">
            <h4
              class="text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <Star class="h-4 w-4 text-primary" />
              热门工具
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <button
                  @click="navigateToTool('json-pretty')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                  >JSON 格式化</button
                >
              </li>
              <li>
                <button
                  @click="navigateToTool('base64-encode')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                  >Base64 编码</button
                >
              </li>
              <li>
                <button
                  @click="navigateToTool('color-picker')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                  >颜色选择器</button
                >
              </li>
              <li>
                <button
                  @click="navigateToTool('qr-generator')"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                  >二维码生成</button
                >
              </li>
            </ul>
          </div>

          <!-- 支持信息 -->
          <div class="space-y-4">
            <h4
              class="text-sm font-semibold text-foreground flex items-center gap-2"
            >
              <Heart class="h-4 w-4 text-primary" />
              支持
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a
                  target="_blank"
                  href="https://github.com/ShnHz/shn-tools/issues"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >常见问题</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/ShnHz/shn-tools/issues"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >意见反馈</a
                >
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://github.com/ShnHz/shn-tools"
                  class="text-muted-foreground hover:text-primary transition-colors duration-200"
                  >开源贡献</a
                >
              </li>
            </ul>
          </div>
        </div>

        <!-- 版权信息 -->
        <div class="mt-12 border-t border-border/40 pt-8">
          <div
            class="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0"
          >
            <div
              class="flex items-center space-x-4 text-sm text-muted-foreground"
            >
              <p>&copy; 2025 SHN工具箱</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import {
    Sun,
    Moon,
    Github,
    Twitter,
    Wrench,
    Sparkles,
    Star,
    Heart,
  } from 'lucide-vue-next'

  const router = useRouter()
  const isDark = ref(false)

  /**
   * 导航到特定分类
   */
  const navigateToCategory = (categoryId: string) => {
    // 如果当前不在首页，先跳转到首页，然后传递分类参数
    router.push({
      path: '/',
      query: { category: categoryId }
    })
  }

  /**
   * 导航到特定工具
   */
  const navigateToTool = (toolId: string) => {
    router.push(`/tool/${toolId}`)
  }

  /**
   * 切换主题模式
   */
  const toggleTheme = () => {
    isDark.value = !isDark.value
    const html = document.documentElement

    if (isDark.value) {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  /**
   * 初始化主题
   */
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches

    isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)

    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  }

  // 路由变化时更新页面标题
  router.afterEach((to) => {
    document.title =
      (to.meta.title as string) || 'SHN工具箱 - 100+ 开发者实用工具'
  })

  onMounted(() => {
    initTheme()
  })
</script>

<style scoped>
  /* 网格背景图案 */
  .bg-grid-pattern {
    background-image:
      linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
    background-size: 20px 20px;
  }

  /* 导航链接动画增强 */
  .router-link-active {
    color: hsl(var(--primary));
  }

  .router-link-active span {
    width: 100%;
  }
</style>
