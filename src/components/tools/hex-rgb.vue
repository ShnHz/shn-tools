<template>
  <div class="space-y-6">
    <!-- 工具标题 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gradient mb-2">颜色转换</h1>
      <p class="text-muted-foreground">多种颜色格式之间的相互转换</p>
    </div>

    <!-- 颜色选择器 -->
    <div class="card p-6">
      <div class="flex flex-col lg:flex-row gap-6 items-center">
        <!-- 颜色预览 -->
        <div class="flex flex-col items-center gap-4">
          <div
            class="w-32 h-32 rounded-2xl border-4 border-white shadow-xl cursor-pointer transition-transform hover:scale-105"
            :style="{ backgroundColor: currentColor }"
            @click="openColorPicker"
          >
            <input
              ref="colorPickerRef"
              v-model="currentColor"
              type="color"
              class="opacity-0 w-full h-full cursor-pointer"
              @input="updateColor"
            />
          </div>
          <div class="text-center">
            <div class="font-medium">当前颜色</div>
            <div class="text-sm text-muted-foreground">{{ colorName }}</div>
          </div>
        </div>

        <!-- 快捷操作 -->
        <div class="flex-1 space-y-4">
          <div class="flex gap-2 flex-wrap">
            <button
              @click="randomColor"
              class="btn-outline btn-sm"
            >
              <Shuffle class="h-3 w-3 mr-1" />
              随机颜色
            </button>
            <button
              @click="copyAllFormats"
              class="btn-outline btn-sm"
            >
              <Copy class="h-3 w-3 mr-1" />
              复制所有格式
            </button>
            <button
              @click="exportColor"
              class="btn-outline btn-sm"
            >
              <Download class="h-3 w-3 mr-1" />
              导出
            </button>
          </div>
          
          <!-- 预设颜色 -->
          <div class="space-y-2">
            <div class="text-sm font-medium">快选颜色</div>
            <div class="grid grid-cols-8 md:grid-cols-12 gap-2">
              <button
                v-for="preset in presetColors"
                :key="preset"
                @click="setColor(preset)"
                class="w-8 h-8 rounded border-2 border-white shadow hover:scale-110 transition-transform"
                :style="{ backgroundColor: preset }"
                :title="preset"
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 颜色格式转换 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- HEX格式 -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">HEX</h3>
          <button
            @click="copyToClipboard(hexColor)"
            class="btn-ghost btn-sm"
          >
            <Copy class="h-3 w-3" />
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-sm text-muted-foreground">完整格式</label>
            <input
              v-model="hexInput"
              type="text"
              class="input mt-1"
              placeholder="#FFFFFF"
              @input="handleHexInput"
              @blur="validateHexInput"
            />
          </div>
          <div>
            <label class="text-sm text-muted-foreground">短格式</label>
            <input
              v-model="hexShortInput"
              type="text"
              class="input mt-1"
              placeholder="#FFF"
              @input="handleHexShortInput"
              @blur="validateHexShortInput"
            />
          </div>
          <div class="text-xs text-muted-foreground">
            如: #FF5733 或 #F73
          </div>
        </div>
      </div>

      <!-- RGB格式 -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">RGB</h3>
          <button
            @click="copyToClipboard(rgbString)"
            class="btn-ghost btn-sm"
          >
            <Copy class="h-3 w-3" />
          </button>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-xs text-muted-foreground">R</label>
              <input
                v-model.number="rgb.r"
                type="number"
                min="0"
                max="255"
                class="input mt-1"
                @input="updateFromRgb"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">G</label>
              <input
                v-model.number="rgb.g"
                type="number"
                min="0"
                max="255"
                class="input mt-1"
                @input="updateFromRgb"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">B</label>
              <input
                v-model.number="rgb.b"
                type="number"
                min="0"
                max="255"
                class="input mt-1"
                @input="updateFromRgb"
              />
            </div>
          </div>
          <div>
            <label class="text-sm text-muted-foreground">CSS格式</label>
            <input
              v-model="rgbString"
              type="text"
              class="input mt-1"
              readonly
            />
          </div>
          <div class="text-xs text-muted-foreground">
            如: rgb(255, 87, 51)
          </div>
        </div>
      </div>

      <!-- HSL格式 -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">HSL</h3>
          <button
            @click="copyToClipboard(hslString)"
            class="btn-ghost btn-sm"
          >
            <Copy class="h-3 w-3" />
          </button>
        </div>
        <div class="space-y-3">
          <div class="space-y-2">
            <div>
              <label class="text-xs text-muted-foreground">色相 (H): {{ hsl.h }}°</label>
              <input
                v-model.number="hsl.h"
                type="range"
                min="0"
                max="360"
                class="range mt-1"
                @input="updateFromHsl"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">饱和度 (S): {{ hsl.s }}%</label>
              <input
                v-model.number="hsl.s"
                type="range"
                min="0"
                max="100"
                class="range mt-1"
                @input="updateFromHsl"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">明度 (L): {{ hsl.l }}%</label>
              <input
                v-model.number="hsl.l"
                type="range"
                min="0"
                max="100"
                class="range mt-1"
                @input="updateFromHsl"
              />
            </div>
          </div>
          <div>
            <label class="text-sm text-muted-foreground">CSS格式</label>
            <input
              v-model="hslString"
              type="text"
              class="input mt-1"
              readonly
            />
          </div>
          <div class="text-xs text-muted-foreground">
            如: hsl(14, 100%, 60%)
          </div>
        </div>
      </div>

      <!-- HSV格式 -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">HSV</h3>
          <button
            @click="copyToClipboard(hsvString)"
            class="btn-ghost btn-sm"
          >
            <Copy class="h-3 w-3" />
          </button>
        </div>
        <div class="space-y-3">
          <div class="space-y-2">
            <div>
              <label class="text-xs text-muted-foreground">色相 (H): {{ hsv.h }}°</label>
              <input
                v-model.number="hsv.h"
                type="range"
                min="0"
                max="360"
                class="range mt-1"
                @input="updateFromHsv"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">饱和度 (S): {{ hsv.s }}%</label>
              <input
                v-model.number="hsv.s"
                type="range"
                min="0"
                max="100"
                class="range mt-1"
                @input="updateFromHsv"
              />
            </div>
            <div>
              <label class="text-xs text-muted-foreground">明度 (V): {{ hsv.v }}%</label>
              <input
                v-model.number="hsv.v"
                type="range"
                min="0"
                max="100"
                class="range mt-1"
                @input="updateFromHsv"
              />
            </div>
          </div>
          <div>
            <label class="text-sm text-muted-foreground">HSV格式</label>
            <input
              v-model="hsvString"
              type="text"
              class="input mt-1"
              readonly
            />
          </div>
          <div class="text-xs text-muted-foreground">
            如: hsv(14, 80%, 100%)
          </div>
        </div>
      </div>

      <!-- CMYK格式 -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">CMYK</h3>
          <button
            @click="copyToClipboard(cmykString)"
            class="btn-ghost btn-sm"
          >
            <Copy class="h-3 w-3" />
          </button>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-xs text-muted-foreground">C: {{ cmyk.c }}%</label>
              <div class="text-lg font-mono">{{ cmyk.c }}%</div>
            </div>
            <div>
              <label class="text-xs text-muted-foreground">M: {{ cmyk.m }}%</label>
              <div class="text-lg font-mono">{{ cmyk.m }}%</div>
            </div>
            <div>
              <label class="text-xs text-muted-foreground">Y: {{ cmyk.y }}%</label>
              <div class="text-lg font-mono">{{ cmyk.y }}%</div>
            </div>
            <div>
              <label class="text-xs text-muted-foreground">K: {{ cmyk.k }}%</label>
              <div class="text-lg font-mono">{{ cmyk.k }}%</div>
            </div>
          </div>
          <div>
            <label class="text-sm text-muted-foreground">CMYK格式</label>
            <input
              v-model="cmykString"
              type="text"
              class="input mt-1"
              readonly
            />
          </div>
          <div class="text-xs text-muted-foreground">
            用于印刷设计
          </div>
        </div>
      </div>

      <!-- 其他格式 -->
      <div class="card p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold">其他格式</h3>
        </div>
        <div class="space-y-3">
          <div>
            <label class="text-sm text-muted-foreground">CSS颜色名</label>
            <input
              v-model="cssColorName"
              type="text"
              class="input mt-1"
              readonly
            />
          </div>
          <div>
            <label class="text-sm text-muted-foreground">十进制值</label>
            <input
              v-model="decimalValue"
              type="text"
              class="input mt-1"
              readonly
            />
          </div>
          <div>
            <label class="text-sm text-muted-foreground">二进制值</label>
            <input
              v-model="binaryValue"
              type="text"
              class="input mt-1 font-mono text-xs"
              readonly
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 颜色分析 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">颜色分析</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="text-2xl font-bold">{{ brightness.toFixed(0) }}%</div>
          <div class="text-sm text-muted-foreground">亮度</div>
          <div class="mt-2 h-2 bg-gradient-to-r from-black to-white rounded-full">
            <div 
              class="h-2 bg-current rounded-full transition-all"
              :style="{ width: brightness + '%', backgroundColor: currentColor }"
            ></div>
          </div>
        </div>
        
        <div class="text-center">
          <div class="text-2xl font-bold">{{ isLight ? '浅色' : '深色' }}</div>
          <div class="text-sm text-muted-foreground">颜色类型</div>
          <div class="mt-2">
            <component 
              :is="isLight ? Sun : Moon"
              class="h-6 w-6 mx-auto"
              :class="isLight ? 'text-yellow-500' : 'text-blue-500'"
            />
          </div>
        </div>
        
        <div class="text-center">
          <div class="text-2xl font-bold">{{ temperature.toFixed(0) }}K</div>
          <div class="text-sm text-muted-foreground">色温</div>
          <div class="mt-2 text-xs">
            {{ getTemperatureDescription(temperature) }}
          </div>
        </div>
        
        <div class="text-center">
          <div class="text-2xl font-bold">{{ colorName }}</div>
          <div class="text-sm text-muted-foreground">主要色相</div>
          <div class="mt-2">
            <div 
              class="w-6 h-6 rounded-full mx-auto border-2 border-border"
              :style="{ backgroundColor: currentColor }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="card p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <Info class="h-5 w-5 text-blue-600" />
        颜色格式说明
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div class="space-y-2">
          <p>• <strong>HEX</strong>：网页设计常用，如 #FF5733</p>
          <p>• <strong>RGB</strong>：红绿蓝三色通道，范围 0-255</p>
          <p>• <strong>HSL</strong>：色相、饱和度、明度，更直观</p>
        </div>
        <div class="space-y-2">
          <p>• <strong>HSV</strong>：色相、饱和度、明度值</p>
          <p>• <strong>CMYK</strong>：印刷四色，用于印刷设计</p>
          <p>• 支持快速复制和导出各种格式</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  Shuffle, 
  Copy, 
  Download, 
  Info,
  Sun,
  Moon,
  Palette
} from 'lucide-vue-next'

// 响应式数据
const currentColor = ref('#3B82F6')
const colorPickerRef = ref<HTMLInputElement>()

// 输入框的值（允许不完整输入）
const hexInput = ref('#3B82F6')
const hexShortInput = ref('#3BF')

// RGB 值
const rgb = ref({ r: 59, g: 130, b: 246 })

// HSL 值
const hsl = ref({ h: 217, s: 91, l: 60 })

// HSV 值
const hsv = ref({ h: 217, s: 76, v: 96 })

// 预设颜色
const presetColors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
  '#000000', '#FFFFFF', '#808080', '#800000', '#008000', '#000080',
  '#FFA500', '#FFC0CB', '#A52A2A', '#800080', '#008080', '#808000',
  '#FF6347', '#40E0D0', '#EE82EE', '#90EE90', '#F0E68C', '#DDA0DD',
  '#FF1493', '#00CED1', '#FF8C00', '#9370DB', '#32CD32', '#FFB6C1',
  '#DC143C', '#00BFFF', '#ADFF2F', '#FF69B4', '#1E90FF', '#FFFFE0'
]

// CSS 颜色名映射
const cssColorNames: Record<string, string> = {
  '#FF0000': 'red',
  '#00FF00': 'lime',
  '#0000FF': 'blue',
  '#FFFF00': 'yellow',
  '#FF00FF': 'magenta',
  '#00FFFF': 'cyan',
  '#000000': 'black',
  '#FFFFFF': 'white',
  '#808080': 'gray',
  '#800000': 'maroon',
  '#008000': 'green',
  '#000080': 'navy',
  '#FFA500': 'orange',
  '#FFC0CB': 'pink',
  '#A52A2A': 'brown',
  '#800080': 'purple'
}

// 计算属性
const hexColor = computed(() => currentColor.value.toUpperCase())

const hexShort = computed(() => {
  const hex = currentColor.value.slice(1)
  const r = hex.slice(0, 2)
  const g = hex.slice(2, 4)
  const b = hex.slice(4, 6)
  
  if (r[0] === r[1] && g[0] === g[1] && b[0] === b[1]) {
    return `#${r[0]}${g[0]}${b[0]}`.toUpperCase()
  }
  return currentColor.value.toUpperCase()
})

const rgbString = computed(() => `rgb(${rgb.value.r}, ${rgb.value.g}, ${rgb.value.b})`)
const hslString = computed(() => `hsl(${hsl.value.h}, ${hsl.value.s}%, ${hsl.value.l}%)`)
const hsvString = computed(() => `hsv(${hsv.value.h}, ${hsv.value.s}%, ${hsv.value.v}%)`)

// CMYK 计算
const cmyk = computed(() => {
  const r = rgb.value.r / 255
  const g = rgb.value.g / 255
  const b = rgb.value.b / 255
  
  const k = 1 - Math.max(r, g, b)
  const c = k === 1 ? 0 : (1 - r - k) / (1 - k)
  const m = k === 1 ? 0 : (1 - g - k) / (1 - k)
  const y = k === 1 ? 0 : (1 - b - k) / (1 - k)
  
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  }
})

const cmykString = computed(() => `cmyk(${cmyk.value.c}%, ${cmyk.value.m}%, ${cmyk.value.y}%, ${cmyk.value.k}%)`)

// 其他格式
const cssColorName = computed(() => {
  return cssColorNames[currentColor.value.toUpperCase()] || '无标准名称'
})

const decimalValue = computed(() => {
  return parseInt(currentColor.value.slice(1), 16)
})

const binaryValue = computed(() => {
  const decimal = decimalValue.value
  return '0b' + decimal.toString(2).padStart(24, '0')
})

// 颜色分析
const brightness = computed(() => {
  const { r, g, b } = rgb.value
  return (r * 0.299 + g * 0.587 + b * 0.114) / 255 * 100
})

const isLight = computed(() => brightness.value > 50)

const temperature = computed(() => {
  // 简化的色温计算
  const { r, g, b } = rgb.value
  if (r > g && r > b) {
    return 2000 + (g / 255) * 3000 // 偏红 - 暖色
  } else if (b > r && b > g) {
    return 6000 + (b / 255) * 4000 // 偏蓝 - 冷色
  } else {
    return 5000 + ((g - Math.max(r, b)) / 255) * 2000 // 中性色
  }
})

const colorName = computed(() => {
  const h = hsl.value.h
  if (h >= 0 && h < 30) return '红色'
  if (h >= 30 && h < 60) return '橙色'
  if (h >= 60 && h < 120) return '黄色'
  if (h >= 120 && h < 180) return '绿色'
  if (h >= 180 && h < 240) return '青色'
  if (h >= 240 && h < 300) return '蓝色'
  if (h >= 300 && h < 360) return '紫色'
  return '无色'
})

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
    const hex = Math.round(x).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}

const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255
  
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

const hslToRgb = (h: number, s: number, l: number) => {
  h = h / 360; s = s / 100; l = l / 100

  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1/6) return p + (q - p) * 6 * t
    if (t < 1/2) return q
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
    return p
  }

  let r, g, b

  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  }
}

const rgbToHsv = (r: number, g: number, b: number) => {
  r /= 255; g /= 255; b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const diff = max - min
  
  let h = 0
  const s = max === 0 ? 0 : diff / max
  const v = max

  if (diff !== 0) {
    switch (max) {
      case r: h = (g - b) / diff + (g < b ? 6 : 0); break
      case g: h = (b - r) / diff + 2; break
      case b: h = (r - g) / diff + 4; break
    }
    h /= 6
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  }
}

const hsvToRgb = (h: number, s: number, v: number) => {
  h = h / 360; s = s / 100; v = v / 100

  const c = v * s
  const x = c * (1 - Math.abs((h * 6) % 2 - 1))
  const m = v - c

  let r = 0, g = 0, b = 0

  if (0 <= h && h < 1/6) {
    r = c; g = x; b = 0
  } else if (1/6 <= h && h < 2/6) {
    r = x; g = c; b = 0
  } else if (2/6 <= h && h < 3/6) {
    r = 0; g = c; b = x
  } else if (3/6 <= h && h < 4/6) {
    r = 0; g = x; b = c
  } else if (4/6 <= h && h < 5/6) {
    r = x; g = 0; b = c
  } else if (5/6 <= h && h < 1) {
    r = c; g = 0; b = x
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  }
}

// 方法
const updateColor = () => {
  const newRgb = hexToRgb(currentColor.value)
  rgb.value = newRgb
  hsl.value = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
  hsv.value = rgbToHsv(newRgb.r, newRgb.g, newRgb.b)
  // 同步输入框的值
  hexInput.value = currentColor.value.toUpperCase()
  hexShortInput.value = hexShort.value
}

const updateFromHex = () => {
  updateColor()
}

const updateFromHexShort = () => {
  updateColor()
}

// HEX输入处理
const handleHexInput = () => {
  // 实时验证并更新（只在输入有效时）
  const value = hexInput.value.trim().toUpperCase()
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    currentColor.value = value
    updateColor()
  }
}

const validateHexInput = () => {
  // 失焦时验证并修正
  let value = hexInput.value.trim().toUpperCase()
  
  // 自动添加#号
  if (!value.startsWith('#') && value.length > 0) {
    value = '#' + value
  }
  
  // 验证并修正格式
  if (/^#[0-9A-F]{6}$/i.test(value)) {
    currentColor.value = value
    hexInput.value = value
    updateColor()
  } else if (/^#[0-9A-F]{3}$/i.test(value)) {
    // 如果是3位，扩展为6位
    const expanded = value.slice(1).split('').map(c => c + c).join('')
    const fullHex = `#${expanded}`
    currentColor.value = fullHex
    hexInput.value = fullHex
    updateColor()
  } else {
    // 无效输入，恢复到当前颜色
    hexInput.value = currentColor.value.toUpperCase()
  }
}

const handleHexShortInput = () => {
  // 实时验证并更新（只在输入有效时）
  const value = hexShortInput.value.trim().toUpperCase()
  if (/^#[0-9A-F]{3}$/i.test(value)) {
    const expanded = value.slice(1).split('').map(c => c + c).join('')
    currentColor.value = `#${expanded}`
    updateColor()
  }
}

const validateHexShortInput = () => {
  // 失焦时验证并修正
  let value = hexShortInput.value.trim().toUpperCase()
  
  // 自动添加#号
  if (!value.startsWith('#') && value.length > 0) {
    value = '#' + value
  }
  
  // 验证并修正格式
  if (/^#[0-9A-F]{3}$/i.test(value)) {
    const expanded = value.slice(1).split('').map(c => c + c).join('')
    currentColor.value = `#${expanded}`
    hexShortInput.value = value
    updateColor()
  } else {
    // 无效输入，恢复到当前颜色的短格式
    hexShortInput.value = hexShort.value
  }
}

const updateFromRgb = () => {
  currentColor.value = rgbToHex(rgb.value.r, rgb.value.g, rgb.value.b)
  hsl.value = rgbToHsl(rgb.value.r, rgb.value.g, rgb.value.b)
  hsv.value = rgbToHsv(rgb.value.r, rgb.value.g, rgb.value.b)
  // 同步输入框的值
  hexInput.value = currentColor.value.toUpperCase()
  hexShortInput.value = hexShort.value
}

const updateFromHsl = () => {
  const newRgb = hslToRgb(hsl.value.h, hsl.value.s, hsl.value.l)
  rgb.value = newRgb
  currentColor.value = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
  hsv.value = rgbToHsv(newRgb.r, newRgb.g, newRgb.b)
  // 同步输入框的值
  hexInput.value = currentColor.value.toUpperCase()
  hexShortInput.value = hexShort.value
}

const updateFromHsv = () => {
  const newRgb = hsvToRgb(hsv.value.h, hsv.value.s, hsv.value.v)
  rgb.value = newRgb
  currentColor.value = rgbToHex(newRgb.r, newRgb.g, newRgb.b)
  hsl.value = rgbToHsl(newRgb.r, newRgb.g, newRgb.b)
  // 同步输入框的值
  hexInput.value = currentColor.value.toUpperCase()
  hexShortInput.value = hexShort.value
}

const openColorPicker = () => {
  colorPickerRef.value?.click()
}

const setColor = (color: string) => {
  currentColor.value = color
  updateColor()
}

const randomColor = () => {
  const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase()
  setColor(randomHex)
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 这里可以添加提示消息
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const copyAllFormats = async () => {
  const allFormats = [
    `HEX: ${hexColor.value}`,
    `RGB: ${rgbString.value}`,
    `HSL: ${hslString.value}`,
    `HSV: ${hsvString.value}`,
    `CMYK: ${cmykString.value}`
  ].join('\n')
  
  try {
    await navigator.clipboard.writeText(allFormats)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const exportColor = () => {
  const colorData = {
    hex: hexColor.value,
    rgb: rgb.value,
    hsl: hsl.value,
    hsv: hsv.value,
    cmyk: cmyk.value,
    analysis: {
      name: colorName.value,
      brightness: brightness.value,
      temperature: temperature.value,
      isLight: isLight.value
    }
  }
  
  const blob = new Blob([JSON.stringify(colorData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `color-${hexColor.value.slice(1)}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const getTemperatureDescription = (temp: number) => {
  if (temp < 3000) return '极暖'
  if (temp < 4000) return '暖色'
  if (temp < 5000) return '中性偏暖'
  if (temp < 6000) return '中性'
  if (temp < 7000) return '中性偏冷'
  if (temp < 8000) return '冷色'
  return '极冷'
}

// 初始化
onMounted(() => {
  updateColor()
})
</script>

<style scoped>
.range {
  @apply w-full h-2 bg-gradient-to-r from-gray-200 to-gray-400 rounded-lg appearance-none cursor-pointer dark:from-gray-700 dark:to-gray-500;
}

.range::-webkit-slider-thumb {
  @apply appearance-none w-4 h-4 rounded-full bg-primary cursor-pointer;
}

.range::-moz-range-thumb {
  @apply w-4 h-4 rounded-full bg-primary cursor-pointer border-0;
}
</style> 