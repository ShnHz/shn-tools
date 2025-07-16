<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <!-- 标题和说明 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        MD5 哈希计算器
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        计算文本或文件的MD5哈希值，支持实时计算和批量处理
      </p>
    </div>

    <!-- 输入方式选择 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Hash class="w-5 h-5 mr-2" />
        输入方式
      </h2>
      
      <div class="flex flex-wrap gap-4 mb-4">
        <label class="flex items-center">
          <input
            v-model="inputMode"
            type="radio"
            value="text"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-900 dark:text-white">文本输入</span>
        </label>
        <label class="flex items-center">
          <input
            v-model="inputMode"
            type="radio"
            value="file"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-900 dark:text-white">文件上传</span>
        </label>
      </div>

      <!-- 文本输入 -->
      <div v-if="inputMode === 'text'" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            输入文本
          </label>
          <textarea
            v-model="inputText"
            placeholder="在这里输入要计算MD5的文本..."
            class="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          ></textarea>
          <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            字符数: {{ inputText.length }} | 字节数: {{ getByteLength(inputText) }}
          </div>
        </div>
        
        <!-- 编码选择 -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            字符编码
          </label>
          <select
            v-model="encoding"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="utf8">UTF-8</option>
            <option value="utf16">UTF-16</option>
            <option value="ascii">ASCII</option>
            <option value="latin1">Latin-1</option>
          </select>
        </div>
      </div>

      <!-- 文件上传 -->
      <div v-if="inputMode === 'file'" class="space-y-4">
        <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
          <input
            ref="fileInput"
            type="file"
            multiple
            @change="handleFileUpload"
            class="hidden"
          />
                     <div v-if="selectedFiles.length === 0" @click="fileInput?.click()" class="cursor-pointer">
             <Upload class="w-8 h-8 mx-auto text-gray-400 mb-2" />
             <p class="text-sm text-gray-600 dark:text-gray-400">点击选择文件或拖拽文件到这里</p>
             <p class="text-xs text-gray-500 dark:text-gray-500 mt-1">支持多文件选择</p>
           </div>
          <div v-else class="space-y-2">
            <div v-for="(file, index) in selectedFiles" :key="index" class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
              <div class="flex items-center">
                <FileText class="w-4 h-4 mr-2 text-gray-500" />
                <span class="text-sm text-gray-900 dark:text-white">{{ file.name }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">({{ formatFileSize(file.size) }})</span>
              </div>
              <button
                @click="removeFile(index)"
                class="text-red-500 hover:text-red-700"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
                         <button
               @click="fileInput?.click()"
               class="text-blue-500 hover:text-blue-700 text-sm"
             >
               添加更多文件
             </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 计算结果 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Shield class="w-5 h-5 mr-2" />
        计算结果
      </h2>
      
      <div class="space-y-4">
        <!-- 文本MD5结果 -->
        <div v-if="inputMode === 'text'" class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">MD5 哈希值</label>
              <div class="font-mono text-sm text-gray-900 dark:text-white mt-1">
                {{ textMd5 || '请输入文本' }}
              </div>
            </div>
            <button
              v-if="textMd5"
              @click="copyToClipboard(textMd5)"
              class="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="复制MD5值"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
          
          <!-- 其他哈希算法对比 -->
          <div v-if="inputText" class="space-y-2">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">其他哈希算法对比</h3>
            <div v-for="hash in otherHashes" :key="hash.name" class="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded break-words md:break-all">
              <div>
                <span class="text-xs font-medium text-gray-600 dark:text-gray-400">{{ hash.name }}</span>
                <div class="font-mono text-xs text-gray-900 dark:text-white">{{ hash.value }}</div>
              </div>
              <button
                @click="copyToClipboard(hash.value)"
                class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                title="复制哈希值"
              >
                <Copy class="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <!-- 文件MD5结果 -->
        <div v-if="inputMode === 'file'" class="space-y-3">
          <div v-if="selectedFiles.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
            请选择要计算MD5的文件
          </div>
          <div v-else>
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                文件哈希值 ({{ fileHashes.length }}/{{ selectedFiles.length }})
              </span>
              <button
                v-if="selectedFiles.length > 0"
                @click="calculateAllFileHashes"
                :disabled="isCalculating"
                class="px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded text-sm transition-colors"
              >
                <span v-if="isCalculating">计算中...</span>
                <span v-else>计算全部</span>
              </button>
            </div>
            
            <div class="space-y-2 max-h-64 overflow-y-auto">
              <div
                v-for="(file, index) in selectedFiles"
                :key="index"
                class="p-3 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <FileText class="w-4 h-4 mr-2 text-gray-500" />
                    <span class="text-sm font-medium text-gray-900 dark:text-white">{{ file.name }}</span>
                    <span class="text-xs text-gray-500 dark:text-gray-400 ml-2">({{ formatFileSize(file.size) }})</span>
                  </div>
                  <button
                    @click="calculateFileHash(file, index)"
                    :disabled="isCalculating"
                    class="px-2 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded text-xs transition-colors"
                  >
                    计算
                  </button>
                </div>
                
                <div v-if="fileHashes[index]" class="space-y-1">
                  <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-600 dark:text-gray-400">MD5:</span>
                    <button
                      @click="copyToClipboard(fileHashes[index].md5)"
                      class="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      title="复制MD5值"
                    >
                      <Copy class="w-3 h-3" />
                    </button>
                  </div>
                  <div class="font-mono text-xs text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 p-2 rounded">
                    {{ fileHashes[index].md5 }}
                  </div>
                </div>
                
                <div v-else-if="fileErrors[index]" class="text-red-500 text-xs">
                  错误: {{ fileErrors[index] }}
                </div>
                
                <div v-else class="text-gray-500 dark:text-gray-400 text-xs">
                  点击"计算"按钮生成MD5哈希值
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 工具说明 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Info class="w-5 h-5 mr-2" />
        MD5 说明
      </h2>
      
      <div class="space-y-4 text-sm text-gray-600 dark:text-gray-400">
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">什么是MD5？</h3>
          <p>MD5（Message Digest Algorithm 5）是一种广泛使用的密码散列函数，可以产生出一个128位（16字节）的散列值，用于确保信息传输完整一致。</p>
        </div>
        
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">主要用途：</h3>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li>文件完整性验证</li>
            <li>数据指纹生成</li>
            <li>密码存储（已不推荐）</li>
            <li>数字签名</li>
          </ul>
        </div>
        
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white mb-2">安全性注意：</h3>
          <p class="text-amber-600 dark:text-amber-400">
            ⚠️ MD5算法已被发现存在安全漏洞，不推荐用于安全敏感的应用。对于安全要求较高的场景，建议使用SHA-256等更安全的哈希算法。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  Hash, Shield, Upload, FileText, Copy, X, Info 
} from 'lucide-vue-next'
import CryptoJS from 'crypto-js'

// 响应式数据
const inputMode = ref<'text' | 'file'>('text')
const inputText = ref('')
const encoding = ref('utf8')
const selectedFiles = ref<File[]>([])
const fileHashes = ref<Array<{ md5: string }>>([])
const fileErrors = ref<Array<string | null>>([])
const isCalculating = ref(false)
const fileInput = ref<HTMLInputElement>()

// 计算文本MD5
const textMd5 = computed(() => {
  if (!inputText.value) return ''
  
  try {
    let words
    switch (encoding.value) {
      case 'utf8':
        words = CryptoJS.enc.Utf8.parse(inputText.value)
        break
      case 'utf16':
        words = CryptoJS.enc.Utf16.parse(inputText.value)
        break
      case 'latin1':
        words = CryptoJS.enc.Latin1.parse(inputText.value)
        break
      default:
        words = CryptoJS.enc.Utf8.parse(inputText.value)
    }
    
    return CryptoJS.MD5(words).toString()
  } catch (error) {
    console.error('MD5 calculation error:', error)
    return '计算错误'
  }
})

// 计算其他哈希算法
const otherHashes = computed(() => {
  if (!inputText.value) return []
  
  try {
    let words
    switch (encoding.value) {
      case 'utf8':
        words = CryptoJS.enc.Utf8.parse(inputText.value)
        break
      case 'utf16':
        words = CryptoJS.enc.Utf16.parse(inputText.value)
        break
      case 'latin1':
        words = CryptoJS.enc.Latin1.parse(inputText.value)
        break
      default:
        words = CryptoJS.enc.Utf8.parse(inputText.value)
    }
    
    return [
      { name: 'SHA-1', value: CryptoJS.SHA1(words).toString() },
      { name: 'SHA-256', value: CryptoJS.SHA256(words).toString() },
      { name: 'SHA-512', value: CryptoJS.SHA512(words).toString() }
    ]
  } catch (error) {
    return [{ name: '错误', value: '计算失败' }]
  }
})

// 获取字节长度
const getByteLength = (str: string) => {
  return new Blob([str]).size
}

// 格式化文件大小
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 处理文件上传
const handleFileUpload = (event: Event) => {
  const files = Array.from((event.target as HTMLInputElement).files || [])
  selectedFiles.value.push(...files)
  
  // 扩展哈希数组
  const newLength = selectedFiles.value.length
  while (fileHashes.value.length < newLength) {
    fileHashes.value.push({ md5: '' })
  }
  while (fileErrors.value.length < newLength) {
    fileErrors.value.push(null)
  }
}

// 移除文件
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
  fileHashes.value.splice(index, 1)
  fileErrors.value.splice(index, 1)
}

// 计算单个文件哈希
const calculateFileHash = async (file: File, index: number) => {
  isCalculating.value = true
  fileErrors.value[index] = null
  
  try {
    const arrayBuffer = await file.arrayBuffer()
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer)
    const md5 = CryptoJS.MD5(wordArray).toString()
    
    fileHashes.value[index] = { md5 }
  } catch (error) {
    console.error('File hash calculation error:', error)
    fileErrors.value[index] = '计算失败'
  } finally {
    isCalculating.value = false
  }
}

// 计算所有文件哈希
const calculateAllFileHashes = async () => {
  isCalculating.value = true
  
  for (let i = 0; i < selectedFiles.value.length; i++) {
    if (!fileHashes.value[i]?.md5) {
      await calculateFileHash(selectedFiles.value[i], i)
    }
  }
  
  isCalculating.value = false
}

// 复制到剪贴板
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}

// 监听输入模式变化
watch(inputMode, () => {
  // 切换模式时清空相关数据
  if (inputMode.value === 'text') {
    selectedFiles.value = []
    fileHashes.value = []
    fileErrors.value = []
  } else {
    inputText.value = ''
  }
})
</script> 