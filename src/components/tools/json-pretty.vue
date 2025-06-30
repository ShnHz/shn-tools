<template>
  <div class="space-y-6">
    <div class="grid md:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">输入JSON</h2>
          <div class="flex gap-2">
            <button
              @click="clearInput"
              class="btn btn-secondary btn-sm"
              :disabled="!input.trim()"
            >
              清空
            </button>
            <button
              @click="loadSample"
              class="btn btn-secondary btn-sm"
            >
              示例数据
            </button>
          </div>
        </div>
        <textarea
          v-model="input"
          placeholder="在此输入JSON数据..."
          class="textarea min-h-[300px] resize-y font-mono text-sm"
        />
        <div v-if="error" class="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <p class="text-sm text-destructive font-medium">JSON格式错误：</p>
          <p class="text-sm text-destructive mt-1">{{ error }}</p>
        </div>
      </div>

      <!-- 输出区域 -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">格式化结果</h2>
          <div class="flex gap-2">
            <button
              @click="copyOutput"
              class="btn btn-primary btn-sm"
              :disabled="!output || !!error"
            >
              复制结果
            </button>
            <button
              @click="downloadJson"
              class="btn btn-secondary btn-sm"
              :disabled="!output || !!error"
            >
              下载文件
            </button>
          </div>
        </div>
        <div class="relative">
          <pre
            class="bg-muted p-4 rounded-md text-sm font-mono overflow-auto max-h-[300px] border"
            :class="{ 'text-muted-foreground': !output }"
          >{{ output || '格式化后的JSON将显示在这里...' }}</pre>
        </div>
      </div>
    </div>

    <!-- 操作选项 -->
    <div class="card p-4">
      <h3 class="font-semibold mb-4">格式化选项</h3>
      <div class="grid md:grid-cols-3 gap-4">
        <div class="space-y-2">
          <label class="text-sm font-medium">缩进空格数</label>
          <select v-model="indentSize" class="input">
            <option value="2">2个空格</option>
            <option value="4">4个空格</option>
            <option value="8">8个空格</option>
          </select>
        </div>
        
        <div class="space-y-2">
          <label class="text-sm font-medium">输出模式</label>
          <select v-model="mode" class="input">
            <option value="pretty">美化格式</option>
            <option value="compact">压缩格式</option>
          </select>
        </div>
        
        <div class="space-y-2">
          <label class="flex items-center gap-2 text-sm font-medium">
            <input
              v-model="sortKeys"
              type="checkbox"
              class="rounded border-input"
            />
            排序对象键名
          </label>
        </div>
      </div>
    </div>

    <!-- JSON信息 -->
    <div v-if="jsonInfo && !error" class="card p-4">
      <h3 class="font-semibold mb-4">JSON信息</h3>
      <div class="grid md:grid-cols-4 gap-4 text-sm">
        <div class="text-center">
          <div class="text-lg font-bold text-primary">{{ jsonInfo.size }}</div>
          <div class="text-muted-foreground">文件大小</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-primary">{{ jsonInfo.depth }}</div>
          <div class="text-muted-foreground">最大深度</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-primary">{{ jsonInfo.keys }}</div>
          <div class="text-muted-foreground">键数量</div>
        </div>
        <div class="text-center">
          <div class="text-lg font-bold text-primary">{{ jsonInfo.type }}</div>
          <div class="text-muted-foreground">数据类型</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const input = ref('')
const indentSize = ref(2)
const mode = ref('pretty')
const sortKeys = ref(false)
const error = ref('')

/**
 * 格式化后的JSON输出
 */
const output = computed(() => {
  if (!input.value.trim() || error.value) {
    return ''
  }

  try {
    const parsed = JSON.parse(input.value)
    
    if (mode.value === 'compact') {
      return JSON.stringify(sortKeys.value ? sortObjectKeys(parsed) : parsed)
    } else {
      return JSON.stringify(
        sortKeys.value ? sortObjectKeys(parsed) : parsed,
        null,
        Number(indentSize.value)
      )
    }
  } catch (e) {
    return ''
  }
})

/**
 * JSON文件信息
 */
const jsonInfo = computed(() => {
  if (!output.value || error.value) {
    return null
  }

  try {
    const parsed = JSON.parse(input.value)
    return {
      size: formatFileSize(output.value.length),
      depth: getObjectDepth(parsed),
      keys: countKeys(parsed),
      type: getDataType(parsed)
    }
  } catch (e) {
    return null
  }
})

/**
 * 验证JSON格式
 */
const validateJson = (jsonString: string) => {
  if (!jsonString.trim()) {
    error.value = ''
    return
  }

  try {
    JSON.parse(jsonString)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
}

/**
 * 递归排序对象键名
 */
const sortObjectKeys = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys)
  }

  const sortedKeys = Object.keys(obj).sort()
  const sortedObj: any = {}
  
  for (const key of sortedKeys) {
    sortedObj[key] = sortObjectKeys(obj[key])
  }
  
  return sortedObj
}

/**
 * 获取对象深度
 */
const getObjectDepth = (obj: any, depth = 1): number => {
  if (obj === null || typeof obj !== 'object') {
    return depth
  }

  if (Array.isArray(obj)) {
    return obj.length > 0 
      ? Math.max(...obj.map(item => getObjectDepth(item, depth + 1)))
      : depth
  }

  const keys = Object.keys(obj)
  return keys.length > 0
    ? Math.max(...keys.map(key => getObjectDepth(obj[key], depth + 1)))
    : depth
}

/**
 * 统计键数量
 */
const countKeys = (obj: any): number => {
  if (obj === null || typeof obj !== 'object') {
    return 0
  }

  if (Array.isArray(obj)) {
    return obj.reduce((count, item) => count + countKeys(item), 0)
  }

  const keys = Object.keys(obj)
  return keys.length + keys.reduce((count, key) => count + countKeys(obj[key]), 0)
}

/**
 * 获取数据类型
 */
const getDataType = (obj: any): string => {
  if (obj === null) return 'null'
  if (Array.isArray(obj)) return 'array'
  return typeof obj
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
 * 清空输入
 */
const clearInput = () => {
  input.value = ''
}

/**
 * 加载示例数据
 */
const loadSample = () => {
  input.value = JSON.stringify({
    name: "SHN",
    age: 25,
    email: "test@example.com",
    skills: ["JavaScript", "Vue.js", "TypeScript"],
    address: {
      country: "中国",
      city: "北京",
      zipCode: "100000"
    },
    projects: [
      {
        name: "工具箱项目",
        status: "active",
        contributors: 5
      },
      {
        name: "学习笔记",
        status: "completed",
        contributors: 1
      }
    ]
  }, null, 2)
}

/**
 * 复制输出结果
 */
const copyOutput = async () => {
  if (!output.value) return

  try {
    await navigator.clipboard.writeText(output.value)
    // 可以添加成功提示
  } catch (err) {
    console.error('复制失败:', err)
  }
}

/**
 * 下载JSON文件
 */
const downloadJson = () => {
  if (!output.value) return

  const blob = new Blob([output.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'formatted.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// 监听输入变化，验证JSON
watch(input, validateJson, { immediate: true })
</script> 