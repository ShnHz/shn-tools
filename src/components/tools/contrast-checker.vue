<template>
  <div class="space-y-6">
    <!-- 工具标题 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gradient mb-2">对比度检测</h1>
      <p class="text-muted-foreground">检查颜色对比度是否符合WCAG无障碍标准</p>
    </div>

    <!-- 颜色选择区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 前景色 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">前景色（文字颜色）</h3>
        <div class="space-y-4">
          <div class="flex gap-4 items-center">
            <input
              v-model="foregroundColor"
              type="color"
              class="w-16 h-16 rounded-lg border-2 border-border cursor-pointer"
              @input="checkContrast"
            />
            <div class="flex-1 space-y-2">
              <input
                v-model="foregroundColor"
                type="text"
                placeholder="#000000"
                class="input"
                @input="validateForeground"
              />
              <div class="text-xs text-muted-foreground">
                RGB: {{ foregroundRgb.r }}, {{ foregroundRgb.g }}, {{ foregroundRgb.b }}
              </div>
            </div>
          </div>
          
          <!-- 预设前景色 -->
          <div class="space-y-2">
            <div class="text-sm font-medium">常用前景色</div>
            <div class="flex gap-2">
              <button
                v-for="color in presetForegroundColors"
                :key="color.hex"
                @click="setForegroundColor(color.hex)"
                class="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
              ></button>
            </div>
          </div>
        </div>
      </div>

      <!-- 背景色 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4">背景色</h3>
        <div class="space-y-4">
          <div class="flex gap-4 items-center">
            <input
              v-model="backgroundColor"
              type="color"
              class="w-16 h-16 rounded-lg border-2 border-border cursor-pointer"
              @input="checkContrast"
            />
            <div class="flex-1 space-y-2">
              <input
                v-model="backgroundColor"
                type="text"
                placeholder="#FFFFFF"
                class="input"
                @input="validateBackground"
              />
              <div class="text-xs text-muted-foreground">
                RGB: {{ backgroundRgb.r }}, {{ backgroundRgb.g }}, {{ backgroundRgb.b }}
              </div>
            </div>
          </div>
          
          <!-- 预设背景色 -->
          <div class="space-y-2">
            <div class="text-sm font-medium">常用背景色</div>
            <div class="flex gap-2">
              <button
                v-for="color in presetBackgroundColors"
                :key="color.hex"
                @click="setBackgroundColor(color.hex)"
                class="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                :style="{ backgroundColor: color.hex }"
                :title="color.name"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 颜色预览 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">颜色预览</h3>
      <div 
        class="rounded-lg p-8 border-2 border-border transition-all"
        :style="{ 
          backgroundColor: backgroundColor,
          color: foregroundColor,
          borderColor: contrastRatio >= 4.5 ? '#10b981' : '#ef4444'
        }"
      >
        <div class="space-y-4">
          <h4 class="text-2xl font-bold">示例标题文字</h4>
          <p class="text-lg">这是一段常规正文内容，用于测试颜色对比度效果。</p>
          <p class="text-sm">这是小号文字内容，对比度要求更高。</p>
          <div class="flex gap-4">
            <button 
              class="px-4 py-2 border rounded"
              :style="{ borderColor: foregroundColor }"
            >
              按钮示例
            </button>
            <a href="#" class="underline">链接示例</a>
          </div>
        </div>
      </div>
    </div>

    <!-- 对比度结果 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 对比度值 -->
      <div class="card p-6 text-center">
        <div class="text-3xl font-bold mb-2" :class="contrastRatio >= 4.5 ? 'text-green-600' : 'text-red-600'">
          {{ contrastRatio.toFixed(2) }} : 1
        </div>
        <div class="text-sm text-muted-foreground">对比度</div>
        <div class="mt-2">
          <div 
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            :class="contrastRatio >= 7 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                   contrastRatio >= 4.5 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                   'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'"
          >
            <component 
              :is="contrastRatio >= 4.5 ? CheckCircle : XCircle"
              class="h-3 w-3"
            />
            {{ getContrastLevel(contrastRatio) }}
          </div>
        </div>
      </div>

      <!-- AA标准 -->
      <div class="card p-6">
        <h4 class="font-semibold mb-3 flex items-center gap-2">
          <component 
            :is="contrastRatio >= 4.5 ? CheckCircle : XCircle"
            :class="contrastRatio >= 4.5 ? 'text-green-600' : 'text-red-600'"
            class="h-4 w-4"
          />
          AA 标准 (WCAG 2.1)
        </h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>正常文字 (18px+)</span>
            <span :class="contrastRatio >= 4.5 ? 'text-green-600' : 'text-red-600'">
              {{ contrastRatio >= 4.5 ? '通过' : '不通过' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>大号文字 (24px+)</span>
            <span :class="contrastRatio >= 3 ? 'text-green-600' : 'text-red-600'">
              {{ contrastRatio >= 3 ? '通过' : '不通过' }}
            </span>
          </div>
          <div class="text-xs text-muted-foreground mt-2">
            最低要求，适用于大部分用户
          </div>
        </div>
      </div>

      <!-- AAA标准 -->
      <div class="card p-6">
        <h4 class="font-semibold mb-3 flex items-center gap-2">
          <component 
            :is="contrastRatio >= 7 ? CheckCircle : XCircle"
            :class="contrastRatio >= 7 ? 'text-green-600' : 'text-red-600'"
            class="h-4 w-4"
          />
          AAA 标准 (WCAG 2.1)
        </h4>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>正常文字 (18px+)</span>
            <span :class="contrastRatio >= 7 ? 'text-green-600' : 'text-red-600'">
              {{ contrastRatio >= 7 ? '通过' : '不通过' }}
            </span>
          </div>
          <div class="flex justify-between">
            <span>大号文字 (24px+)</span>
            <span :class="contrastRatio >= 4.5 ? 'text-green-600' : 'text-red-600'">
              {{ contrastRatio >= 4.5 ? '通过' : '不通过' }}
            </span>
          </div>
          <div class="text-xs text-muted-foreground mt-2">
            增强要求，提供更好的可访问性
          </div>
        </div>
      </div>
    </div>

    <!-- 建议和分析 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <Lightbulb class="h-5 w-5 text-yellow-500" />
        对比度分析与建议
      </h3>
      
      <div class="space-y-4">
        <!-- 当前状态 -->
        <div class="p-4 rounded-lg" :class="getStatusBgClass()">
          <div class="font-medium mb-2">{{ getStatusMessage() }}</div>
          <div class="text-sm opacity-90">{{ getStatusDescription() }}</div>
        </div>

        <!-- 改进建议 -->
        <div v-if="contrastRatio < 4.5" class="space-y-3">
          <h4 class="font-medium">改进建议</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- 调整前景色 -->
            <div class="p-3 bg-muted/50 rounded-lg">
              <div class="text-sm font-medium mb-2">调整前景色</div>
              <div class="space-y-2">
                <button
                  v-for="suggestion in foregroundSuggestions"
                  :key="suggestion.hex"
                  @click="setForegroundColor(suggestion.hex)"
                  class="w-full flex items-center gap-3 p-2 rounded border hover:bg-accent transition-colors"
                >
                  <div 
                    class="w-6 h-6 rounded border"
                    :style="{ backgroundColor: suggestion.hex }"
                  ></div>
                  <div class="flex-1 text-left">
                    <div class="text-xs">{{ suggestion.hex }}</div>
                    <div class="text-xs text-muted-foreground">
                      对比度: {{ suggestion.contrast.toFixed(2) }}:1
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <!-- 调整背景色 -->
            <div class="p-3 bg-muted/50 rounded-lg">
              <div class="text-sm font-medium mb-2">调整背景色</div>
              <div class="space-y-2">
                <button
                  v-for="suggestion in backgroundSuggestions"
                  :key="suggestion.hex"
                  @click="setBackgroundColor(suggestion.hex)"
                  class="w-full flex items-center gap-3 p-2 rounded border hover:bg-accent transition-colors"
                >
                  <div 
                    class="w-6 h-6 rounded border"
                    :style="{ backgroundColor: suggestion.hex }"
                  ></div>
                  <div class="flex-1 text-left">
                    <div class="text-xs">{{ suggestion.hex }}</div>
                    <div class="text-xs text-muted-foreground">
                      对比度: {{ suggestion.contrast.toFixed(2) }}:1
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速测试 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">快速测试</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          v-for="preset in quickTestPresets"
          :key="preset.name"
          @click="loadPreset(preset)"
          class="p-4 rounded-lg border hover:border-primary transition-colors"
          :style="{ backgroundColor: preset.background, color: preset.foreground }"
        >
          <div class="font-medium">{{ preset.name }}</div>
          <div class="text-xs opacity-75 mt-1">
            {{ calculateContrast(preset.foreground, preset.background).toFixed(2) }}:1
          </div>
        </button>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="card p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <Info class="h-5 w-5 text-blue-600" />
        WCAG 标准说明
      </h3>
      <div class="space-y-2 text-sm text-muted-foreground">
        <p>• <strong>AA 标准</strong>：正常文字需要 4.5:1 对比度，大号文字需要 3:1</p>
        <p>• <strong>AAA 标准</strong>：正常文字需要 7:1 对比度，大号文字需要 4.5:1</p>
        <p>• <strong>大号文字</strong>：18px 及以上的常规字体，或 14px 及以上的粗体</p>
        <p>• 对比度越高，文字越容易阅读，特别是对视觉障碍用户</p>
        <p>• 建议在设计时优先考虑 AA 标准，条件允许时尽量达到 AAA 标准</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Info,
  Palette,
  Eye
} from 'lucide-vue-next'

// 响应式数据
const foregroundColor = ref('#000000')
const backgroundColor = ref('#FFFFFF')

// 预设颜色
const presetForegroundColors = [
  { hex: '#000000', name: '纯黑' },
  { hex: '#333333', name: '深灰' },
  { hex: '#666666', name: '中灰' },
  { hex: '#FFFFFF', name: '纯白' },
  { hex: '#1F2937', name: '暗色主题文字' },
  { hex: '#374151', name: '次要文字' }
]

const presetBackgroundColors = [
  { hex: '#FFFFFF', name: '纯白' },
  { hex: '#F9FAFB', name: '浅灰' },
  { hex: '#F3F4F6', name: '背景灰' },
  { hex: '#000000', name: '纯黑' },
  { hex: '#1F2937', name: '暗色主题' },
  { hex: '#3B82F6', name: '主题蓝' }
]

// 快速测试预设
const quickTestPresets = [
  { name: '白底黑字', foreground: '#000000', background: '#FFFFFF' },
  { name: '黑底白字', foreground: '#FFFFFF', background: '#000000' },
  { name: '蓝底白字', foreground: '#FFFFFF', background: '#3B82F6' },
  { name: '绿底白字', foreground: '#FFFFFF', background: '#10B981' },
  { name: '灰底深文字', foreground: '#1F2937', background: '#F3F4F6' },
  { name: '浅蓝底深文字', foreground: '#1E40AF', background: '#DBEAFE' },
  { name: '黄底黑字', foreground: '#000000', background: '#FEF3C7' },
  { name: '红底白字', foreground: '#FFFFFF', background: '#DC2626' }
]

// 工具函数
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

const rgbToHex = (r: number, g: number, b: number) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

// 计算相对亮度
const getRelativeLuminance = (rgb: { r: number; g: number; b: number }) => {
  const { r, g, b } = rgb
  
  const normalize = (color: number) => {
    const c = color / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  
  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b)
}

// 计算对比度
const calculateContrast = (color1: string, color2: string) => {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  
  const lum1 = getRelativeLuminance(rgb1)
  const lum2 = getRelativeLuminance(rgb2)
  
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

// 计算属性
const foregroundRgb = computed(() => hexToRgb(foregroundColor.value))
const backgroundRgb = computed(() => hexToRgb(backgroundColor.value))

const contrastRatio = computed(() => 
  calculateContrast(foregroundColor.value, backgroundColor.value)
)

// 生成颜色建议
const foregroundSuggestions = computed(() => {
  if (contrastRatio.value >= 4.5) return []
  
  const suggestions = []
  const bgRgb = backgroundRgb.value
  const bgLum = getRelativeLuminance(bgRgb)
  
  // 生成更深或更浅的前景色
  for (let i = 0; i <= 255; i += 51) {
    const testColors = [
      rgbToHex(i, i, i), // 灰度
      rgbToHex(0, 0, i), // 蓝色系
      rgbToHex(i, 0, 0), // 红色系
    ]
    
    testColors.forEach(hex => {
      const contrast = calculateContrast(hex, backgroundColor.value)
      if (contrast >= 4.5 && suggestions.length < 4) {
        suggestions.push({ hex, contrast })
      }
    })
  }
  
  return suggestions.sort((a, b) => b.contrast - a.contrast).slice(0, 3)
})

const backgroundSuggestions = computed(() => {
  if (contrastRatio.value >= 4.5) return []
  
  const suggestions = []
  
  // 生成更深或更浅的背景色
  for (let i = 0; i <= 255; i += 51) {
    const testColors = [
      rgbToHex(i, i, i), // 灰度
      rgbToHex(i, i, 255), // 蓝色系
      rgbToHex(255, i, i), // 红色系
    ]
    
    testColors.forEach(hex => {
      const contrast = calculateContrast(foregroundColor.value, hex)
      if (contrast >= 4.5 && suggestions.length < 4) {
        suggestions.push({ hex, contrast })
      }
    })
  }
  
  return suggestions.sort((a, b) => b.contrast - a.contrast).slice(0, 3)
})

// 辅助方法
const getContrastLevel = (ratio: number) => {
  if (ratio >= 7) return '优秀 (AAA)'
  if (ratio >= 4.5) return '良好 (AA)'
  if (ratio >= 3) return '大字号可用'
  return '不符合标准'
}

const getStatusMessage = () => {
  if (contrastRatio.value >= 7) return '对比度优秀！'
  if (contrastRatio.value >= 4.5) return '对比度良好'
  if (contrastRatio.value >= 3) return '仅大字号可用'
  return '对比度不足'
}

const getStatusDescription = () => {
  if (contrastRatio.value >= 7) return '符合 WCAG AAA 标准，提供最佳的可访问性体验'
  if (contrastRatio.value >= 4.5) return '符合 WCAG AA 标准，适用于大部分用户'
  if (contrastRatio.value >= 3) return '仅适用于 24px 以上的大号文字'
  return '不符合无障碍标准，建议调整颜色以提高对比度'
}

const getStatusBgClass = () => {
  if (contrastRatio.value >= 7) return 'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200'
  if (contrastRatio.value >= 4.5) return 'bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200'
  if (contrastRatio.value >= 3) return 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200'
  return 'bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-200'
}

// 方法
const checkContrast = () => {
  // 触发重新计算
}

const validateForeground = () => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (!hexPattern.test(foregroundColor.value)) {
    return
  }
  checkContrast()
}

const validateBackground = () => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (!hexPattern.test(backgroundColor.value)) {
    return
  }
  checkContrast()
}

const setForegroundColor = (color: string) => {
  foregroundColor.value = color
  checkContrast()
}

const setBackgroundColor = (color: string) => {
  backgroundColor.value = color
  checkContrast()
}

const loadPreset = (preset: any) => {
  foregroundColor.value = preset.foreground
  backgroundColor.value = preset.background
  checkContrast()
}
</script>

<style scoped>
/* 自定义样式 */
</style> 