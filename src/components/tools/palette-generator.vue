<template>
  <div class="space-y-6">
    <!-- 工具标题 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gradient mb-2">调色板生成</h1>
      <p class="text-muted-foreground">基于色彩理论自动生成专业配色方案</p>
    </div>

    <!-- 颜色输入区域 -->
    <div class="card p-6">
      <div class="flex flex-col lg:flex-row gap-6 items-start">
        <!-- 基础颜色选择 -->
        <div class="space-y-4 flex-1">
          <label class="text-sm font-medium text-foreground">基础颜色</label>
          <div class="flex gap-4 items-center">
            <div class="relative">
              <input
                v-model="baseColor"
                type="color"
                class="w-16 h-16 rounded-lg border-2 border-border cursor-pointer"
                @input="generatePalettes"
              />
              <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
                {{ baseColor }}
              </div>
            </div>
            <div class="space-y-2 flex-1">
              <input
                v-model="baseColor"
                type="text"
                placeholder="#3B82F6"
                class="input"
                @input="validateAndGenerate"
              />
              <button
                @click="randomColor"
                class="btn-outline btn-sm w-full"
              >
                <Shuffle class="h-3 w-3 mr-1" />
                随机颜色
              </button>
            </div>
          </div>
        </div>

        <!-- 配色方案选择 -->
        <div class="space-y-4 w-full lg:w-80">
          <label class="text-sm font-medium text-foreground">配色方案</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="scheme in colorSchemes"
              :key="scheme.type"
              @click="selectedScheme = scheme.type"
              :class="[
                'p-3 rounded-lg border text-left transition-all',
                selectedScheme === scheme.type
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border hover:border-primary/50'
              ]"
            >
              <div class="font-medium text-sm">{{ scheme.name }}</div>
              <div class="text-xs text-muted-foreground">{{ scheme.description }}</div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 生成的调色板 -->
    <div v-if="generatedPalettes.length > 0" class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">生成的调色板</h3>
        <div class="flex gap-2">
          <button
            @click="exportPalette"
            class="btn-outline btn-sm"
          >
            <Download class="h-3 w-3 mr-1" />
            导出
          </button>
          <button
            @click="savePalette"
            class="btn-outline btn-sm"
          >
            <Heart class="h-3 w-3 mr-1" />
            收藏
          </button>
        </div>
      </div>

      <!-- 主调色板 -->
      <div class="card p-6">
        <h4 class="font-medium mb-4">{{ currentScheme?.name }}</h4>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            v-for="(color, index) in currentPalette"
            :key="index"
            class="group cursor-pointer"
            @click="copyColor(color.hex)"
          >
            <div
              class="aspect-square rounded-lg border-2 border-border transition-all group-hover:scale-105 group-hover:shadow-lg"
              :style="{ backgroundColor: color.hex }"
            >
              <div class="h-full flex items-end p-3">
                <div 
                  class="text-xs font-medium px-2 py-1 rounded backdrop-blur-sm"
                  :class="color.lightness > 50 ? 'bg-black/20 text-black' : 'bg-white/20 text-white'"
                >
                  {{ color.hex }}
                </div>
              </div>
            </div>
            <div class="mt-2 text-center">
              <div class="text-sm font-medium">{{ color.name }}</div>
              <div class="text-xs text-muted-foreground">
                HSL({{ color.hsl.h }}, {{ color.hsl.s }}%, {{ color.hsl.l }}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 色调变化 -->
      <div class="card p-6">
        <h4 class="font-medium mb-4">色调变化</h4>
        <div class="space-y-4">
          <!-- 明度变化 -->
          <div>
            <div class="text-sm text-muted-foreground mb-2">明度变化</div>
            <div class="flex gap-1">
              <div
                v-for="(shade, index) in lightnessShades"
                :key="index"
                class="flex-1 h-12 cursor-pointer group rounded border border-border transition-all hover:scale-105"
                :style="{ backgroundColor: shade.hex }"
                @click="copyColor(shade.hex)"
                :title="`${shade.hex} (${shade.lightness}%)`"
              >
                <div class="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span 
                    class="text-xs font-medium px-1 py-0.5 rounded backdrop-blur-sm"
                    :class="shade.lightness > 50 ? 'bg-black/30 text-black' : 'bg-white/30 text-white'"
                  >
                    {{ shade.lightness }}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 饱和度变化 -->
          <div>
            <div class="text-sm text-muted-foreground mb-2">饱和度变化</div>
            <div class="flex gap-1">
              <div
                v-for="(shade, index) in saturationShades"
                :key="index"
                class="flex-1 h-12 cursor-pointer group rounded border border-border transition-all hover:scale-105"
                :style="{ backgroundColor: shade.hex }"
                @click="copyColor(shade.hex)"
                :title="`${shade.hex} (${shade.saturation}%)`"
              >
                <div class="h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span 
                    class="text-xs font-medium px-1 py-0.5 rounded backdrop-blur-sm"
                    :class="shade.lightness > 50 ? 'bg-black/30 text-black' : 'bg-white/30 text-white'"
                  >
                    {{ shade.saturation }}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 其他方案预览 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="palette in generatedPalettes"
          :key="palette.type"
          class="card p-4 cursor-pointer transition-all hover:shadow-lg"
          :class="{ 'border-primary': selectedScheme === palette.type }"
          @click="selectedScheme = palette.type"
        >
          <div class="text-sm font-medium mb-2">{{ palette.name }}</div>
          <div class="flex gap-1 mb-2">
            <div
              v-for="(color, index) in palette.colors.slice(0, 5)"
              :key="index"
              class="flex-1 h-8 rounded"
              :style="{ backgroundColor: color.hex }"
            ></div>
          </div>
          <div class="text-xs text-muted-foreground">{{ palette.description }}</div>
        </div>
      </div>
    </div>

    <!-- 收藏的调色板 -->
    <div v-if="savedPalettes.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold">收藏的调色板</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(palette, index) in savedPalettes"
          :key="index"
          class="card p-4 group"
        >
          <div class="flex justify-between items-start mb-2">
            <div class="text-sm font-medium">{{ palette.name }}</div>
            <button
              @click="removeSavedPalette(index)"
              class="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X class="h-3 w-3 text-muted-foreground hover:text-destructive" />
            </button>
          </div>
          <div class="flex gap-1 mb-2">
            <div
              v-for="(color, colorIndex) in palette.colors"
              :key="colorIndex"
              class="flex-1 h-6 rounded cursor-pointer"
              :style="{ backgroundColor: color }"
              @click="copyColor(color)"
            ></div>
          </div>
          <div class="text-xs text-muted-foreground">{{ new Date(palette.createdAt).toLocaleDateString() }}</div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="card p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <Info class="h-5 w-5 text-blue-600" />
        使用说明
      </h3>
      <div class="space-y-2 text-sm text-muted-foreground">
        <p>• <strong>单色调</strong>：基于一个颜色生成不同明度和饱和度的变化</p>
        <p>• <strong>类似色</strong>：选择色环上相邻的颜色，营造和谐感</p>
        <p>• <strong>互补色</strong>：选择色环上相对的颜色，形成强烈对比</p>
        <p>• <strong>三角色</strong>：在色环上等距选择三个颜色</p>
        <p>• <strong>分割互补</strong>：选择一个主色和其互补色两侧的颜色</p>
        <p>• 点击任意颜色方块可复制HEX值到剪贴板</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  Shuffle, 
  Download, 
  Heart, 
  X, 
  Info,
  Palette,
  Copy
} from 'lucide-vue-next'

// 类型定义
interface ColorInfo {
  hex: string
  hsl: { h: number; s: number; l: number }
  rgb: { r: number; g: number; b: number }
  name: string
  lightness: number
  saturation: number
}

interface ColorScheme {
  type: string
  name: string
  description: string
}

interface GeneratedPalette {
  type: string
  name: string
  description: string
  colors: ColorInfo[]
}

// 响应式数据
const baseColor = ref('#3B82F6')
const selectedScheme = ref('monochromatic')
const savedPalettes = ref<any[]>([])

// 配色方案定义
const colorSchemes: ColorScheme[] = [
  { type: 'monochromatic', name: '单色调', description: '同一色相的不同明度' },
  { type: 'analogous', name: '类似色', description: '色环上相邻的颜色' },
  { type: 'complementary', name: '互补色', description: '色环上相对的颜色' },
  { type: 'triadic', name: '三角色', description: '色环上等距的三个颜色' },
  { type: 'splitComplementary', name: '分割互补', description: '主色与互补色两侧' },
  { type: 'tetradic', name: '四色调', description: '色环上的两对互补色' }
]

// 工具函数
const hexToHsl = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

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

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

const hslToHex = (h: number, s: number, l: number) => {
  h = h % 360
  s = s / 100
  l = l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2

  let r = 0, g = 0, b = 0

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

const getColorName = (hue: number) => {
  const colorNames = [
    { range: [0, 15], name: '红色' },
    { range: [15, 45], name: '橙色' },
    { range: [45, 75], name: '黄色' },
    { range: [75, 150], name: '绿色' },
    { range: [150, 210], name: '青色' },
    { range: [210, 270], name: '蓝色' },
    { range: [270, 330], name: '紫色' },
    { range: [330, 360], name: '红色' }
  ]
  
  for (const color of colorNames) {
    if (hue >= color.range[0] && hue < color.range[1]) {
      return color.name
    }
  }
  return '灰色'
}

// 生成调色板
const generateMonochromatic = (baseHsl: any): ColorInfo[] => {
  const colors = []
  const lightnessValues = [20, 35, 50, 65, 80]
  
  lightnessValues.forEach((lightness, index) => {
    const hex = hslToHex(baseHsl.h, baseHsl.s, lightness)
    colors.push({
      hex,
      hsl: { h: baseHsl.h, s: baseHsl.s, l: lightness },
      rgb: hexToRgb(hex),
      name: `${getColorName(baseHsl.h)} ${index + 1}`,
      lightness,
      saturation: baseHsl.s
    })
  })
  
  return colors
}

const generateAnalogous = (baseHsl: any): ColorInfo[] => {
  const colors = []
  const hueOffsets = [-30, -15, 0, 15, 30]
  
  hueOffsets.forEach((offset, index) => {
    const hue = (baseHsl.h + offset + 360) % 360
    const hex = hslToHex(hue, baseHsl.s, baseHsl.l)
    colors.push({
      hex,
      hsl: { h: hue, s: baseHsl.s, l: baseHsl.l },
      rgb: hexToRgb(hex),
      name: `${getColorName(hue)} ${index + 1}`,
      lightness: baseHsl.l,
      saturation: baseHsl.s
    })
  })
  
  return colors
}

const generateComplementary = (baseHsl: any): ColorInfo[] => {
  const colors = []
  const hues = [baseHsl.h, (baseHsl.h + 180) % 360]
  
  hues.forEach((hue, index) => {
    // 为每个色相生成不同明度
    [30, 50, 70].forEach((lightness, lIndex) => {
      const hex = hslToHex(hue, baseHsl.s, lightness)
      colors.push({
        hex,
        hsl: { h: hue, s: baseHsl.s, l: lightness },
        rgb: hexToRgb(hex),
        name: `${getColorName(hue)} ${lIndex + 1}`,
        lightness,
        saturation: baseHsl.s
      })
    })
  })
  
  return colors.slice(0, 5)
}

const generateTriadic = (baseHsl: any): ColorInfo[] => {
  const colors = []
  const hues = [baseHsl.h, (baseHsl.h + 120) % 360, (baseHsl.h + 240) % 360]
  
  hues.forEach((hue, index) => {
    const hex = hslToHex(hue, baseHsl.s, baseHsl.l)
    colors.push({
      hex,
      hsl: { h: hue, s: baseHsl.s, l: baseHsl.l },
      rgb: hexToRgb(hex),
      name: `${getColorName(hue)} ${index + 1}`,
      lightness: baseHsl.l,
      saturation: baseHsl.s
    })
    
    // 添加变化
    if (index === 0) {
      const lightHex = hslToHex(hue, baseHsl.s, Math.min(baseHsl.l + 20, 90))
      const darkHex = hslToHex(hue, baseHsl.s, Math.max(baseHsl.l - 20, 10))
      colors.push(
        {
          hex: lightHex,
          hsl: { h: hue, s: baseHsl.s, l: Math.min(baseHsl.l + 20, 90) },
          rgb: hexToRgb(lightHex),
          name: `${getColorName(hue)} 亮`,
          lightness: Math.min(baseHsl.l + 20, 90),
          saturation: baseHsl.s
        },
        {
          hex: darkHex,
          hsl: { h: hue, s: baseHsl.s, l: Math.max(baseHsl.l - 20, 10) },
          rgb: hexToRgb(darkHex),
          name: `${getColorName(hue)} 暗`,
          lightness: Math.max(baseHsl.l - 20, 10),
          saturation: baseHsl.s
        }
      )
    }
  })
  
  return colors.slice(0, 5)
}

const generateSplitComplementary = (baseHsl: any): ColorInfo[] => {
  const colors = []
  const complementary = (baseHsl.h + 180) % 360
  const hues = [baseHsl.h, (complementary - 30 + 360) % 360, (complementary + 30) % 360]
  
  hues.forEach((hue, index) => {
    const hex = hslToHex(hue, baseHsl.s, baseHsl.l)
    colors.push({
      hex,
      hsl: { h: hue, s: baseHsl.s, l: baseHsl.l },
      rgb: hexToRgb(hex),
      name: `${getColorName(hue)} ${index + 1}`,
      lightness: baseHsl.l,
      saturation: baseHsl.s
    })
  })
  
  // 添加主色的明暗变化
  const lightHex = hslToHex(baseHsl.h, baseHsl.s, Math.min(baseHsl.l + 25, 90))
  const darkHex = hslToHex(baseHsl.h, baseHsl.s, Math.max(baseHsl.l - 25, 10))
  colors.push(
    {
      hex: lightHex,
      hsl: { h: baseHsl.h, s: baseHsl.s, l: Math.min(baseHsl.l + 25, 90) },
      rgb: hexToRgb(lightHex),
      name: `${getColorName(baseHsl.h)} 亮`,
      lightness: Math.min(baseHsl.l + 25, 90),
      saturation: baseHsl.s
    },
    {
      hex: darkHex,
      hsl: { h: baseHsl.h, s: baseHsl.s, l: Math.max(baseHsl.l - 25, 10) },
      rgb: hexToRgb(darkHex),
      name: `${getColorName(baseHsl.h)} 暗`,
      lightness: Math.max(baseHsl.l - 25, 10),
      saturation: baseHsl.s
    }
  )
  
  return colors.slice(0, 5)
}

const generateTetradic = (baseHsl: any): ColorInfo[] => {
  const colors = []
  const hues = [
    baseHsl.h, 
    (baseHsl.h + 90) % 360, 
    (baseHsl.h + 180) % 360, 
    (baseHsl.h + 270) % 360
  ]
  
  hues.forEach((hue, index) => {
    const lightness = index === 0 ? baseHsl.l : (40 + index * 15)
    const hex = hslToHex(hue, baseHsl.s, lightness)
    colors.push({
      hex,
      hsl: { h: hue, s: baseHsl.s, l: lightness },
      rgb: hexToRgb(hex),
      name: `${getColorName(hue)} ${index + 1}`,
      lightness,
      saturation: baseHsl.s
    })
  })
  
  // 添加一个中性色
  const neutralHex = hslToHex(baseHsl.h, 10, 50)
  colors.push({
    hex: neutralHex,
    hsl: { h: baseHsl.h, s: 10, l: 50 },
    rgb: hexToRgb(neutralHex),
    name: '中性色',
    lightness: 50,
    saturation: 10
  })
  
  return colors
}

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

// 计算属性
const generatedPalettes = ref<GeneratedPalette[]>([])

const currentScheme = computed(() => 
  colorSchemes.find(scheme => scheme.type === selectedScheme.value)
)

const currentPalette = computed(() => {
  const palette = generatedPalettes.value.find(p => p.type === selectedScheme.value)
  return palette?.colors || []
})

// 色调变化
const lightnessShades = computed(() => {
  const baseHsl = hexToHsl(baseColor.value)
  const shades = []
  
  for (let l = 10; l <= 90; l += 10) {
    const hex = hslToHex(baseHsl.h, baseHsl.s, l)
    shades.push({
      hex,
      lightness: l,
      saturation: baseHsl.s
    })
  }
  
  return shades
})

const saturationShades = computed(() => {
  const baseHsl = hexToHsl(baseColor.value)
  const shades = []
  
  for (let s = 0; s <= 100; s += 10) {
    const hex = hslToHex(baseHsl.h, s, baseHsl.l)
    shades.push({
      hex,
      lightness: baseHsl.l,
      saturation: s
    })
  }
  
  return shades
})

// 方法
const generatePalettes = () => {
  const baseHsl = hexToHsl(baseColor.value)
  
  generatedPalettes.value = [
    {
      type: 'monochromatic',
      name: '单色调',
      description: '同一色相的不同明度变化',
      colors: generateMonochromatic(baseHsl)
    },
    {
      type: 'analogous',
      name: '类似色',
      description: '色环上相邻的颜色组合',
      colors: generateAnalogous(baseHsl)
    },
    {
      type: 'complementary',
      name: '互补色',
      description: '色环上相对的颜色组合',
      colors: generateComplementary(baseHsl)
    },
    {
      type: 'triadic',
      name: '三角色',
      description: '色环上等距的三个颜色',
      colors: generateTriadic(baseHsl)
    },
    {
      type: 'splitComplementary',
      name: '分割互补',
      description: '主色与互补色两侧的颜色',
      colors: generateSplitComplementary(baseHsl)
    },
    {
      type: 'tetradic',
      name: '四色调',
      description: '色环上的两对互补色',
      colors: generateTetradic(baseHsl)
    }
  ]
}

const validateAndGenerate = () => {
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  if (hexPattern.test(baseColor.value)) {
    generatePalettes()
  }
}

const randomColor = () => {
  const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  baseColor.value = randomHex
  generatePalettes()
}

const copyColor = async (color: string) => {
  try {
    await navigator.clipboard.writeText(color)
    // 这里可以添加提示消息
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const exportPalette = () => {
  const palette = currentPalette.value
  if (!palette.length) return
  
  const cssColors = palette.map((color, index) => 
    `  --color-${index + 1}: ${color.hex}; /* ${color.name} */`
  ).join('\n')
  
  const exportData = `/* ${currentScheme.value?.name} 调色板 */\n:root {\n${cssColors}\n}`
  
  const blob = new Blob([exportData], { type: 'text/css' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `palette-${selectedScheme.value}.css`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const savePalette = () => {
  const palette = {
    name: currentScheme.value?.name || '未命名',
    type: selectedScheme.value,
    colors: currentPalette.value.map(c => c.hex),
    createdAt: new Date().toISOString()
  }
  
  savedPalettes.value.push(palette)
  localStorage.setItem('saved-palettes', JSON.stringify(savedPalettes.value))
}

const removeSavedPalette = (index: number) => {
  savedPalettes.value.splice(index, 1)
  localStorage.setItem('saved-palettes', JSON.stringify(savedPalettes.value))
}

// 生命周期
onMounted(() => {
  // 加载保存的调色板
  const saved = localStorage.getItem('saved-palettes')
  if (saved) {
    savedPalettes.value = JSON.parse(saved)
  }
  
  // 生成初始调色板
  generatePalettes()
})
</script>

<style scoped>
.aspect-square {
  aspect-ratio: 1;
}
</style> 