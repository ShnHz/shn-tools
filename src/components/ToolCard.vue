<template>
  <div 
    :id="`tool-${tool.id}`"
    class="tool-card-anchor"
  >
    <router-link
      :to="`/tool/${tool.id}`"
      class="group block relative overflow-hidden"
      :class="[
        'card p-6 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl',
        featured ? 'card-featured shadow-colored' : 'hover:shadow-lg'
      ]"
      @click="saveScrollPosition"
    >
    <!-- 装饰性背景渐变 -->
    <div 
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      :class="backgroundGradient"
    ></div>
    
    <!-- 内容区域 -->
    <div class="relative z-10">
      <!-- 头部区域 -->
      <div class="flex items-start justify-between mb-6">
        <div class="flex items-start gap-4">
          <!-- 工具图标 -->
          <div class="relative">
            <div
              class="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              :class="categoryColor"
            >
              <component :is="toolIcon" class="h-7 w-7 text-white" />
            </div>
            <!-- 图标装饰点 -->
            <div class="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-background border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100"></div>
          </div>
          
          <!-- 工具信息 -->
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
              {{ tool.name }}
            </h3>
            <p class="text-sm text-muted-foreground flex items-center gap-1">
              <component :is="getCategoryIcon(category?.icon)" class="h-3 w-3" />
              {{ categoryName }}
            </p>
          </div>
        </div>
        
        <!-- 状态标识 -->
        <div class="flex flex-col gap-2">
          <!-- 热门标识 -->
          <div v-if="featured" class="relative">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 backdrop-blur-sm">
              <Star class="h-3 w-3 text-yellow-500 fill-current animate-pulse" />
              <span class="text-xs font-medium text-yellow-600 dark:text-yellow-400">热门</span>
            </div>
            <!-- 热门装饰效果 -->
            <div class="absolute inset-0 rounded-full bg-yellow-500/20 blur animate-ping"></div>
          </div>
          
          <!-- 未实现标识 -->
          <div v-if="!tool.implemented" class="relative">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-gray-500/10 to-slate-500/10 border border-gray-500/20 backdrop-blur-sm">
              <Clock class="h-3 w-3 text-gray-500" />
              <span class="text-xs font-medium text-gray-600 dark:text-gray-400">暂未支持</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 工具描述 -->
      <p class="text-muted-foreground text-sm mb-5 line-clamp-2 leading-relaxed">
        {{ tool.description }}
      </p>

      <!-- 工具标签 -->
      <div v-if="tool.tags && tool.tags.length > 0" class="flex flex-wrap gap-2 mb-5">
        <span
          v-for="tag in tool.tags.slice(0, 3)"
          :key="tag"
          class="tag text-xs hover:scale-105 transition-transform duration-200"
        >
          {{ tag }}
        </span>
        <span
          v-if="tool.tags.length > 3"
          class="tag text-xs opacity-60"
          :title="`还有 ${tool.tags.length - 3} 个标签`"
        >
          +{{ tool.tags.length - 3 }}
        </span>
      </div>

      <!-- 底部行动区域 -->
      <div class="flex items-center justify-between pt-2 border-t border-border/30">
        <span class="text-xs text-muted-foreground flex items-center gap-1">
          <Zap class="h-3 w-3" />
          立即使用
        </span>
        <div class="flex items-center gap-1 text-primary group-hover:gap-2 transition-all duration-200">
          <span class="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            开始
          </span>
          <ArrowRight class="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </div>

    <!-- 悬停时的光晕效果 -->
    <div class="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
  </router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Star, ArrowRight, Zap, Clock } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import type { ToolInfo } from '@/types/tools'
import { categories } from '@/data/tools'

interface Props {
  tool: ToolInfo
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false
})

/**
 * 获取工具图标组件
 */
const toolIcon = computed(() => {
  const iconName = props.tool.icon as keyof typeof LucideIcons
  return LucideIcons[iconName] || LucideIcons.Wrench
})

/**
 * 获取分类图标组件
 */
const getCategoryIcon = (iconName?: string) => {
  if (!iconName) return LucideIcons.Wrench
  const icon = LucideIcons[iconName as keyof typeof LucideIcons]
  return icon || LucideIcons.Wrench
}

/**
 * 获取分类信息
 */
const category = computed(() => {
  return categories.find(c => c.id === props.tool.category)
})

/**
 * 分类名称
 */
const categoryName = computed(() => {
  return category.value?.name || '其他'
})

/**
 * 分类颜色样式
 */
const categoryColor = computed(() => {
  const colorMap = {
    'bg-blue-500': 'bg-gradient-to-br from-blue-500 to-blue-600',
    'bg-purple-500': 'bg-gradient-to-br from-purple-500 to-purple-600',
    'bg-green-500': 'bg-gradient-to-br from-green-500 to-green-600',
    'bg-orange-500': 'bg-gradient-to-br from-orange-500 to-orange-600',
    'bg-red-500': 'bg-gradient-to-br from-red-500 to-red-600',
    'bg-indigo-500': 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    'bg-cyan-500': 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    'bg-pink-500': 'bg-gradient-to-br from-pink-500 to-pink-600',
    'bg-yellow-500': 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    'bg-teal-500': 'bg-gradient-to-br from-teal-500 to-teal-600',
  }
  const defaultColor = category.value?.color || 'bg-gray-500'
  return colorMap[defaultColor as keyof typeof colorMap] || 'bg-gradient-to-br from-gray-500 to-gray-600'
})

/**
 * 背景渐变样式
 */
const backgroundGradient = computed(() => {
  const gradients = [
    'bg-gradient-to-br from-purple-500/5 to-blue-500/5',
    'bg-gradient-to-br from-blue-500/5 to-cyan-500/5',
    'bg-gradient-to-br from-green-500/5 to-teal-500/5',
    'bg-gradient-to-br from-orange-500/5 to-red-500/5',
    'bg-gradient-to-br from-pink-500/5 to-purple-500/5',
  ]
  // 根据工具ID生成一致的渐变
  const index = props.tool.id.length % gradients.length
  return gradients[index]
})

/**
 * 保存滚动位置
 */
const saveScrollPosition = () => {
  // 保存当前工具卡片的ID，用于返回时定位
  sessionStorage.setItem('lastClickedTool', props.tool.id)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 