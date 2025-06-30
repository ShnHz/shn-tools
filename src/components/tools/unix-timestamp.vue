<template>
  <div class="space-y-6">
    <!-- 工具标题 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gradient mb-2">时间戳转换</h1>
      <p class="text-muted-foreground">Unix时间戳与日期时间的双向转换</p>
    </div>

    <!-- 当前时间 -->
    <div class="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200 dark:border-blue-800">
      <div class="text-center space-y-4">
        <h2 class="text-lg font-semibold flex items-center justify-center gap-2">
          <Clock class="h-5 w-5 text-blue-600" />
          当前时间
        </h2>
        <div class="space-y-2">
          <div class="text-2xl font-mono font-bold">{{ currentTimestamp }}</div>
          <div class="text-muted-foreground">{{ currentDateTime }}</div>
          <div class="text-sm text-muted-foreground">{{ currentTimeZone }}</div>
        </div>
        <div class="flex gap-2 justify-center">
          <button
            @click="copyToClipboard(currentTimestamp.toString())"
            class="btn-outline btn-sm"
          >
            <Copy class="h-3 w-3 mr-1" />
            复制时间戳
          </button>
          <button
            @click="refreshTime"
            class="btn-outline btn-sm"
          >
            <RefreshCw class="h-3 w-3 mr-1" />
            刷新
          </button>
        </div>
      </div>
    </div>

    <!-- 转换工具 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 时间戳转日期 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowRight class="h-4 w-4" />
          时间戳 → 日期
        </h3>
        
        <div class="space-y-4">
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">时间戳</label>
            <input
              v-model="timestampInput"
              type="text"
              class="input"
              placeholder="1735372800"
              @input="convertTimestampToDate"
            />
            <div class="mt-1 text-xs text-muted-foreground">
              支持秒级(10位)和毫秒级(13位)时间戳
            </div>
          </div>

          <div class="space-y-3">
            <div>
              <label class="text-sm text-muted-foreground">本地时间</label>
              <input
                v-model="convertedLocalTime"
                type="text"
                class="input mt-1"
                readonly
              />
            </div>
            
            <div>
              <label class="text-sm text-muted-foreground">UTC时间</label>
              <input
                v-model="convertedUtcTime"
                type="text"
                class="input mt-1"
                readonly
              />
            </div>
            
            <div>
              <label class="text-sm text-muted-foreground">ISO 8601格式</label>
              <input
                v-model="convertedIsoTime"
                type="text"
                class="input mt-1"
                readonly
              />
            </div>

            <div>
              <label class="text-sm text-muted-foreground">相对时间</label>
              <input
                v-model="relativeTime"
                type="text"
                class="input mt-1"
                readonly
              />
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="useCurrentTimestamp"
              class="btn-outline btn-sm flex-1"
            >
              使用当前时间戳
            </button>
            <button
              @click="copyConvertedDateTime"
              class="btn-outline btn-sm"
            >
              <Copy class="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>

      <!-- 日期转时间戳 -->
      <div class="card p-6">
        <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
          <ArrowLeft class="h-4 w-4" />
          日期 → 时间戳
        </h3>
        
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-sm text-muted-foreground">日期</label>
              <input
                v-model="dateInput"
                type="date"
                class="input mt-1"
                @input="convertDateToTimestamp"
              />
            </div>
            <div>
              <label class="text-sm text-muted-foreground">时间</label>
              <input
                v-model="timeInput"
                type="time"
                step="1"
                class="input mt-1"
                @input="convertDateToTimestamp"
              />
            </div>
          </div>

          <div>
            <label class="text-sm text-muted-foreground">完整日期时间</label>
            <input
              v-model="datetimeInput"
              type="datetime-local"
              step="1"
              class="input mt-1"
              @input="convertDatetimeToTimestamp"
            />
          </div>

          <div class="space-y-3">
            <div>
              <label class="text-sm text-muted-foreground">秒级时间戳</label>
              <input
                v-model="convertedTimestampSeconds"
                type="text"
                class="input mt-1"
                readonly
              />
            </div>
            
            <div>
              <label class="text-sm text-muted-foreground">毫秒级时间戳</label>
              <input
                v-model="convertedTimestampMillis"
                type="text"
                class="input mt-1"
                readonly
              />
            </div>
          </div>

          <div class="flex gap-2">
            <button
              @click="useCurrentDate"
              class="btn-outline btn-sm flex-1"
            >
              使用当前日期
            </button>
            <button
              @click="copyConvertedTimestamp"
              class="btn-outline btn-sm"
            >
              <Copy class="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷时间戳 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4">快捷时间戳</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          v-for="preset in presetTimestamps"
          :key="preset.label"
          @click="setTimestamp(preset.timestamp)"
          class="p-3 text-left border border-border rounded-lg hover:bg-accent hover:border-accent-foreground transition-colors"
        >
          <div class="font-medium text-sm">{{ preset.label }}</div>
          <div class="text-xs text-muted-foreground font-mono">{{ preset.timestamp }}</div>
        </button>
      </div>
    </div>

    <!-- 批量转换 -->
    <div class="card p-6">
      <h3 class="text-lg font-semibold mb-4 flex items-center gap-2">
        <List class="h-4 w-4" />
        批量转换
      </h3>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label class="text-sm text-muted-foreground mb-2 block">时间戳列表（每行一个）</label>
          <textarea
            v-model="batchTimestamps"
            class="textarea h-32"
            placeholder="1735372800&#10;1735459200&#10;1735545600"
            @input="convertBatchTimestamps"
          ></textarea>
        </div>
        
        <div>
          <label class="text-sm text-muted-foreground mb-2 block">转换结果</label>
          <textarea
            v-model="batchResults"
            class="textarea h-32"
            readonly
          ></textarea>
          <button
            @click="copyToClipboard(batchResults)"
            class="btn-outline btn-sm mt-2"
          >
            <Copy class="h-3 w-3 mr-1" />
            复制结果
          </button>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="card p-6 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
      <h3 class="text-lg font-semibold mb-3 flex items-center gap-2">
        <Info class="h-5 w-5 text-blue-600" />
        使用说明
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
        <div class="space-y-2">
          <p>• <strong>Unix时间戳</strong>：从1970年1月1日UTC开始的秒数</p>
          <p>• <strong>秒级时间戳</strong>：10位数字，精确到秒</p>
          <p>• <strong>毫秒级时间戳</strong>：13位数字，精确到毫秒</p>
        </div>
        <div class="space-y-2">
          <p>• 支持正负时间戳（1970年前后的时间）</p>
          <p>• 自动识别时间戳长度并转换</p>
          <p>• 支持批量转换多个时间戳</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { 
  Clock, 
  Copy, 
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Info,
  List
} from 'lucide-vue-next'

// 响应式数据
const currentTimestamp = ref(Math.floor(Date.now() / 1000))
const timestampInput = ref('')
const dateInput = ref('')
const timeInput = ref('')
const datetimeInput = ref('')

// 转换结果
const convertedLocalTime = ref('')
const convertedUtcTime = ref('')
const convertedIsoTime = ref('')
const relativeTime = ref('')
const convertedTimestampSeconds = ref('')
const convertedTimestampMillis = ref('')

// 批量转换
const batchTimestamps = ref('')
const batchResults = ref('')

// 计算属性
const currentDateTime = computed(() => {
  return new Date(currentTimestamp.value * 1000).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})

const currentTimeZone = computed(() => {
  const offset = new Date().getTimezoneOffset()
  const hours = Math.floor(Math.abs(offset) / 60)
  const minutes = Math.abs(offset) % 60
  const sign = offset <= 0 ? '+' : '-'
  return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
})

// 预设时间戳
const presetTimestamps = computed(() => {
  const now = Math.floor(Date.now() / 1000)
  const oneDay = 24 * 60 * 60
  
  return [
    { label: '今天 00:00', timestamp: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000) },
    { label: '昨天 00:00', timestamp: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000) - oneDay },
    { label: '明天 00:00', timestamp: Math.floor(new Date().setHours(0, 0, 0, 0) / 1000) + oneDay },
    { label: '一周前', timestamp: now - (7 * oneDay) },
    { label: '一月前', timestamp: now - (30 * oneDay) },
    { label: '一年前', timestamp: now - (365 * oneDay) },
    { label: 'Unix纪元', timestamp: 0 },
    { label: '2024-01-01', timestamp: 1704067200 }
  ]
})

// 定时器
let timer: NodeJS.Timeout | null = null

// 工具函数
const isValidTimestamp = (timestamp: string): boolean => {
  const num = parseInt(timestamp)
  return !isNaN(num) && num > 0
}

const formatTimestamp = (timestamp: number): { seconds: number, millis: number } => {
  // 判断是秒级还是毫秒级时间戳
  if (timestamp.toString().length === 13) {
    // 毫秒级
    return {
      seconds: Math.floor(timestamp / 1000),
      millis: timestamp
    }
  } else {
    // 秒级
    return {
      seconds: timestamp,
      millis: timestamp * 1000
    }
  }
}

const getRelativeTime = (timestamp: number): string => {
  const now = Math.floor(Date.now() / 1000)
  const { seconds } = formatTimestamp(timestamp)
  const diff = now - seconds
  
  if (Math.abs(diff) < 60) {
    return diff > 0 ? `${diff}秒前` : `${Math.abs(diff)}秒后`
  } else if (Math.abs(diff) < 3600) {
    const minutes = Math.floor(Math.abs(diff) / 60)
    return diff > 0 ? `${minutes}分钟前` : `${minutes}分钟后`
  } else if (Math.abs(diff) < 86400) {
    const hours = Math.floor(Math.abs(diff) / 3600)
    return diff > 0 ? `${hours}小时前` : `${hours}小时后`
  } else {
    const days = Math.floor(Math.abs(diff) / 86400)
    return diff > 0 ? `${days}天前` : `${days}天后`
  }
}

// 方法
const refreshTime = () => {
  currentTimestamp.value = Math.floor(Date.now() / 1000)
}

const convertTimestampToDate = () => {
  if (!timestampInput.value || !isValidTimestamp(timestampInput.value)) {
    convertedLocalTime.value = ''
    convertedUtcTime.value = ''
    convertedIsoTime.value = ''
    relativeTime.value = ''
    return
  }

  const timestamp = parseInt(timestampInput.value)
  const { millis } = formatTimestamp(timestamp)
  const date = new Date(millis)

  convertedLocalTime.value = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  convertedUtcTime.value = date.toUTCString()
  convertedIsoTime.value = date.toISOString()
  relativeTime.value = getRelativeTime(timestamp)
}

const convertDateToTimestamp = () => {
  if (!dateInput.value) {
    convertedTimestampSeconds.value = ''
    convertedTimestampMillis.value = ''
    return
  }

  const dateTime = `${dateInput.value}T${timeInput.value || '00:00:00'}`
  const date = new Date(dateTime)
  
  if (isNaN(date.getTime())) {
    convertedTimestampSeconds.value = ''
    convertedTimestampMillis.value = ''
    return
  }

  const millis = date.getTime()
  convertedTimestampSeconds.value = Math.floor(millis / 1000).toString()
  convertedTimestampMillis.value = millis.toString()
}

const convertDatetimeToTimestamp = () => {
  if (!datetimeInput.value) {
    convertedTimestampSeconds.value = ''
    convertedTimestampMillis.value = ''
    return
  }

  const date = new Date(datetimeInput.value)
  
  if (isNaN(date.getTime())) {
    convertedTimestampSeconds.value = ''
    convertedTimestampMillis.value = ''
    return
  }

  const millis = date.getTime()
  convertedTimestampSeconds.value = Math.floor(millis / 1000).toString()
  convertedTimestampMillis.value = millis.toString()
}

const useCurrentTimestamp = () => {
  timestampInput.value = currentTimestamp.value.toString()
  convertTimestampToDate()
}

const useCurrentDate = () => {
  const now = new Date()
  dateInput.value = now.toISOString().split('T')[0]
  timeInput.value = now.toTimeString().slice(0, 8)
  datetimeInput.value = now.toISOString().slice(0, 19)
  convertDateToTimestamp()
}

const setTimestamp = (timestamp: number) => {
  timestampInput.value = timestamp.toString()
  convertTimestampToDate()
}

const convertBatchTimestamps = () => {
  if (!batchTimestamps.value.trim()) {
    batchResults.value = ''
    return
  }

  const timestamps = batchTimestamps.value.split('\n').filter(line => line.trim())
  const results: string[] = []

  timestamps.forEach(line => {
    const timestamp = line.trim()
    if (isValidTimestamp(timestamp)) {
      const { millis } = formatTimestamp(parseInt(timestamp))
      const date = new Date(millis)
      const formatted = date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
      results.push(`${timestamp} → ${formatted}`)
    } else {
      results.push(`${timestamp} → 无效时间戳`)
    }
  })

  batchResults.value = results.join('\n')
}

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // 这里可以添加提示消息
  } catch (err) {
    console.error('复制失败:', err)
  }
}

const copyConvertedDateTime = () => {
  const text = [
    `本地时间: ${convertedLocalTime.value}`,
    `UTC时间: ${convertedUtcTime.value}`,
    `ISO格式: ${convertedIsoTime.value}`
  ].join('\n')
  copyToClipboard(text)
}

const copyConvertedTimestamp = () => {
  const text = [
    `秒级时间戳: ${convertedTimestampSeconds.value}`,
    `毫秒级时间戳: ${convertedTimestampMillis.value}`
  ].join('\n')
  copyToClipboard(text)
}

// 生命周期
onMounted(() => {
  // 每秒更新当前时间戳
  timer = setInterval(() => {
    currentTimestamp.value = Math.floor(Date.now() / 1000)
  }, 1000)

  // 初始化当前日期
  useCurrentDate()
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.textarea {
  @apply w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none;
}
</style> 