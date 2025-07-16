<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <!-- 标题和说明 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Favicon 生成器
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        创建多尺寸网站图标，支持文字、图标、图片等多种输入方式
      </p>
    </div>

    <!-- 设计选项 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Palette class="w-5 h-5 mr-2" />
        设计选项
      </h2>
      
      <div class="space-y-6">
        <!-- 输入类型选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            输入类型
          </label>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input
                v-model="inputType"
                type="radio"
                value="text"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">文字</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="inputType"
                type="radio"
                value="emoji"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">表情符号</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="inputType"
                type="radio"
                value="image"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">上传图片</span>
            </label>
          </div>
        </div>

        <!-- 文字输入 -->
        <div v-if="inputType === 'text'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文字内容
            </label>
            <input
              v-model="textContent"
              type="text"
              placeholder="输入1-3个字符"
              maxlength="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              字体大小
            </label>
            <input
              v-model="fontSize"
              type="range"
              min="12"
              max="48"
              class="w-full"
            />
            <div class="text-sm text-gray-500 dark:text-gray-400 text-center">{{ fontSize }}px</div>
          </div>
        </div>

        <!-- 表情符号输入 -->
        <div v-if="inputType === 'emoji'">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            选择表情符号
          </label>
          <div class="grid grid-cols-8 md:grid-cols-12 gap-2 mb-4">
            <button
              v-for="emoji in commonEmojis"
              :key="emoji"
              @click="selectedEmoji = emoji"
              class="p-2 text-2xl hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              :class="{ 'bg-blue-100 dark:bg-blue-900/20': selectedEmoji === emoji }"
            >
              {{ emoji }}
            </button>
          </div>
          <input
            v-model="selectedEmoji"
            type="text"
            placeholder="或直接输入表情符号"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- 图片上传 -->
        <div v-if="inputType === 'image'">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            上传图片
          </label>
          <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileUpload"
              class="hidden"
            />
            <div v-if="!uploadedImage" @click="fileInput?.click()" class="cursor-pointer">
              <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
              <p class="text-sm text-gray-600 dark:text-gray-400">点击上传图片</p>
              <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">支持 PNG, JPG, SVG 格式</p>
            </div>
            <div v-else class="relative">
              <img :src="uploadedImage" alt="上传的图片" class="max-w-full max-h-32 mx-auto" />
              <button
                @click="clearUploadedImage"
                class="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- 颜色设置 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              背景颜色
            </label>
            <div class="flex gap-2">
              <input
                v-model="backgroundColor"
                type="color"
                class="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
              />
              <input
                v-model="backgroundColor"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div v-if="inputType === 'text'">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              文字颜色
            </label>
            <div class="flex gap-2">
              <input
                v-model="textColor"
                type="color"
                class="w-12 h-10 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
              />
              <input
                v-model="textColor"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>

        <!-- 形状选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            图标形状
          </label>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input
                v-model="shape"
                type="radio"
                value="square"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">方形</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="shape"
                type="radio"
                value="rounded"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">圆角</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="shape"
                type="radio"
                value="circle"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">圆形</span>
            </label>
          </div>
        </div>

        <!-- 输出格式选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            输出格式
          </label>
          <div class="flex flex-wrap gap-4">
            <label class="flex items-center">
              <input
                v-model="outputFormat"
                type="radio"
                value="ico"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">ICO (推荐)</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="outputFormat"
                type="radio"
                value="png"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">PNG</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="outputFormat"
                type="radio"
                value="jpg"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <span class="ml-2 text-sm text-gray-900 dark:text-white">JPG</span>
            </label>
          </div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            ICO格式是标准favicon格式，兼容性最佳；PNG支持透明背景；JPG文件更小但不支持透明
          </p>
        </div>
      </div>
    </div>

    <!-- 预览区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Eye class="w-5 h-5 mr-2" />
        预览
      </h2>
      
      <div class="grid grid-cols-3 md:grid-cols-6 gap-4">
        <div
          v-for="size in faviconSizes"
          :key="size.name"
          class="text-center"
        >
          <div class="mb-2">
            <canvas
              :ref="el => canvasRefs[size.name] = el as HTMLCanvasElement"
              :width="size.size"
              :height="size.size"
              class="border border-gray-200 dark:border-gray-600 mx-auto"
              :style="{ width: Math.min(size.size, 64) + 'px', height: Math.min(size.size, 64) + 'px' }"
            ></canvas>
          </div>
          <div class="text-xs text-gray-600 dark:text-gray-400">
            {{ size.name }}<br/>{{ size.size }}×{{ size.size }}
          </div>
        </div>
      </div>
    </div>

    <!-- 生成和下载 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Download class="w-5 h-5 mr-2" />
        下载
      </h2>
      
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            v-for="size in faviconSizes"
            :key="size.name"
            @click="downloadFavicon(size)"
            class="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="text-left">
              <div class="text-sm font-medium text-gray-900 dark:text-white">{{ size.name }}</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                {{ size.size }}×{{ size.size }} · {{ outputFormat.toUpperCase() }}
              </div>
            </div>
            <Download class="w-4 h-4 text-gray-400" />
          </button>
        </div>
        
        <div class="border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            @click="downloadAll"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            下载全部尺寸 ({{ outputFormat.toUpperCase() }} 格式)
          </button>
        </div>
      </div>
    </div>

    <!-- HTML代码生成 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Code class="w-5 h-5 mr-2" />
        HTML代码
      </h2>
      
      <div class="space-y-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          将以下代码添加到网站的 &lt;head&gt; 部分：
        </p>
        <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto relative">
          <pre>{{ htmlCode }}</pre>
          <button
            @click="copyHtmlCode"
            class="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded"
            title="复制HTML代码"
          >
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { 
  Palette, Eye, Download, Code, Upload, X, Copy
} from 'lucide-vue-next'

// 响应式数据
const inputType = ref<'text' | 'emoji' | 'image'>('text')
const textContent = ref('A')
const fontSize = ref(32)
const selectedEmoji = ref('🚀')
const uploadedImage = ref('')
const backgroundColor = ref('#3b82f6')
const textColor = ref('#ffffff')
const shape = ref<'square' | 'rounded' | 'circle'>('rounded')
const outputFormat = ref<'ico' | 'png' | 'jpg'>('ico')
const canvasRefs = ref<Record<string, HTMLCanvasElement | null>>({})
const fileInput = ref<HTMLInputElement>()

// 常用表情符号
const commonEmojis = [
  '🚀', '⚡', '🔥', '💡', '⭐', '🌟', '💎', '🎯',
  '🎨', '🔧', '⚙️', '📱', '💻', '🌐', '📊', '📈',
  '🏠', '🏢', '🎵', '🎮', '📷', '✉️', '📞', '🔒'
]

// Favicon尺寸配置
const faviconSizes = [
  { name: 'favicon', size: 16 },
  { name: 'favicon-32', size: 32 },
  { name: 'apple-touch-icon-57', size: 57 },
  { name: 'apple-touch-icon-72', size: 72 },
  { name: 'apple-touch-icon-114', size: 114 },
  { name: 'apple-touch-icon-144', size: 144 },
  { name: 'apple-touch-icon-180', size: 180 },
  { name: 'android-chrome-192', size: 192 },
  { name: 'android-chrome-512', size: 512 }
]

// 生成HTML代码
const htmlCode = computed(() => {
  const ext = outputFormat.value
  const mimeType = ext === 'ico' ? 'image/x-icon' : 
                   ext === 'png' ? 'image/png' : 'image/jpeg'
  
  if (outputFormat.value === 'ico') {
    return `<!-- Favicon ICO -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">

<!-- Alternative PNG fallbacks -->
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.${ext}">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.${ext}">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.${ext}">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.${ext}">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.${ext}">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.${ext}">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.${ext}">

<!-- Android Chrome Icons -->
<link rel="icon" type="${mimeType}" sizes="192x192" href="/android-chrome-192x192.${ext}">
<link rel="icon" type="${mimeType}" sizes="512x512" href="/android-chrome-512x512.${ext}">`
  } else {
    return `<!-- Favicon -->
<link rel="icon" type="${mimeType}" sizes="16x16" href="/favicon-16x16.${ext}">
<link rel="icon" type="${mimeType}" sizes="32x32" href="/favicon-32x32.${ext}">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.${ext}">
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.${ext}">
<link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.${ext}">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.${ext}">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.${ext}">

<!-- Android Chrome Icons -->
<link rel="icon" type="${mimeType}" sizes="192x192" href="/android-chrome-192x192.${ext}">
<link rel="icon" type="${mimeType}" sizes="512x512" href="/android-chrome-512x512.${ext}">

<!-- Manifest -->
<link rel="manifest" href="/site.webmanifest">`
  }
})

// 绘制favicon
const drawFavicon = async (canvas: HTMLCanvasElement, size: number) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, size, size)

  // 如果是JPG格式，需要先填充白色背景（因为JPG不支持透明）
  if (outputFormat.value === 'jpg') {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)
  }

  // 绘制背景
  if (shape.value === 'circle') {
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI)
    ctx.fillStyle = backgroundColor.value
    ctx.fill()
  } else {
    ctx.fillStyle = backgroundColor.value
    if (shape.value === 'rounded') {
      const radius = size * 0.1
      ctx.beginPath()
      ctx.roundRect(0, 0, size, size, radius)
      ctx.fill()
    } else {
      ctx.fillRect(0, 0, size, size)
    }
  }

  // 绘制内容
  if (inputType.value === 'text' && textContent.value) {
    ctx.fillStyle = textColor.value
    ctx.font = `${Math.round(fontSize.value * size / 64)}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(textContent.value, size / 2, size / 2)
  } else if (inputType.value === 'emoji' && selectedEmoji.value) {
    ctx.font = `${Math.round(size * 0.6)}px Arial, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(selectedEmoji.value, size / 2, size / 2)
  } else if (inputType.value === 'image' && uploadedImage.value) {
    try {
      const img = new Image()
      img.onload = () => {
        const imgSize = Math.min(size * 0.8, size * 0.8)
        const x = (size - imgSize) / 2
        const y = (size - imgSize) / 2
        ctx.drawImage(img, x, y, imgSize, imgSize)
      }
      img.src = uploadedImage.value
    } catch (error) {
      console.error('Error loading image:', error)
    }
  }
}

// 更新所有预览
const updatePreviews = async () => {
  await nextTick()
  for (const size of faviconSizes) {
    const canvas = canvasRefs.value[size.name]
    if (canvas) {
      await drawFavicon(canvas, size.size)
    }
  }
}

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    uploadedImage.value = e.target?.result as string
    updatePreviews()
  }
  reader.readAsDataURL(file)
}

// 清除上传的图片
const clearUploadedImage = () => {
  uploadedImage.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  updatePreviews()
}

// 获取格式相关信息
const getFormatInfo = () => {
  switch (outputFormat.value) {
    case 'ico':
      return { 
        mimeType: 'image/png', // ICO使用PNG数据，浏览器会自动处理
        ext: 'ico', 
        quality: undefined 
      }
    case 'png':
      return { 
        mimeType: 'image/png', 
        ext: 'png', 
        quality: undefined 
      }
    case 'jpg':
      return { 
        mimeType: 'image/jpeg', 
        ext: 'jpg', 
        quality: 0.9 
      }
    default:
      return { 
        mimeType: 'image/png', 
        ext: 'png', 
        quality: undefined 
      }
  }
}

// 下载单个favicon
const downloadFavicon = (sizeConfig: typeof faviconSizes[0]) => {
  const canvas = canvasRefs.value[sizeConfig.name]
  if (!canvas) return

  const formatInfo = getFormatInfo()
  const link = document.createElement('a')
  
  // 特殊处理16x16的favicon为favicon.ico
  if (outputFormat.value === 'ico' && sizeConfig.size === 16) {
    link.download = `favicon.ico`
  } else {
    link.download = `${sizeConfig.name}-${sizeConfig.size}x${sizeConfig.size}.${formatInfo.ext}`
  }
  
  // 根据格式设置质量参数
  if (formatInfo.quality !== undefined) {
    link.href = canvas.toDataURL(formatInfo.mimeType, formatInfo.quality)
  } else {
    link.href = canvas.toDataURL(formatInfo.mimeType)
  }
  
  link.click()
}

// 下载所有尺寸（简化版，实际项目中可以使用JSZip）
const downloadAll = () => {
  faviconSizes.forEach(size => {
    setTimeout(() => downloadFavicon(size), 100 * faviconSizes.indexOf(size))
  })
}

// 复制HTML代码
const copyHtmlCode = async () => {
  try {
    await navigator.clipboard.writeText(htmlCode.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy HTML code:', err)
  }
}

// 监听变化并更新预览
watch([inputType, textContent, fontSize, selectedEmoji, backgroundColor, textColor, shape, outputFormat], updatePreviews)

// 组件挂载后初始化
onMounted(() => {
  setTimeout(updatePreviews, 100)
})
</script> 