<template>
  <div class="space-y-12">
    <!-- 简洁的头部介绍 -->
    <div class="text-center space-y-6">
      <!-- 主标题区域 -->
      <div class="space-y-4">
        <div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span class="text-gradient">SHN工具箱</span>
          </h1>
        </div>
        
        <div>
          <p class="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            为开发者精心打造的实用工具集合
          </p>
        </div>
      </div>
    </div>

    <!-- 现代化搜索框 -->
    <div>
      <div class="max-w-xl mx-auto">
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          <div class="relative">
            <Search class="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索工具、标签或描述..."
              class="input pl-12 pr-4 h-14 text-base bg-background/50 backdrop-blur-sm border-border/50 focus:border-primary/50 shadow-lg"
            />
            <!-- 搜索建议按钮 -->
            <button 
              v-if="searchQuery"
              @click="searchQuery = ''"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-accent transition-colors"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <!-- 快速搜索建议 -->
        <div class="mt-3 flex flex-wrap justify-center gap-2">
          <button
            v-for="suggestion in searchSuggestions"
            :key="suggestion"
            @click="searchQuery = suggestion"
            class="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
          >
            {{ suggestion }}
          </button>
        </div>
      </div>
    </div>

    <!-- 常用工具区域 -->
    <div v-if="!searchQuery && !selectedCategory" class="space-y-6">
      <div class="text-left">
        <h2 class="text-2xl font-bold text-foreground mb-2">
          常用工具
        </h2>
        <p class="text-muted-foreground text-sm">精选最受欢迎的开发工具</p>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl">
        <div
          v-for="(tool, index) in commonTools"
          :key="tool.id"
          :id="`tool-${tool.id}`"
          :class="[
            'group relative overflow-hidden rounded-xl p-6 text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer tool-card-anchor',
            getGradientClass(index)
          ]"
          @click="navigateToTool(tool.id)"
        >
          <!-- 背景装饰 -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
          <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -ml-8 -mb-8"></div>
          
          <!-- 内容 -->
          <div class="relative z-10">
            <h3 class="text-lg font-semibold mb-2">{{ tool.name }}</h3>
            <p class="text-white/80 text-sm">{{ tool.description }}</p>
          </div>
          
          <!-- Hover效果 -->
          <div class="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
    </div>

    <!-- 分类过滤 -->
    <div>
      <div class="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
        <button
          @click="selectedCategory = null"
          :class="[
            'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group',
            selectedCategory === null 
              ? 'gradient-primary text-primary-foreground shadow-colored' 
              : 'bg-secondary/50 text-secondary-foreground hover:bg-accent hover:scale-105 hover:shadow-md border border-border/50'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <Sparkles class="h-4 w-4" />
            全部工具
          </span>
          <div v-if="selectedCategory !== null" class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </button>
        
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="[
            'px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden group',
            selectedCategory === category.id
              ? 'gradient-primary text-primary-foreground shadow-colored'
              : 'bg-secondary/50 text-secondary-foreground hover:bg-accent hover:scale-105 hover:shadow-md border border-border/50'
          ]"
        >
          <span class="relative z-10 flex items-center gap-2">
            <component :is="getCategoryIcon(category.icon)" class="h-4 w-4" />
            {{ category.name }}
          </span>
          <div v-if="selectedCategory !== category.id" class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </button>
      </div>
    </div>

    <!-- 工具网格区域 -->
    <div class="space-y-8">
      <!-- 区域标题 -->
      <div class="text-center space-y-2">
        <!-- 结果统计 -->
        <div v-if="searchQuery || selectedCategory" class="flex items-center justify-center gap-2 text-muted-foreground">
          <div class="flex items-center gap-1">
            <div class="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
            <span class="text-sm">找到 {{ filteredTools.length }} 个工具</span>
          </div>
        </div>
      </div>
      
      <!-- 工具网格 -->
      <div v-if="filteredTools.length > 0" class="bento-grid">
        <div
          v-for="tool in filteredTools"
          :key="tool.id"
        >
          <ToolCard
            :tool="tool"
          />
        </div>
      </div>
      
      <!-- 空状态 -->
      <div v-else class="text-center py-16 space-y-6">
        <div class="relative mx-auto w-24 h-24">
          <div class="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-ping"></div>
          <div class="relative flex items-center justify-center w-24 h-24 rounded-full bg-muted/50 backdrop-blur-sm">
            <Search class="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
        
        <div class="space-y-2">
          <h3 class="text-xl font-semibold text-foreground">未找到相关工具</h3>
          <p class="text-muted-foreground max-w-md mx-auto">
            尝试使用其他关键词搜索，或者浏览其他分类查看更多工具
          </p>
        </div>
        
        <!-- 搜索建议 -->
        <div class="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
          <button
            v-for="suggestion in searchSuggestions.slice(0, 4)"
            :key="suggestion"
            @click="searchQuery = suggestion"
            class="px-4 py-2 text-sm rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
          >
            试试 "{{ suggestion }}"
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Search, 
  X, 
  Sparkles 
} from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { tools, categories, getFeaturedTools, searchTools } from '@/data/tools'
import type { ToolCategory } from '@/types/tools'
import ToolCard from '@/components/ToolCard.vue'

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref<ToolCategory | null>(null)

/**
 * 搜索建议列表
 */
const searchSuggestions = ref([
  'JSON', '颜色', 'Base64', '时间戳', '二维码', 'UUID'
])

/**
 * 获取分类图标组件
 */
const getCategoryIcon = (iconName: string) => {
  const icon = LucideIcons[iconName as keyof typeof LucideIcons]
  return icon || LucideIcons.Wrench
}

/**
 * 获取渐变背景类
 */
const getGradientClass = (index: number) => {
  const gradients = [
    'bg-gradient-to-br from-blue-500 to-purple-600',
    'bg-gradient-to-br from-green-500 to-teal-600',
    'bg-gradient-to-br from-orange-500 to-red-600',
    'bg-gradient-to-br from-purple-500 to-pink-600',
    'bg-gradient-to-br from-teal-500 to-cyan-600',
    'bg-gradient-to-br from-indigo-500 to-blue-600'
  ]
  return gradients[index % gradients.length]
}

/**
 * 导航到工具页面
 */
const navigateToTool = (toolId: string) => {
  // 保存当前点击的工具ID
  sessionStorage.setItem('lastClickedTool', toolId)
  // 导航到工具页面
  router.push(`/tool/${toolId}`)
}

/**
 * 常用工具列表（6个）
 */
const commonTools = computed(() => getFeaturedTools().slice(0, 6))

/**
 * 过滤后的工具列表
 */
const filteredTools = computed(() => {
  let result = tools

  // 搜索过滤
  if (searchQuery.value.trim()) {
    result = searchTools(searchQuery.value.trim())
  }

  // 分类过滤
  if (selectedCategory.value) {
    result = result.filter(tool => tool.category === selectedCategory.value)
  }

  // 如果显示常用工具，排除常用工具避免重复
  if (!searchQuery.value && !selectedCategory.value) {
    const commonIds = commonTools.value.map(t => t.id)
    result = result.filter(tool => !commonIds.includes(tool.id))
  }

  return result
})
</script>

<style scoped>
.tool-card-anchor {
  scroll-margin-top: 100px; /* 为锚点定位留出顶部空间 */
}
</style> 