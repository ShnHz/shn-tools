<template>
  <div class="space-y-6">
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 编码区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">文本编码</h2>
          <button
            @click="clearInput"
            class="btn btn-secondary btn-sm"
            :disabled="!textInput.trim()"
          >
            清空
          </button>
        </div>
        <textarea
          v-model="textInput"
          placeholder="输入要编码的文本..."
          class="textarea min-h-[200px] resize-y"
        />
        <button
          @click="encodeText"
          class="btn btn-primary w-full"
          :disabled="!textInput.trim()"
        >
          编码为 Base64
        </button>
      </div>

      <!-- 解码区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Base64解码</h2>
          <button
            @click="clearBase64"
            class="btn btn-secondary btn-sm"
            :disabled="!base64Input.trim()"
          >
            清空
          </button>
        </div>
        <textarea
          v-model="base64Input"
          placeholder="输入要解码的Base64字符串..."
          class="textarea min-h-[200px] resize-y font-mono text-sm"
        />
        <button
          @click="decodeBase64"
          class="btn btn-primary w-full"
          :disabled="!base64Input.trim()"
        >
          解码 Base64
        </button>
        <div v-if="decodeError" class="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p class="text-sm text-destructive">{{ decodeError }}</p>
        </div>
      </div>
    </div>

    <!-- 结果显示 -->
    <div v-if="result" class="card p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">
          {{ mode === 'encode' ? 'Base64编码结果' : '解码结果' }}
        </h3>
        <div class="flex gap-2">
          <button
            @click="copyResult"
            class="btn btn-primary btn-sm"
          >
            复制结果
          </button>
          <button
            v-if="mode === 'encode'"
            @click="downloadResult"
            class="btn btn-secondary btn-sm"
          >
            下载文件
          </button>
        </div>
      </div>
      <div class="relative">
        <pre
          class="bg-muted p-4 rounded-md text-sm font-mono overflow-auto max-h-[300px] border"
        >{{ result }}</pre>
      </div>
      <div class="mt-3 text-sm text-muted-foreground">
        原始长度: {{ originalLength }} 字符 | 
        结果长度: {{ result.length }} 字符 |
        压缩比: {{ compressionRatio }}
      </div>
    </div>

    <!-- 文件编码 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">文件Base64编码</h3>
      <div class="space-y-4">
        <div class="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
          <input
            ref="fileInput"
            type="file"
            @change="handleFileSelect"
            class="hidden"
          />
          <button
            @click="$refs.fileInput?.click()"
            class="btn btn-primary"
          >
            选择文件
          </button>
          <p class="text-sm text-muted-foreground mt-2">
            支持任意文件类型，最大支持 10MB
          </p>
        </div>
        
        <div v-if="fileResult" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span class="font-medium">文件名:</span> {{ fileName }}
            </div>
            <div>
              <span class="font-medium">文件大小:</span> {{ fileSize }}
            </div>
            <div>
              <span class="font-medium">文件类型:</span> {{ fileType }}
            </div>
            <div>
              <span class="font-medium">Base64长度:</span> {{ fileResult.length }} 字符
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium">Base64 Data URI</label>
              <div class="flex gap-2">
                <button
                  @click="copyFileResult"
                  class="btn btn-primary btn-sm"
                >
                  复制
                </button>
                <button
                  @click="downloadFileResult"
                  class="btn btn-secondary btn-sm"
                >
                  下载
                </button>
              </div>
            </div>
            <textarea
              :value="fileResult"
              readonly
              class="textarea min-h-[150px] resize-y font-mono text-xs"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">使用说明</h3>
      <div class="space-y-3 text-sm">
        <div>
          <strong>Base64编码:</strong> 将二进制数据转换为ASCII字符串的编码方式，常用于在文本协议中传输二进制数据。
        </div>
        <div>
          <strong>应用场景:</strong>
          <ul class="list-disc list-inside ml-4 space-y-1">
            <li>邮件附件传输</li>
            <li>网页中嵌入图片(Data URI)</li>
            <li>HTTP Basic认证</li>
            <li>JSON中传输二进制数据</li>
          </ul>
        </div>
        <div>
          <strong>注意事项:</strong> Base64编码会使数据大小增加约33%，不是加密算法，仅用于编码传输。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const textInput = ref('')
const base64Input = ref('')
const result = ref('')
const mode = ref<'encode' | 'decode'>('encode')
const decodeError = ref('')
const fileResult = ref('')
const fileName = ref('')
const fileSize = ref('')
const fileType = ref('')

/**
 * 原始内容长度
 */
const originalLength = computed(() => {
  return mode.value === 'encode' ? textInput.value.length : base64Input.value.length
})

/**
 * 压缩比
 */
const compressionRatio = computed(() => {
  if (!result.value) return '0%'
  const ratio = mode.value === 'encode' 
    ? (result.value.length / textInput.value.length * 100).toFixed(1)
    : (result.value.length / base64Input.value.length * 100).toFixed(1)
  return `${ratio}%`
})

/**
 * 编码文本为Base64
 */
const encodeText = () => {
  try {
    result.value = btoa(unescape(encodeURIComponent(textInput.value)))
    mode.value = 'encode'
    decodeError.value = ''
  } catch (error) {
    decodeError.value = '编码失败，请检查输入内容'
  }
}

/**
 * 解码Base64为文本
 */
const decodeBase64 = () => {
  try {
    result.value = decodeURIComponent(escape(atob(base64Input.value)))
    mode.value = 'decode'
    decodeError.value = ''
  } catch (error) {
    decodeError.value = '解码失败，请检查Base64格式是否正确'
    result.value = ''
  }
}

/**
 * 清空输入
 */
const clearInput = () => {
  textInput.value = ''
  if (mode.value === 'encode') {
    result.value = ''
  }
}

/**
 * 清空Base64输入
 */
const clearBase64 = () => {
  base64Input.value = ''
  if (mode.value === 'decode') {
    result.value = ''
  }
  decodeError.value = ''
}

/**
 * 复制结果
 */
const copyResult = async () => {
  try {
    await navigator.clipboard.writeText(result.value)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

/**
 * 下载结果
 */
const downloadResult = () => {
  const blob = new Blob([result.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'base64-encoded.txt'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * 处理文件选择
 */
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (!file) return

  if (file.size > 10 * 1024 * 1024) {
    alert('文件大小不能超过10MB')
    return
  }

  fileName.value = file.name
  fileSize.value = formatFileSize(file.size)
  fileType.value = file.type || '未知类型'

  const reader = new FileReader()
  reader.onload = (e) => {
    const base64 = e.target?.result as string
    fileResult.value = base64
  }
  reader.readAsDataURL(file)
}

/**
 * 格式化文件大小
 */
const formatFileSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * 复制文件结果
 */
const copyFileResult = async () => {
  try {
    await navigator.clipboard.writeText(fileResult.value)
  } catch (err) {
    console.error('复制失败:', err)
  }
}

/**
 * 下载文件结果
 */
const downloadFileResult = () => {
  const blob = new Blob([fileResult.value], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName.value}.base64.txt`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script> 