<template>
  <div class="space-y-6">
    <!-- 主颜色选择器 -->
    <div class="card p-6">
      <h2 class="text-xl font-semibold mb-4">颜色选择器</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <!-- 颜色拾取区域 -->
        <div class="space-y-4">
          <div class="relative">
            <input
              v-model="selectedColor"
              type="color"
              class="w-full h-32 rounded-lg border cursor-pointer"
              @input="updateColor"
            />
          </div>
          
          <!-- 快速颜色预设 -->
          <div class="space-y-2">
            <h4 class="text-sm font-medium">常用颜色</h4>
            <div class="grid grid-cols-8 gap-2">
              <button
                v-for="preset in colorPresets"
                :key="preset"
                @click="selectedColor = preset; updateColor()"
                :style="{ backgroundColor: preset }"
                class="w-8 h-8 rounded border hover:scale-110 transition-transform"
                :title="preset"
              />
            </div>
          </div>
        </div>

        <!-- 颜色信息显示 -->
        <div class="space-y-4">
          <div class="p-4 rounded-lg border" :style="{ backgroundColor: selectedColor }">
            <div class="text-center text-white mix-blend-difference font-semibold">
              {{ selectedColor }}
            </div>
          </div>

          <!-- 颜色格式转换 -->
          <div class="space-y-3">
            <div class="space-y-1">
              <label class="text-sm font-medium">HEX</label>
              <div class="flex gap-2">
                <input
                  v-model="colorFormats.hex"
                  class="input flex-1 font-mono"
                  readonly
                />
                <button @click="copyToClipboard(colorFormats.hex)" class="btn btn-secondary btn-sm">
                  复制
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium">RGB</label>
              <div class="flex gap-2">
                <input
                  v-model="colorFormats.rgb"
                  class="input flex-1 font-mono"
                  readonly
                />
                <button @click="copyToClipboard(colorFormats.rgb)" class="btn btn-secondary btn-sm">
                  复制
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium">HSL</label>
              <div class="flex gap-2">
                <input
                  v-model="colorFormats.hsl"
                  class="input flex-1 font-mono"
                  readonly
                />
                <button @click="copyToClipboard(colorFormats.hsl)" class="btn btn-secondary btn-sm">
                  复制
                </button>
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium">CSS Variable</label>
              <div class="flex gap-2">
                <input
                  v-model="colorFormats.cssVar"
                  class="input flex-1 font-mono"
                  readonly
                />
                <button @click="copyToClipboard(colorFormats.cssVar)" class="btn btn-secondary btn-sm">
                  复制
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 颜色调色板 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">相似色调色板</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div
          v-for="(color, index) in colorPalette"
          :key="index"
          class="space-y-2"
        >
          <div
            class="h-20 rounded-lg border cursor-pointer hover:scale-105 transition-transform"
            :style="{ backgroundColor: color.hex }"
            @click="selectedColor = color.hex; updateColor()"
            :title="`点击选择 ${color.hex}`"
          />
          <div class="text-center">
            <div class="text-xs font-mono">{{ color.hex }}</div>
            <div class="text-xs text-muted-foreground">{{ color.name }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 渐变生成器 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">渐变生成器</h3>
      <div class="space-y-4">
        <div class="flex gap-4">
          <div class="space-y-2">
            <label class="text-sm font-medium">起始颜色</label>
            <input
              v-model="gradientStart"
              type="color"
              class="w-16 h-10 rounded border"
              @input="updateGradient"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">结束颜色</label>
            <input
              v-model="gradientEnd"
              type="color"
              class="w-16 h-10 rounded border"
              @input="updateGradient"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">方向</label>
            <select v-model="gradientDirection" @change="updateGradient" class="input">
              <option value="to right">向右</option>
              <option value="to left">向左</option>
              <option value="to bottom">向下</option>
              <option value="to top">向上</option>
              <option value="45deg">45度</option>
              <option value="90deg">90度</option>
              <option value="135deg">135度</option>
              <option value="180deg">180度</option>
            </select>
          </div>
        </div>

        <div
          class="h-24 rounded-lg border"
          :style="{ background: gradientCSS }"
        />

        <div class="space-y-1">
          <label class="text-sm font-medium">CSS 代码</label>
          <div class="flex gap-2">
            <input
              v-model="gradientCSS"
              class="input flex-1 font-mono text-sm"
              readonly
            />
            <button @click="copyToClipboard(gradientCSS)" class="btn btn-primary btn-sm">
              复制 CSS
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 历史记录 -->
    <div v-if="colorHistory.length > 0" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">历史记录</h3>
        <button @click="clearHistory" class="btn btn-secondary btn-sm">
          清空历史
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(color, index) in colorHistory"
          :key="index"
          @click="selectedColor = color; updateColor()"
          class="w-8 h-8 rounded border hover:scale-110 transition-transform"
          :style="{ backgroundColor: color }"
          :title="color"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const selectedColor = ref('#3b82f6')
const gradientStart = ref('#3b82f6')
const gradientEnd = ref('#ef4444')
const gradientDirection = ref('to right')
const colorHistory = ref<string[]>([])

const colorPresets = [
  '#ef4444', '#f97316', '#f59e0b', '#84cc16',
  '#22c55e', '#06b6d4', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#ec4899', '#f43f5e',
  '#64748b', '#374151', '#1f2937', '#000000'
]

/**
 * 颜色格式转换
 */
const colorFormats = computed(() => {
  const hex = selectedColor.value
  const rgb = hexToRgb(hex)
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)
  
  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    cssVar: `--color-primary: ${hex};`
  }
})

/**
 * 生成调色板
 */
const colorPalette = computed(() => {
  const baseColor = hexToRgb(selectedColor.value)
  const palette = []

  // 生成明度变化
  for (let i = 0; i < 5; i++) {
    const factor = (i + 1) * 0.2
    const lightColor = lightenColor(baseColor, factor)
    palette.push({
      hex: rgbToHex(lightColor.r, lightColor.g, lightColor.b),
      name: `明度 ${Math.round(factor * 100)}%`
    })
  }

  return palette
})

/**
 * 渐变CSS
 */
const gradientCSS = computed(() => {
  return `linear-gradient(${gradientDirection.value}, ${gradientStart.value}, ${gradientEnd.value})`
})

/**
 * HEX转RGB
 */
const hexToRgb = (hex: string) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 }
}

/**
 * RGB转HEX
 */
const rgbToHex = (r: number, g: number, b: number) => {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

/**
 * RGB转HSL
 */
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

/**
 * 颜色变亮
 */
const lightenColor = (rgb: { r: number, g: number, b: number }, factor: number) => {
  return {
    r: Math.min(255, Math.round(rgb.r + (255 - rgb.r) * factor)),
    g: Math.min(255, Math.round(rgb.g + (255 - rgb.g) * factor)),
    b: Math.min(255, Math.round(rgb.b + (255 - rgb.b) * factor))
  }
}

/**
 * 更新颜色
 */
const updateColor = () => {
  addToHistory(selectedColor.value)
}

/**
 * 更新渐变
 */
const updateGradient = () => {
  // 可以添加实时更新逻辑
}

/**
 * 添加到历史记录
 */
const addToHistory = (color: string) => {
  if (!colorHistory.value.includes(color)) {
    colorHistory.value.unshift(color)
    if (colorHistory.value.length > 20) {
      colorHistory.value = colorHistory.value.slice(0, 20)
    }
    saveHistory()
  }
}

/**
 * 清空历史记录
 */
const clearHistory = () => {
  colorHistory.value = []
  localStorage.removeItem('color-picker-history')
}

/**
 * 保存历史记录
 */
const saveHistory = () => {
  localStorage.setItem('color-picker-history', JSON.stringify(colorHistory.value))
}

/**
 * 加载历史记录
 */
const loadHistory = () => {
  const saved = localStorage.getItem('color-picker-history')
  if (saved) {
    colorHistory.value = JSON.parse(saved)
  }
}

/**
 * 复制到剪贴板
 */
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 可以添加成功提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

onMounted(() => {
  loadHistory()
  updateColor()
})
</script> 