<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <!-- 标题和说明 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        YAML ↔ JSON 转换器
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        YAML和JSON格式之间的双向转换工具，支持实时转换和语法验证
      </p>
    </div>

    <!-- 转换控制栏 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <input
              id="yaml-to-json"
              v-model="conversionMode"
              type="radio"
              value="yaml-to-json"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label for="yaml-to-json" class="text-sm font-medium text-gray-900 dark:text-white">
              YAML → JSON
            </label>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="json-to-yaml"
              v-model="conversionMode"
              type="radio"
              value="json-to-yaml"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
            />
            <label for="json-to-yaml" class="text-sm font-medium text-gray-900 dark:text-white">
              JSON → YAML
            </label>
          </div>
        </div>
        
        <div class="flex gap-2">
          <button
            @click="swapContent"
            class="px-3 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/30 transition-colors"
            title="交换输入输出内容"
          >
            <RefreshCw class="w-4 h-4" />
          </button>
          <button
            @click="clearAll"
            class="px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors"
            title="清空所有内容"
          >
            <Trash class="w-4 h-4" />
          </button>
          <button
            @click="copyOutput"
            :disabled="!outputContent"
            class="px-3 py-2 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="复制输出内容"
          >
            <Copy class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- 转换器主体 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 输入区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <FileText class="w-5 h-5 mr-2" />
            {{ conversionMode === 'yaml-to-json' ? 'YAML 输入' : 'JSON 输入' }}
          </h3>
          <div class="flex items-center gap-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ inputContent.length }} 字符
            </div>
            <div v-if="inputError" class="text-sm text-red-500 flex items-center">
              <AlertCircle class="w-4 h-4 mr-1" />
              语法错误
            </div>
            <div v-else-if="inputContent.trim()" class="text-sm text-green-500 flex items-center">
              <CheckCircle class="w-4 h-4 mr-1" />
              语法正确
            </div>
          </div>
        </div>
        <div class="p-4">
          <textarea
            v-model="inputContent"
            :placeholder="conversionMode === 'yaml-to-json' ? yamlPlaceholder : jsonPlaceholder"
            class="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm resize-none"
            :class="{
              'border-red-500 dark:border-red-500': inputError,
              'border-green-500 dark:border-green-500': !inputError && inputContent.trim()
            }"
          ></textarea>
          <div v-if="inputError" class="mt-2 text-sm text-red-500">
            {{ inputError }}
          </div>
        </div>
      </div>

      <!-- 输出区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <FileCode class="w-5 h-5 mr-2" />
            {{ conversionMode === 'yaml-to-json' ? 'JSON 输出' : 'YAML 输出' }}
          </h3>
          <div class="flex items-center gap-2">
            <div class="text-sm text-gray-500 dark:text-gray-400">
              {{ outputContent.length }} 字符
            </div>
            <label class="flex items-center gap-2 text-sm">
              <input
                v-model="formatOutput"
                type="checkbox"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <span class="text-gray-700 dark:text-gray-300">格式化</span>
            </label>
          </div>
        </div>
        <div class="p-4">
          <textarea
            v-model="outputContent"
            readonly
            placeholder="转换结果将在这里显示..."
            class="w-full h-96 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none dark:bg-gray-700 dark:text-white font-mono text-sm resize-none bg-gray-50 dark:bg-gray-900"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- 示例和说明 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 示例 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <BookOpen class="w-5 h-5 mr-2" />
          示例
        </h3>
        <div class="space-y-3">
          <button
            v-for="example in examples"
            :key="example.name"
            @click="loadExample(example)"
            class="w-full text-left p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div class="font-medium text-gray-900 dark:text-white">{{ example.name }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">{{ example.description }}</div>
          </button>
        </div>
      </div>

      <!-- 格式说明 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <Info class="w-5 h-5 mr-2" />
          格式说明
        </h3>
        <div class="space-y-4 text-sm">
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">YAML 特点：</h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
              <li>• 使用缩进表示层级结构</li>
              <li>• 支持注释（以 # 开头）</li>
              <li>• 更适合人类阅读和编写</li>
              <li>• 常用于配置文件</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">JSON 特点：</h4>
            <ul class="space-y-1 text-gray-600 dark:text-gray-400 ml-4">
              <li>• 使用大括号和中括号表示结构</li>
              <li>• 不支持注释</li>
              <li>• 更适合程序解析</li>
              <li>• 常用于API数据交换</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { 
  RefreshCw, Trash, Copy, FileText, FileCode, BookOpen, Info,
  AlertCircle, CheckCircle
} from 'lucide-vue-next'
// @ts-ignore
import yaml from 'js-yaml'

const conversionMode = ref<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json')
const inputContent = ref('')
const formatOutput = ref(true)
const inputError = ref('')

// 占位符文本
const yamlPlaceholder = `# YAML示例
name: John Doe
age: 30
skills:
  - JavaScript
  - TypeScript
  - Vue.js
address:
  street: 123 Main St
  city: New York
  country: USA`

const jsonPlaceholder = `{
  "name": "John Doe",
  "age": 30,
  "skills": ["JavaScript", "TypeScript", "Vue.js"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  }
}`

// 转换逻辑
const outputContent = computed(() => {
  if (!inputContent.value.trim()) return ''
  
  try {
    inputError.value = ''
    
    if (conversionMode.value === 'yaml-to-json') {
      // YAML to JSON
      const parsed = yaml.load(inputContent.value)
      return formatOutput.value 
        ? JSON.stringify(parsed, null, 2)
        : JSON.stringify(parsed)
    } else {
      // JSON to YAML
      const parsed = JSON.parse(inputContent.value)
      return yaml.dump(parsed, {
        indent: formatOutput.value ? 2 : 0,
        lineWidth: -1,
        noRefs: true,
        quotingType: '"'
      })
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '转换错误'
    inputError.value = errorMessage
    return ''
  }
})

// 交换内容
const swapContent = () => {
  if (!outputContent.value) return
  
  const temp = inputContent.value
  inputContent.value = outputContent.value
  conversionMode.value = conversionMode.value === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json'
  
  // 等待下一个tick后再设置，确保转换模式已更新
  setTimeout(() => {
    if (temp !== outputContent.value) {
      // 如果输出不等于原输入，说明发生了转换
    }
  }, 0)
}

// 清空所有内容
const clearAll = () => {
  if (confirm('确定要清空所有内容吗？')) {
    inputContent.value = ''
    inputError.value = ''
  }
}

// 复制输出
const copyOutput = async () => {
  if (!outputContent.value) return
  
  try {
    await navigator.clipboard.writeText(outputContent.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy output:', err)
  }
}

// 加载示例
const loadExample = (example: any) => {
  conversionMode.value = example.mode
  inputContent.value = example.content
}

// 示例数据
const examples = [
  {
    name: '基础配置',
    description: 'YAML配置文件示例',
    mode: 'yaml-to-json' as const,
    content: `# 应用配置
app:
  name: "我的应用"
  version: "1.0.0"
  debug: true

database:
  host: localhost
  port: 5432
  name: myapp
  credentials:
    username: admin
    password: secret

features:
  - authentication
  - logging
  - caching`
  },
  {
    name: 'API响应',
    description: 'JSON API数据示例',
    mode: 'json-to-yaml' as const,
    content: `{
  "status": "success",
  "data": {
    "users": [
      {
        "id": 1,
        "name": "张三",
        "email": "zhangsan@example.com",
        "active": true,
        "roles": ["user", "admin"],
        "profile": {
          "age": 28,
          "city": "北京",
          "interests": ["编程", "音乐", "旅行"]
        }
      },
      {
        "id": 2,
        "name": "李四",
        "email": "lisi@example.com",
        "active": false,
        "roles": ["user"],
        "profile": {
          "age": 25,
          "city": "上海",
          "interests": ["设计", "摄影"]
        }
      }
    ],
    "total": 2,
    "page": 1
  },
  "timestamp": "2024-01-15T10:30:00Z"
}`
  },
  {
    name: '复杂嵌套',
    description: '多层嵌套结构示例',
    mode: 'yaml-to-json' as const,
    content: `# Kubernetes部署配置
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
  namespace: production
  labels:
    app: my-app
    version: v1.0.0
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
        - name: app
          image: my-app:latest
          ports:
            - containerPort: 8080
          env:
            - name: NODE_ENV
              value: production
            - name: DB_HOST
              valueFrom:
                secretKeyRef:
                  name: db-secret
                  key: host
          resources:
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"`
  }
]
</script> 