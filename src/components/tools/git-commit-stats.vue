<template>
  <div class="max-w-6xl mx-auto p-6 space-y-6">
    <!-- 标题和说明 -->
    <div class="text-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Git提交统计器
      </h1>
      <p class="text-gray-600 dark:text-gray-400">
        扫描指定目录下的Git项目，提取并可视化展示您的提交记录
      </p>
    </div>

    <!-- 步骤指导 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Terminal class="w-5 h-5 mr-2" />
        步骤1: 执行扫描命令
      </h2>
      
      <div class="space-y-4">
        <div>
          <p class="text-gray-600 dark:text-gray-400 mb-2">
            在您想要扫描的根目录下执行以下命令：
          </p>
          <div class="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm relative">
            <pre class="whitespace-pre-wrap">{{ scanCommand }}</pre>
            <button
              @click="copyCommand"
              class="absolute top-2 right-2 p-2 hover:bg-gray-700 rounded"
              title="复制命令"
            >
              <Copy class="w-4 h-4" />
            </button>
          </div>
        </div>

                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               扫描目录路径
             </label>
             <input
               v-model="scanPath"
               type="text"
               placeholder="/path/to/your/projects"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               作者邮箱/姓名
             </label>
             <input
               v-model="authorFilter"
               type="text"
               placeholder="your@email.com 或您的姓名"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
         </div>

         <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               开始日期
             </label>
             <input
               v-model="startDate"
               type="date"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               结束日期
             </label>
             <input
               v-model="endDate"
               type="date"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             />
           </div>
           <div>
             <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
               快速选择
             </label>
             <select
               @change="(e) => setDateRange((e.target as HTMLSelectElement).value)"
               class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
             >
               <option value="">选择时间范围</option>
               <option value="last-week">上周 ({{ getLastWeekLabel() }})</option>
               <option value="this-week">本周</option>
               <option value="last-month">上个月</option>
               <option value="this-month">本月</option>
               <option value="last-3-months">最近3个月</option>
               <option value="last-6-months">最近6个月</option>
               <option value="this-year">今年</option>
               <option value="last-year">去年</option>
               <option value="all">全部时间</option>
             </select>
           </div>
         </div>

                 <div class="flex gap-2 flex-wrap">
           <button
             @click="clearSavedSettings"
             class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
             title="清除保存的路径和作者信息"
           >
             <Trash class="w-4 h-4 mr-2 inline" />
             清除配置
           </button>
         </div>
      </div>
    </div>

    <!-- 数据输入区域 -->
    <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
        <Upload class="w-5 h-5 mr-2" />
        步骤2: 粘贴命令输出
      </h2>
      
      <div class="space-y-4">
        <textarea
          v-model="gitLogData"
          placeholder="请将上述命令的输出结果粘贴到这里..."
          class="w-full h-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
        ></textarea>
        
        <div class="flex gap-2">
          <button
            @click="parseGitData"
            :disabled="!gitLogData.trim()"
            class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
          >
            <BarChart class="w-4 h-4 mr-2 inline" />
            解析并统计
          </button>
          <button
            @click="clearData"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <Trash class="w-4 h-4 mr-2 inline" />
            清空数据
          </button>
        </div>
      </div>
    </div>

    <!-- 统计结果展示 -->
    <div v-if="parsedData.length > 0" class="space-y-6">
      <!-- 总体统计 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <PieChart class="w-5 h-5 mr-2" />
          总体统计
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ stats.totalCommits }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">总提交数</div>
          </div>
          <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ stats.totalProjects }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">涉及项目</div>
          </div>
          <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ stats.activeDays }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">活跃天数</div>
          </div>
          <div class="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg text-center">
            <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ stats.avgCommitsPerDay.toFixed(1) }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">日均提交</div>
          </div>
        </div>
      </div>

      <!-- 按项目统计 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <FolderOpen class="w-5 h-5 mr-2" />
          按项目统计
        </h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">项目名称</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">提交数</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">首次提交</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">最近提交</th>
                <th class="py-2 px-3 text-gray-900 dark:text-white font-medium">占比</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="project in projectStats" :key="project.name" class="border-b border-gray-100 dark:border-gray-700">
                <td class="py-2 px-3 font-mono text-sm">{{ project.name }}</td>
                <td class="py-2 px-3">{{ project.commits }}</td>
                <td class="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(project.firstCommit) }}</td>
                <td class="py-2 px-3 text-sm text-gray-600 dark:text-gray-400">{{ formatDate(project.lastCommit) }}</td>
                <td class="py-2 px-3">
                  <div class="flex items-center">
                    <div class="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                      <div 
                        class="bg-blue-500 h-2 rounded-full" 
                        :style="{ width: `${project.percentage}%` }"
                      ></div>
                    </div>
                    <span class="text-sm">{{ project.percentage }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 时间线分析 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Calendar class="w-5 h-5 mr-2" />
          提交时间线
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- 按月统计 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">按月统计</h3>
            <div class="space-y-2">
              <div v-for="month in monthlyStats" :key="month.month" class="flex items-center">
                <div class="w-20 text-sm text-gray-600 dark:text-gray-400">{{ month.month }}</div>
                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                  <div 
                    class="bg-green-500 h-3 rounded-full transition-all duration-300" 
                    :style="{ width: `${(month.commits / stats.maxMonthlyCommits) * 100}%` }"
                  ></div>
                </div>
                <div class="w-8 text-sm text-gray-900 dark:text-white">{{ month.commits }}</div>
              </div>
            </div>
          </div>

          <!-- 按星期统计 -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">按星期统计</h3>
            <div class="space-y-2">
              <div v-for="day in weeklyStats" :key="day.day" class="flex items-center">
                <div class="w-16 text-sm text-gray-600 dark:text-gray-400">{{ day.day }}</div>
                <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-3 mr-3">
                  <div 
                    class="bg-purple-500 h-3 rounded-full transition-all duration-300" 
                    :style="{ width: `${(day.commits / stats.maxWeeklyCommits) * 100}%` }"
                  ></div>
                </div>
                <div class="w-8 text-sm text-gray-900 dark:text-white">{{ day.commits }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

             <!-- 详细记录 -->
       <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
         <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
           <List class="w-5 h-5 mr-2" />
           提交记录详情
         </h2>
         
         <div class="space-y-4">
           <div class="flex items-center gap-4">
             <label class="flex items-center">
               <input
                 v-model="enableDeduplication"
                 type="checkbox"
                 class="mr-2"
               />
               <span class="text-sm text-gray-700 dark:text-gray-300">启用去重</span>
             </label>
             <label class="flex items-center">
               <input
                 v-model="enableFiltering"
                 type="checkbox"
                 class="mr-2"
               />
               <span class="text-sm text-gray-700 dark:text-gray-300">过滤无效提交</span>
             </label>
             <button
               @click="copyCommitDetails"
               class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
             >
               <Copy class="w-4 h-4 mr-1 inline" />
               复制
             </button>
           </div>
           
           <textarea
             v-model="commitDetailsText"
             readonly
             placeholder="处理后的提交记录将显示在这里..."
             class="w-full h-80 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white font-mono text-sm resize-none"
           ></textarea>
           
           <div class="text-sm text-gray-500 dark:text-gray-400">
             共 {{ filteredCommits.length }} 条记录
             <span v-if="enableDeduplication && deduplicatedCount > 0">
               (去重 {{ deduplicatedCount }} 条)
             </span>
             <span v-if="enableFiltering && filteredCount > 0">
               (过滤 {{ filteredCount }} 条)
             </span>
           </div>
         </div>
       </div>

      <!-- 导出功能 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Download class="w-5 h-5 mr-2" />
          导出数据
        </h2>
        
        <div class="flex gap-2">
          <button
            @click="exportJSON"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileJson class="w-4 h-4 mr-2 inline" />
            导出JSON
          </button>
          <button
            @click="exportCSV"
            class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FileSpreadsheet class="w-4 h-4 mr-2 inline" />
            导出CSV
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { 
  Terminal, Copy, RefreshCw, Upload, BarChart, Trash, PieChart, 
  FolderOpen, Calendar, List, Download, FileJson, FileSpreadsheet 
} from 'lucide-vue-next'

interface CommitData {
  hash: string
  date: Date
  message: string
  author: string
  project: string
}

interface ProjectStat {
  name: string
  commits: number
  firstCommit: Date
  lastCommit: Date
  percentage: number
}

interface MonthStat {
  month: string
  commits: number
}

interface WeekStat {
  day: string
  commits: number
}

// localStorage键名常量
const STORAGE_KEYS = {
  SCAN_PATH: 'git-commit-stats-scan-path',
  AUTHOR_FILTER: 'git-commit-stats-author-filter'
}

// 从localStorage读取保存的值
const getSavedScanPath = () => {
  return localStorage.getItem(STORAGE_KEYS.SCAN_PATH) || '/path/to/your/projects'
}

const getSavedAuthorFilter = () => {
  return localStorage.getItem(STORAGE_KEYS.AUTHOR_FILTER) || ''
}

// 响应式数据
const scanPath = ref(getSavedScanPath())
const authorFilter = ref(getSavedAuthorFilter())
const gitLogData = ref('')
const parsedData = ref<CommitData[]>([])
const startDate = ref('')
const endDate = ref('')
const enableDeduplication = ref(true)
const enableFiltering = ref(true)

// 生成扫描命令
const scanCommand = computed(() => {
  const path = scanPath.value || '/path/to/your/projects'
  const author = authorFilter.value ? ` --author="${authorFilter.value}"` : ''
  
  let dateRange = ''
  if (startDate.value) {
    dateRange += ` --since="${startDate.value}"`
  }
  if (endDate.value) {
    // 结束日期需要包含整天，所以加上时间
    const endDateTime = new Date(endDate.value)
    endDateTime.setHours(23, 59, 59, 999)
    dateRange += ` --until="${endDateTime.toISOString()}"`
  }
  
  return `find "${path}" -name ".git" -type d | while read gitdir; do
  repo=\$(dirname "\$gitdir")
  echo "=== \$(basename "\$repo") ==="
  cd "\$repo"
  git log --oneline --pretty=format:"%H|%ad|%s|%an|%ae" --date=iso${author}${dateRange} 2>/dev/null || echo "Error reading git log"
  echo ""
done`
})

// 生成命令
const generateCommand = () => {
  // 命令已通过computed自动更新
}

// 复制命令
const copyCommand = async () => {
  try {
    await navigator.clipboard.writeText(scanCommand.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy command:', err)
  }
}

// 解析Git数据
const parseGitData = () => {
  const lines = gitLogData.value.trim().split('\n')
  const commits: CommitData[] = []
  let currentProject = ''

  for (const line of lines) {
    if (line.startsWith('=== ') && line.endsWith(' ===')) {
      currentProject = line.slice(4, -4)
    } else if (line.includes('|') && currentProject) {
      const parts = line.split('|')
      if (parts.length >= 5) {
        commits.push({
          hash: parts[0],
          date: new Date(parts[1]),
          message: parts[2],
          author: parts[3],
          project: currentProject
        })
      }
    }
  }

  parsedData.value = commits.sort((a, b) => b.date.getTime() - a.date.getTime())
}

// 清空数据
const clearData = () => {
  gitLogData.value = ''
  parsedData.value = []
}

// 统计数据
const stats = computed(() => {
  const commits = parsedData.value
  const projects = new Set(commits.map(c => c.project))
  const days = new Set(commits.map(c => c.date.toDateString()))
  
  const monthlyCommits = monthlyStats.value.map(m => m.commits)
  const weeklyCommits = weeklyStats.value.map(w => w.commits)

  return {
    totalCommits: commits.length,
    totalProjects: projects.size,
    activeDays: days.size,
    avgCommitsPerDay: days.size > 0 ? commits.length / days.size : 0,
    maxMonthlyCommits: Math.max(...monthlyCommits, 1),
    maxWeeklyCommits: Math.max(...weeklyCommits, 1)
  }
})

// 按项目统计
const projectStats = computed(() => {
  const projects = new Map<string, CommitData[]>()
  
  parsedData.value.forEach(commit => {
    if (!projects.has(commit.project)) {
      projects.set(commit.project, [])
    }
    projects.get(commit.project)!.push(commit)
  })

  const result: ProjectStat[] = []
  projects.forEach((commits, name) => {
    const dates = commits.map(c => c.date).sort((a, b) => a.getTime() - b.getTime())
    result.push({
      name,
      commits: commits.length,
      firstCommit: dates[0],
      lastCommit: dates[dates.length - 1],
      percentage: Math.round((commits.length / parsedData.value.length) * 100)
    })
  })

  return result.sort((a, b) => b.commits - a.commits)
})

// 按月统计
const monthlyStats = computed(() => {
  const months = new Map<string, number>()
  
  parsedData.value.forEach(commit => {
    const month = commit.date.toISOString().slice(0, 7) // YYYY-MM
    months.set(month, (months.get(month) || 0) + 1)
  })

  const result: MonthStat[] = []
  months.forEach((commits, month) => {
    result.push({ month, commits })
  })

  return result.sort((a, b) => a.month.localeCompare(b.month))
})

// 按星期统计
const weeklyStats = computed(() => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const days = new Map<number, number>()
  
  parsedData.value.forEach(commit => {
    const day = commit.date.getDay()
    days.set(day, (days.get(day) || 0) + 1)
  })

  const result: WeekStat[] = []
  for (let i = 0; i < 7; i++) {
    result.push({
      day: weekdays[i],
      commits: days.get(i) || 0
    })
  }

  return result
})

// 格式化日期
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

// 导出JSON
const exportJSON = () => {
  const data = {
    stats: stats.value,
    projects: projectStats.value,
    commits: parsedData.value
  }
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `git-commit-stats-${new Date().toISOString().slice(0, 10)}.json`
  a.click()
  URL.revokeObjectURL(url)
}

// 导出CSV
const exportCSV = () => {
  const headers = ['项目', '提交哈希', '日期', '提交信息', '作者']
  const rows = parsedData.value.map(commit => [
    commit.project,
    commit.hash,
    commit.date.toISOString(),
    `"${commit.message.replace(/"/g, '""')}"`,
    commit.author
  ])
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `git-commit-stats-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

// 计算上周一至周日的日期
const getLastWeekDates = () => {
  const today = new Date()
  const currentDay = today.getDay() // 0=周日, 1=周一, ..., 6=周六
  
  // 计算本周一的日期
  const thisMonday = new Date(today)
  const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1 // 如果是周日，则距离周一6天
  thisMonday.setDate(today.getDate() - daysFromMonday)
  
  // 上周一 = 本周一 - 7天
  const lastMonday = new Date(thisMonday)
  lastMonday.setDate(thisMonday.getDate() - 7)
  
  // 上周日 = 上周一 + 6天
  const lastSunday = new Date(lastMonday)
  lastSunday.setDate(lastMonday.getDate() + 6)
  
  return {
    start: lastMonday,
    end: lastSunday
  }
}

// 格式化日期为YYYY-MM-DD格式
const formatDateForInput = (date: Date) => {
  return date.toISOString().split('T')[0]
}

// 获取上周的标签显示
const getLastWeekLabel = () => {
  const { start, end } = getLastWeekDates()
  const startStr = start.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  const endStr = end.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' })
  return `${startStr} - ${endStr}`
}

// 设置日期范围
const setDateRange = (range: string) => {
  const today = new Date()
  
  switch (range) {
    case 'last-week': {
      const { start, end } = getLastWeekDates()
      startDate.value = formatDateForInput(start)
      endDate.value = formatDateForInput(end)
      break
    }
    case 'this-week': {
      const currentDay = today.getDay()
      const thisMonday = new Date(today)
      const daysFromMonday = currentDay === 0 ? 6 : currentDay - 1
      thisMonday.setDate(today.getDate() - daysFromMonday)
      
      const thisSunday = new Date(thisMonday)
      thisSunday.setDate(thisMonday.getDate() + 6)
      
      startDate.value = formatDateForInput(thisMonday)
      endDate.value = formatDateForInput(thisSunday)
      break
    }
    case 'last-month': {
      const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
      const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
      
      startDate.value = formatDateForInput(lastMonth)
      endDate.value = formatDateForInput(lastMonthEnd)
      break
    }
    case 'this-month': {
      const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)
      
      startDate.value = formatDateForInput(thisMonth)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'last-3-months': {
      const threeMonthsAgo = new Date(today)
      threeMonthsAgo.setMonth(today.getMonth() - 3)
      
      startDate.value = formatDateForInput(threeMonthsAgo)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'last-6-months': {
      const sixMonthsAgo = new Date(today)
      sixMonthsAgo.setMonth(today.getMonth() - 6)
      
      startDate.value = formatDateForInput(sixMonthsAgo)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'this-year': {
      const thisYear = new Date(today.getFullYear(), 0, 1)
      
      startDate.value = formatDateForInput(thisYear)
      endDate.value = formatDateForInput(today)
      break
    }
    case 'last-year': {
      const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
      const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31)
      
      startDate.value = formatDateForInput(lastYearStart)
      endDate.value = formatDateForInput(lastYearEnd)
      break
    }
    case 'all': {
      startDate.value = ''
      endDate.value = ''
      break
    }
  }
}

// 监听扫描路径变化，自动保存到localStorage
watch(scanPath, (newValue) => {
  if (newValue && newValue !== '/path/to/your/projects') {
    localStorage.setItem(STORAGE_KEYS.SCAN_PATH, newValue)
  }
})

// 监听作者过滤器变化，自动保存到localStorage
watch(authorFilter, (newValue) => {
  if (newValue) {
    localStorage.setItem(STORAGE_KEYS.AUTHOR_FILTER, newValue)
  } else {
    // 如果清空了作者信息，也要从localStorage中删除
    localStorage.removeItem(STORAGE_KEYS.AUTHOR_FILTER)
  }
})

// 过滤无效提交的规则
const filterRules = [
  /^chore:\s*save$/i,           // chore: save
  /^update$/i,                  // update
  /^fix$/i,                     // fix
  /^minor\s*fix$/i,            // minor fix
  /^wip$/i,                     // wip (work in progress)
  /^test$/i,                    // test
  /^commit$/i,                  // commit
  /^\.$/,                       // 单个点
  /^initial\s*commit$/i,        // initial commit
  /^first\s*commit$/i,          // first commit
  /^auto\s*commit$/i,           // auto commit
  /^temp$/i,                    // temp
  /^tmp$/i,                     // tmp
  /^backup$/i,                  // backup
  /^.*\s*\.\.\.\s*$/,          // 以...结尾的
  /^[0-9]+$/,                   // 纯数字
  /^[a-f0-9]{7,40}$/,          // 看起来像hash的
]

// 判断提交信息是否应该被过滤
const shouldFilterCommit = (message: string): boolean => {
  if (!message || message.trim().length === 0) return true
  return filterRules.some(rule => rule.test(message.trim()))
}

// 过滤和去重后的提交数据
const filteredCommits = computed(() => {
  let commits = [...parsedData.value]
  
  // 过滤无效提交
  if (enableFiltering.value) {
    commits = commits.filter(commit => !shouldFilterCommit(commit.message))
  }
  
  // 去重处理
  if (enableDeduplication.value) {
    const seen = new Set<string>()
    commits = commits.filter(commit => {
      const key = `${commit.project}:${commit.message.trim()}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })
  }
  
  return commits.sort((a, b) => b.date.getTime() - a.date.getTime())
})

// 去重数量统计
const deduplicatedCount = computed(() => {
  if (!enableDeduplication.value) return 0
  return parsedData.value.length - new Set(parsedData.value.map(c => `${c.project}:${c.message.trim()}`)).size
})

// 过滤数量统计
const filteredCount = computed(() => {
  if (!enableFiltering.value) return 0
  return parsedData.value.filter(commit => shouldFilterCommit(commit.message)).length
})

// 提取提交类型
const getCommitType = (message: string): string => {
  const match = message.match(/^([a-zA-Z]+)(\([^)]*\))?:\s*/)
  if (match) {
    return match[1].toLowerCase()
  }
  return 'other'
}

// 提交类型排序优先级
const commitTypePriority = new Map([
  ['feat', 1],
  ['perf', 2], 
  ['fix', 3],
  ['other', 999]
])

// 获取提交类型的排序权重
const getTypeWeight = (type: string): number => {
  return commitTypePriority.get(type) || 999
}

// 生成提交详情文本 - 按项目和类型分类
const commitDetailsText = computed(() => {
  // 按项目分组
  const projectGroups = new Map<string, CommitData[]>()
  
  filteredCommits.value.forEach(commit => {
    if (!projectGroups.has(commit.project)) {
      projectGroups.set(commit.project, [])
    }
    projectGroups.get(commit.project)!.push(commit)
  })
  
  // 按项目名称排序
  const sortedProjects = Array.from(projectGroups.keys()).sort()
  
  // 生成格式化文本
  const result: string[] = []
  
  sortedProjects.forEach(projectName => {
    const commits = projectGroups.get(projectName)!
    result.push(`【${projectName}】`)
    
    // 按提交类型分组
    const typeGroups = new Map<string, CommitData[]>()
    commits.forEach(commit => {
      const type = getCommitType(commit.message)
      if (!typeGroups.has(type)) {
        typeGroups.set(type, [])
      }
      typeGroups.get(type)!.push(commit)
    })
    
    // 按类型优先级排序
    const sortedTypes = Array.from(typeGroups.keys()).sort((a, b) => {
      const weightA = getTypeWeight(a)
      const weightB = getTypeWeight(b)
      if (weightA !== weightB) {
        return weightA - weightB
      }
      // 相同权重按字母排序
      return a.localeCompare(b)
    })
    
    // 输出每个类型的提交
    sortedTypes.forEach(type => {
      const typeCommits = typeGroups.get(type)!
      // 每个类型内按时间倒序排列
      const sortedCommits = typeCommits.sort((a, b) => b.date.getTime() - a.date.getTime())
      
      sortedCommits.forEach(commit => {
        result.push(commit.message)
      })
    })
    
    // 项目之间添加空行
    result.push('')
  })
  
  // 移除最后的空行
  if (result.length > 0 && result[result.length - 1] === '') {
    result.pop()
  }
  
  return result.join('\n')
})

// 复制提交详情
const copyCommitDetails = async () => {
  try {
    await navigator.clipboard.writeText(commitDetailsText.value)
    // 这里可以添加一个toast提示
  } catch (err) {
    console.error('Failed to copy commit details:', err)
  }
}

// 清除保存的配置
const clearSavedSettings = () => {
  if (confirm('确定要清除保存的配置吗？这将删除已保存的扫描路径和作者信息。')) {
    localStorage.removeItem(STORAGE_KEYS.SCAN_PATH)
    localStorage.removeItem(STORAGE_KEYS.AUTHOR_FILTER)
    scanPath.value = '/path/to/your/projects'
    authorFilter.value = ''
  }
}

// 组件挂载时的初始化
onMounted(() => {
  // 默认设置为上周一至周日
  setDateRange('last-week')
})
</script>