<template>
    <div class="space-y-6">
      <!-- 工具标题 -->
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gradient mb-2">文本对比</h1>
        <p class="text-muted-foreground">比较两个文本的差异，高亮显示增删改内容</p>
      </div>
  
      <!-- 输入区域 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- 原文本 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-foreground">原文本</label>
            <div class="flex gap-2">
              <button
                @click="clearOriginal"
                class="btn-ghost btn-sm"
                :disabled="!originalText"
              >
                <X class="h-3 w-3 mr-1" />
                清空
              </button>
              <button
                @click="loadSampleOriginal"
                class="btn-outline btn-sm"
              >
                <FileText class="h-3 w-3 mr-1" />
                示例
              </button>
            </div>
          </div>
          <textarea
            v-model="originalText"
            placeholder="请输入原文本..."
            class="textarea min-h-[300px] font-mono text-sm"
            :class="{ 'border-red-500': originalError }"
          ></textarea>
          <div class="text-xs text-muted-foreground">
            行数: {{ originalLines.length }} | 字符数: {{ originalText.length }}
          </div>
        </div>
  
        <!-- 新文本 -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <label class="text-sm font-medium text-foreground">新文本</label>
            <div class="flex gap-2">
              <button
                @click="clearModified"
                class="btn-ghost btn-sm"
                :disabled="!modifiedText"
              >
                <X class="h-3 w-3 mr-1" />
                清空
              </button>
              <button
                @click="loadSampleModified"
                class="btn-outline btn-sm"
              >
                <FileText class="h-3 w-3 mr-1" />
                示例
              </button>
            </div>
          </div>
          <textarea
            v-model="modifiedText"
            placeholder="请输入新文本..."
            class="textarea min-h-[300px] font-mono text-sm"
            :class="{ 'border-red-500': modifiedError }"
          ></textarea>
          <div class="text-xs text-muted-foreground">
            行数: {{ modifiedLines.length }} | 字符数: {{ modifiedText.length }}
          </div>
        </div>
      </div>
  
      <!-- 对比选项 -->
      <div class="card p-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <input
              id="ignore-whitespace"
              v-model="ignoreWhitespace"
              type="checkbox"
              class="checkbox"
            />
            <label for="ignore-whitespace" class="text-sm">忽略空白字符</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="ignore-case"
              v-model="ignoreCase"
              type="checkbox"
              class="checkbox"
            />
            <label for="ignore-case" class="text-sm">忽略大小写</label>
          </div>
          <div class="flex items-center gap-2">
            <input
              id="show-line-numbers"
              v-model="showLineNumbers"
              type="checkbox"
              class="checkbox"
            />
            <label for="show-line-numbers" class="text-sm">显示行号</label>
          </div>
        </div>
      </div>
  
      <!-- 差异统计 -->
      <div v-if="hasDiff" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-green-600">{{ diffStats.added }}</div>
          <div class="text-sm text-muted-foreground">新增行</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-red-600">{{ diffStats.deleted }}</div>
          <div class="text-sm text-muted-foreground">删除行</div>
        </div>
        <div class="card p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">{{ diffStats.modified }}</div>
          <div class="text-sm text-muted-foreground">修改行</div>
        </div>
      </div>
  
      <!-- 对比结果 -->
      <div v-if="hasDiff" class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">对比结果</h3>
          <div class="flex gap-2">
            <button
              @click="copyDiff"
              class="btn-outline btn-sm"
            >
              <Copy class="h-3 w-3 mr-1" />
              复制差异
            </button>
            <button
              @click="exportDiff"
              class="btn-outline btn-sm"
            >
              <Download class="h-3 w-3 mr-1" />
              导出
            </button>
          </div>
        </div>
  
        <div class="card p-0 overflow-hidden">
          <div class="diff-container max-h-[600px] overflow-auto">
            <table class="w-full text-sm font-mono">
              <tbody>
                <tr v-for="(line, index) in diffResult" :key="index" :class="getDiffLineClass(line.type)">
                  <td v-if="showLineNumbers" class="diff-line-number">
                    {{ line.originalLine || '' }}
                  </td>
                  <td v-if="showLineNumbers" class="diff-line-number">
                    {{ line.modifiedLine || '' }}
                  </td>
                  <td class="diff-marker">{{ getDiffMarker(line.type) }}</td>
                  <td class="diff-content">
                    <span v-html="line.content"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- 空状态 -->
      <div v-else-if="originalText || modifiedText" class="text-center py-12">
        <div class="text-muted-foreground">
          <FileX class="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>{{ originalText && modifiedText ? '文本内容相同' : '请输入两个文本进行对比' }}</p>
        </div>
      </div>
  
      <!-- 使用说明 -->
      <div class="card p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
        <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
          <Info class="h-5 w-5 text-blue-600" />
          使用说明
        </h3>
        <div class="space-y-2 text-sm text-muted-foreground">
          <p>• <span class="font-medium text-green-600">绿色行</span>：新增内容</p>
          <p>• <span class="font-medium text-red-600">红色行</span>：删除内容</p>
          <p>• <span class="font-medium text-blue-600">蓝色行</span>：修改内容</p>
          <p>• 支持忽略空白字符和大小写的对比选项</p>
          <p>• 可以导出差异结果为文本文件</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { 
    X, 
    FileText, 
    Copy, 
    Download, 
    FileX, 
    Info,
    Plus,
    Minus,
    Edit
  } from 'lucide-vue-next'
  
  // 响应式数据
  const originalText = ref('')
  const modifiedText = ref('')
  const ignoreWhitespace = ref(false)
  const ignoreCase = ref(false)
  const showLineNumbers = ref(true)
  const originalError = ref(false)
  const modifiedError = ref(false)
  
  // 计算属性
  const originalLines = computed(() => originalText.value.split('\n'))
  const modifiedLines = computed(() => modifiedText.value.split('\n'))
  
  // 文本预处理
  const preprocessText = (text: string) => {
    let processed = text
    if (ignoreWhitespace.value) {
      processed = processed.replace(/\s+/g, ' ').trim()
    }
    if (ignoreCase.value) {
      processed = processed.toLowerCase()
    }
    return processed
  }
  
  // LCS算法计算最长公共子序列
  const computeLCS = (arr1: string[], arr2: string[]) => {
    const m = arr1.length
    const n = arr2.length
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0))
    
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const line1 = preprocessText(arr1[i - 1])
        const line2 = preprocessText(arr2[j - 1])
        
        if (line1 === line2) {
          dp[i][j] = dp[i - 1][j - 1] + 1
        } else {
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
        }
      }
    }
    
    return dp
  }
  
  // 生成差异结果
  const diffResult = computed(() => {
    if (!originalText.value && !modifiedText.value) return []
    
    const lines1 = originalLines.value
    const lines2 = modifiedLines.value
    const lcs = computeLCS(lines1, lines2)
    const result = []
    
    let i = lines1.length
    let j = lines2.length
    let originalLineNum = lines1.length
    let modifiedLineNum = lines2.length
    
    while (i > 0 || j > 0) {
      const line1 = i > 0 ? preprocessText(lines1[i - 1]) : ''
      const line2 = j > 0 ? preprocessText(lines2[j - 1]) : ''
      
      if (i > 0 && j > 0 && line1 === line2) {
        // 相同行
        result.unshift({
          type: 'equal',
          content: escapeHtml(lines1[i - 1]),
          originalLine: originalLineNum,
          modifiedLine: modifiedLineNum
        })
        i--
        j--
        originalLineNum--
        modifiedLineNum--
      } else if (j > 0 && (i === 0 || lcs[i][j - 1] >= lcs[i - 1][j])) {
        // 新增行
        result.unshift({
          type: 'added',
          content: escapeHtml(lines2[j - 1]),
          originalLine: null,
          modifiedLine: modifiedLineNum
        })
        j--
        modifiedLineNum--
      } else if (i > 0) {
        // 删除行
        result.unshift({
          type: 'deleted',
          content: escapeHtml(lines1[i - 1]),
          originalLine: originalLineNum,
          modifiedLine: null
        })
        i--
        originalLineNum--
      }
    }
    
    return result
  })
  
  // 差异统计
  const diffStats = computed(() => {
    const stats = { added: 0, deleted: 0, modified: 0 }
    
    diffResult.value.forEach(line => {
      if (line.type === 'added') stats.added++
      else if (line.type === 'deleted') stats.deleted++
    })
    
    return stats
  })
  
  // 是否有差异
  const hasDiff = computed(() => {
    return originalText.value && modifiedText.value && diffResult.value.some(line => line.type !== 'equal')
  })
  
  // 工具方法
  const escapeHtml = (text: string) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }
  
  const getDiffLineClass = (type: string) => {
    switch (type) {
      case 'added': return 'bg-green-50 dark:bg-green-950/30 border-l-4 border-green-500'
      case 'deleted': return 'bg-red-50 dark:bg-red-950/30 border-l-4 border-red-500'
      case 'modified': return 'bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-500'
      default: return ''
    }
  }
  
  const getDiffMarker = (type: string) => {
    switch (type) {
      case 'added': return '+'
      case 'deleted': return '-'
      case 'modified': return '~'
      default: return ' '
    }
  }
  
  // 操作方法
  const clearOriginal = () => {
    originalText.value = ''
    originalError.value = false
  }
  
  const clearModified = () => {
    modifiedText.value = ''
    modifiedError.value = false
  }
  
  const loadSampleOriginal = () => {
    originalText.value = `function calculateSum(a, b) {
    return a + b;
  }
  
  const numbers = [1, 2, 3, 4, 5];
  const result = numbers.reduce((sum, num) => sum + num, 0);
  
  console.log('Sum:', result);`
  }
  
  const loadSampleModified = () => {
    modifiedText.value = `function calculateSum(a, b, c = 0) {
    return a + b + c;
  }
  
  const numbers = [1, 2, 3, 4, 5, 6];
  const result = numbers.reduce((sum, num) => sum + num, 0);
  
  console.log('Total sum:', result);
  console.log('Average:', result / numbers.length);`
  }
  
  const copyDiff = async () => {
    const diffText = diffResult.value.map(line => {
      const marker = getDiffMarker(line.type)
      return `${marker} ${line.content}`
    }).join('\n')
    
    try {
      await navigator.clipboard.writeText(diffText)
      // 这里可以添加提示消息
    } catch (err) {
      console.error('复制失败:', err)
    }
  }
  
  const exportDiff = () => {
    const diffText = diffResult.value.map(line => {
      const marker = getDiffMarker(line.type)
      const lineNumbers = showLineNumbers.value 
        ? `${line.originalLine || '-'}:${line.modifiedLine || '-'} ` 
        : ''
      return `${lineNumbers}${marker} ${line.content}`
    }).join('\n')
    
    const blob = new Blob([diffText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'text-diff.txt'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
  </script>
  
  <style scoped>
  .diff-container {
    background: var(--background);
  }
  
  .diff-line-number {
    @apply px-2 py-1 text-xs text-muted-foreground bg-muted/30 border-r border-border min-w-[3rem] text-center;
  }
  
  .diff-marker {
    @apply px-2 py-1 text-center font-bold min-w-[2rem];
    color: var(--muted-foreground);
  }
  
  .diff-content {
    @apply px-3 py-1 whitespace-pre-wrap break-all;
  }
  
  .textarea {
    resize: vertical;
  }
  </style>