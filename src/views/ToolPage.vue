<template>
  <div v-if="tool" class="max-w-4xl mx-auto">
    <!-- 工具头部 -->
    <div class="mb-8">
      <!-- 返回按钮 -->
      <router-link
        to="/"
        class="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
      >
        <ArrowLeft class="h-4 w-4" />
        返回工具箱
      </router-link>

      <!-- 工具信息 -->
      <div class="flex items-start gap-4">
        <div
          class="flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br"
          :class="categoryColor"
        >
          <component :is="toolIcon" class="h-8 w-8 text-white" />
        </div>
        <div class="flex-1">
          <h1 class="text-3xl font-bold mb-2">{{ tool.name }}</h1>
          <p class="text-lg text-muted-foreground mb-3">{{ tool.description }}</p>
          <div class="flex items-center gap-4">
            <span class="text-sm text-muted-foreground">
              分类：{{ categoryName }}
            </span>
            <div v-if="tool.tags && tool.tags.length > 0" class="flex gap-1">
              <span
                v-for="tag in tool.tags"
                :key="tag"
                class="px-2 py-1 text-xs bg-secondary rounded text-secondary-foreground"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具内容 -->
    <div class="card p-6">
      <Suspense>
        <template #default>
          <component
            v-if="toolComponent"
            :is="toolComponent"
          />
        </template>
        <template #fallback>
          <div class="flex items-center justify-center py-12">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span class="ml-3 text-muted-foreground">加载中...</span>
          </div>
        </template>
      </Suspense>

      <!-- 工具加载失败 -->
      <div v-if="!toolComponent && !loading" class="text-center py-12">
        <AlertCircle class="h-12 w-12 mx-auto text-destructive mb-4" />
        <h3 class="text-lg font-semibold mb-2">工具加载失败</h3>
        <p class="text-muted-foreground mb-4">该工具暂时无法使用，请稍后再试</p>
        <router-link to="/" class="btn btn-primary">
          返回工具箱
        </router-link>
      </div>
    </div>
  </div>

  <!-- 工具不存在 -->
  <div v-else class="text-center py-12">
    <Search class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
    <h3 class="text-lg font-semibold mb-2">工具不存在</h3>
    <p class="text-muted-foreground mb-4">您访问的工具不存在或已被移除</p>
    <router-link to="/" class="btn btn-primary">
      返回工具箱
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, AlertCircle, Search } from 'lucide-vue-next'
import * as LucideIcons from 'lucide-vue-next'
import { getToolById, categories } from '@/data/tools'
import type { Component } from 'vue'

interface Props {
  toolId: string
}

const props = defineProps<Props>()
const router = useRouter()

const toolComponent = ref<Component | null>(null)
const loading = ref(false)

/**
 * 获取工具信息
 */
const tool = computed(() => {
  return getToolById(props.toolId)
})

/**
 * 获取工具图标组件
 */
const toolIcon = computed(() => {
  if (!tool.value) return LucideIcons.Wrench
  const iconName = tool.value.icon as keyof typeof LucideIcons
  return LucideIcons[iconName] || LucideIcons.Wrench
})

/**
 * 获取分类信息
 */
const category = computed(() => {
  if (!tool.value) return null
  return categories.find(c => c.id === tool.value!.category)
})

/**
 * 分类名称
 */
const categoryName = computed(() => {
  return category.value?.name || '其他'
})

/**
 * 分类颜色
 */
const categoryColor = computed(() => {
  const colorMap = {
    'bg-blue-500': 'from-blue-500 to-blue-600',
    'bg-purple-500': 'from-purple-500 to-purple-600',
    'bg-green-500': 'from-green-500 to-green-600',
    'bg-orange-500': 'from-orange-500 to-orange-600',
    'bg-red-500': 'from-red-500 to-red-600',
    'bg-indigo-500': 'from-indigo-500 to-indigo-600',
    'bg-cyan-500': 'from-cyan-500 to-cyan-600',
    'bg-pink-500': 'from-pink-500 to-pink-600',
    'bg-yellow-500': 'from-yellow-500 to-yellow-600',
    'bg-teal-500': 'from-teal-500 to-teal-600',
  }
  const defaultColor = category.value?.color || 'bg-gray-500'
  return colorMap[defaultColor as keyof typeof colorMap] || 'from-gray-500 to-gray-600'
})

/**
 * 动态加载工具组件
 */
const loadToolComponent = async (toolId: string) => {
  if (!tool.value) return

  loading.value = true
  toolComponent.value = null

  try {
    // 动态导入工具组件
    const module = await import(`@/components/tools/${toolId}.vue`)
    toolComponent.value = module.default
  } catch (error) {
    console.error(`Failed to load tool component: ${toolId}`, error)
    toolComponent.value = null
  } finally {
    loading.value = false
  }
}

// 监听工具ID变化
watch(
  () => props.toolId,
  (newToolId) => {
    if (newToolId) {
      loadToolComponent(newToolId)
    }
  },
  { immediate: true }
)

// 更新页面标题
watch(
  tool,
  (newTool) => {
    if (newTool) {
      document.title = `${newTool.name} - SHN工具箱`
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.toolId) {
    loadToolComponent(props.toolId)
  }
})
</script> 